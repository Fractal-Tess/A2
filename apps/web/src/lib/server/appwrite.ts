import { APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_URL } from '$env/static/public';
import { Client, Account } from 'node-appwrite';

export function createAdminClient() {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_URL)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID)
		.setKey(APPWRITE_KEY);

	return {
		get account() {
			return new Account(client);
		}
	};
}
