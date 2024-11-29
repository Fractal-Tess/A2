import type { Models } from "appwrite";

export type Profile = {
    interests: string[];
    userId: string;
    sex: 'male' | 'female'
    age: number;
    budget: number;
    bio: string;
    label: string;
}

export type AppwriteModel<T> = Models.Document & T
export type UserModel = Models.User<Models.Preferences>
export type PreferencesModel = {
    activeProfileId?: string;
}
export type ProfileModel = AppwriteModel<Profile>

