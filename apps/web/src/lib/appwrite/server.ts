import { APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_SESSION_COOKIE } from "$env/static/public";
import type { RequestEvent } from "@sveltejs/kit";
import { createSessionAPI } from "./client";
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

export async function validateRequest(event: RequestEvent) {
	const session = event.cookies.get(PUBLIC_SESSION_COOKIE);
	if (!session) {
		return
	}
	const api = createSessionAPI(session);
	const { model } = await api.user.get();
	return { model, session, api };
}
