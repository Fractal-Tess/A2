import type { Models } from "@fractal-tess/appwrite";
import type { Models as NodeModels } from "node-appwrite";

/**
 * Fetch helper for briding api data accross server-client
 */
export type Fetcher = typeof fetch;

/**
 * Appwrite collection model
 */
export type CollectionListModel = NodeModels.CollectionList
export type CollectionList = Pick<CollectionListModel['collections'][number], "$id" | "name">[]

/**
 * Profile table attributes
 */
export type Profile = {
    interests: string[];
    userId: string;
    sex: 'male' | 'female'
    age: number;
    budget: number;
    bio: string;
    label: string;
}

/**
 * Authenticated user model
 */
export type UserModel = Models.User<Models.Preferences>

/**
 * User preferences table model
 */
export type PreferencesModel = {
    activeProfileId?: string;
}

/**
 * Profile table model
 */
export type ProfileModel = Profile & Models.Document

