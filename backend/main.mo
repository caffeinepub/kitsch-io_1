import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Per-user URL favorites: Principal -> List of (title, url)
  let favorites = Map.empty<Principal, List.List<(Text, Text)>>();

  // Per-user song favorites: Principal -> List of (songId, label)
  let songFavorites = Map.empty<Principal, List.List<(Text, Text)>>();

  // ── User Profile ──────────────────────────────────────────────────────────

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ── URL Favorites ─────────────────────────────────────────────────────────

  public shared ({ caller }) func addFavorite(title : Text, url : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add favorites");
    };
    let userFavs = switch (favorites.get(caller)) {
      case (?list) { list };
      case (null) { List.empty<(Text, Text)>() };
    };
    userFavs.add((title, url));
    favorites.add(caller, userFavs);
  };

  public shared ({ caller }) func removeFavorite(title : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove favorites");
    };
    let userFavs = switch (favorites.get(caller)) {
      case (?list) { list };
      case (null) { Runtime.trap("Favorite not found: " # title) };
    };
    let filtered = userFavs.filter(func(fav : (Text, Text)) : Bool { fav.0 != title });
    if (filtered.size() == userFavs.size()) {
      Runtime.trap("Favorite not found: " # title);
    };
    favorites.add(caller, filtered);
  };

  public query ({ caller }) func getFavorites() : async [(Text, Text)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view favorites");
    };
    switch (favorites.get(caller)) {
      case (?list) { list.toArray() };
      case (null) { [] };
    };
  };

  // ── Song Favorites ────────────────────────────────────────────────────────
  public shared ({ caller }) func addSongFavorite(songId : Text, songLabel : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add song favorites");
    };
    let userFavs = switch (songFavorites.get(caller)) {
      case (?list) { list };
      case (null) { List.empty<(Text, Text)>() };
    };
    let existing = userFavs.any(func(fav : (Text, Text)) : Bool { fav.0 == songId });
    if (existing) {
      Runtime.trap("This song is already favorited.");
    };
    userFavs.add((songId, songLabel));
    songFavorites.add(caller, userFavs);
  };

  public shared ({ caller }) func removeSongFavorite(songId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove song favorites");
    };
    let userFavs = switch (songFavorites.get(caller)) {
      case (?list) { list };
      case (null) { Runtime.trap("Favorite not found: " # songId) };
    };
    let filtered = userFavs.filter(func(fav : (Text, Text)) : Bool { fav.0 != songId });
    if (filtered.size() == userFavs.size()) {
      Runtime.trap("Favorite not found: " # songId);
    };
    songFavorites.add(caller, filtered);
  };

  public query ({ caller }) func getSongFavorites() : async [(Text, Text)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view song favorites");
    };
    switch (songFavorites.get(caller)) {
      case (?list) { list.toArray() };
      case (null) { [] };
    };
  };

  public query ({ caller }) func isSongFavorited(songId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check song favorites");
    };
    switch (songFavorites.get(caller)) {
      case (?list) { list.any(func(fav : (Text, Text)) : Bool { fav.0 == songId }) };
      case (null) { false };
    };
  };
};
