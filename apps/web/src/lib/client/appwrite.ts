import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_URL } from '$env/static/public';
import { Account, Client, Databases } from 'appwrite';

export function createSessionClient(session?: string) {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_URL)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID);

	// This runs only on the server when creating locals
	if (session) {
		client.setSession(session);
	}

	return {
		get account() {
			return new Account(client);
		},
		get databases() {
			return new Databases(client);
		}
	};
}
