import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_URL } from '$env/static/public';
import { PUBLIC_APPWRITE_DATABASE_ID } from "$env/static/public";
import { Databases, Account, ID, Query, Client, type Models } from "appwrite";
import type { ProfileModel, PreferencesModel, AppwriteModel, UserModel, Profile } from "./types";


export function createSessionClient(session?: string) {
	const client = new Client()

	client
		.setEndpoint(PUBLIC_APPWRITE_URL)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID);

	if (session) {
		client.setSession(session);
	}

	return {
		get account() {
			return new Account(client);
		},
		get database() {
			return new Databases(client);
		},
	};
}

export function createSessionAPI(session?: string) {
	const client = createSessionClient(session);
	const { account, database } = client;

	return {
		profile: {
			get: () => {
				return database.getDocument<ProfileModel>(PUBLIC_APPWRITE_DATABASE_ID, "PROFILES-V2", ID.unique());
			},
			create: (profile: Profile) => {
				return database.createDocument<ProfileModel>(PUBLIC_APPWRITE_DATABASE_ID, "PROFILES-V2", ID.unique(), profile);
			}
		},

		preferences: {
			get: () => {
				return account.getPrefs<PreferencesModel>();
			},
			set: (key: keyof PreferencesModel, val: string | number) => {
				return account.updatePrefs({ [key]: val });
			}
		},
		user: {
			get: async () => {
				const model = await account.get();
				const session = await account.getSession('current');
				return { model, session };
			}
		}
	}
}
