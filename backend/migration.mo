import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  type UserProfile = {
    name : Text;
  };

  // Old state with song favorites
  type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    favorites : Map.Map<Principal, List.List<(Text, Text)>>;
    songFavorites : Map.Map<Principal, List.List<(Text, Text)>>;
  };

  // New state without song favorites
  type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    favorites : Map.Map<Principal, List.List<(Text, Text)>>;
  };

  public func run(old : OldActor) : NewActor {
    {
      userProfiles = old.userProfiles;
      favorites = old.favorites;
    };
  };
};
