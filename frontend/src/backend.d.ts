import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    addFavorite(title: string, url: string): Promise<void>;
    getFavorites(): Promise<Array<[string, string]>>;
    removeFavorite(title: string): Promise<void>;
}
