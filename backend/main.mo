import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  let favorites = List.empty<(Text, Text)>();

  public shared ({ caller }) func addFavorite(title : Text, url : Text) : async () {
    favorites.add((title, url));
  };

  public shared ({ caller }) func removeFavorite(title : Text) : async () {
    let filteredFavorites = favorites.filter(func(fav) { fav.0 != title });
    if (filteredFavorites.size() == favorites.size()) {
      Runtime.trap("Favorite not found: " # title);
    } else {
      favorites.clear();
      favorites.addAll(filteredFavorites.values());
    };
  };

  public query ({ caller }) func getFavorites() : async [(Text, Text)] {
    favorites.toArray();
  };
};
