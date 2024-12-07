import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_URL } from '$env/static/public';
import { Databases, Account, Client } from "@fractal-tess/appwrite";
import type { Fetcher, PreferencesModel } from './types';

/**
 * Creates a session client for Appwrite.
 * @param {string} [session] - Optional session token to set for the client.
 * @returns {Object} An object containing accessors for account and database operations.
 */
export function createSessionClient(session?: string, fetch?: Fetcher) {
	const client = new Client()

	client
		.setEndpoint(PUBLIC_APPWRITE_URL, { fetch })
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

/**
 * Creates an API interface for the client.
 * @param {ReturnType<typeof createSessionClient>} client - The session client to use for API operations.
 * @returns {Object} An object containing user and collections accessors.
 */
export function createClientAPI(client: ReturnType<typeof createSessionClient>) {
	return {
		user: {
			info: () => client.account.get(),
			preferences: () => client.account.getPrefs<PreferencesModel>()
		},
		collections: {}
	}
}