import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFavorite(title: string, url: string): Promise<void>;
    addSongFavorite(songId: string, songLabel: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFavorites(): Promise<Array<[string, string]>>;
    getSongFavorites(): Promise<Array<[string, string]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isSongFavorited(songId: string): Promise<boolean>;
    removeFavorite(title: string): Promise<void>;
    removeSongFavorite(songId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
