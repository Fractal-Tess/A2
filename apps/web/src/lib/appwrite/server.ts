import { APPWRITE_KEY, ITEM_COLLECTION_PREFIX } from '$env/static/private';
import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_SESSION_COOKIE } from "$env/static/public";
import type { RequestEvent } from "@sveltejs/kit";
import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_URL } from '$env/static/public';
import { Client, Account, Databases } from 'node-appwrite';
import { createSessionClient } from './client';
import type { CollectionList } from './types';


/**
 * Creates an admin client for interacting with Appwrite services.
 * This client is configured with the endpoint, project ID, and API key.
 */
export function createAdminClient() {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_URL)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID)
		.setKey(APPWRITE_KEY);

	return {
		get account() {
			return new Account(client);
		},
		get database() {
			return new Databases(client);
		}
	};
}


/**
 * Creates an admin API instance for interacting with Appwrite services.
 * This function initializes an admin client and provides methods to perform operations on collections.
 * 
 * @returns An object with methods to interact with Appwrite collections.
 */
export function createAdminAPI() {
	const client = createAdminClient();

	return {

		/**
		 * Lists all active collections in the database.
		 * 
		 * @returns A promise that resolves to the list of active collections in the database.
		 */
		listCollections: () => client.database.listCollections(PUBLIC_APPWRITE_DATABASE_ID)
			.then((collections) => collections.collections
				.filter(({ name, enabled }) => name.startsWith(ITEM_COLLECTION_PREFIX) && enabled)
				.map(({ name, $id }) => ({ name: name.replace(ITEM_COLLECTION_PREFIX + '-', ''), $id, }))) satisfies Promise<CollectionList>
	}
}

/**
 * Validates the incoming request by checking for a valid session cookie.
 * This function is intended to be used in hooks.server.ts to retrieve the user model and session.
 * @param {RequestEvent} event - The request event containing cookies.
 * @returns {Promise<{ model: Object, session: string } | undefined>} The user model and session if valid, otherwise undefined.
 */
export async function validateRequest(event: RequestEvent) {
	const session = event.cookies.get(PUBLIC_SESSION_COOKIE);
	if (!session) {
		return undefined;
	}

	const client = await createSessionClient(session);
	const model = await client.account.get();

	return { model, session };
}
