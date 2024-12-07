import { createClientAPI, createSessionClient } from '$lib/appwrite/client';
import { createAdminAPI, createAdminClient, validateRequest } from '$lib/appwrite/server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.admin = {
		api: createAdminAPI()
	}

	try {
		const user = await validateRequest(event)
		if (user) {
			const client = createSessionClient()
			const api = createClientAPI(client)

			event.locals.user = {
				api,
				client,
				...user
			}
		}
	} catch { }

	return resolve(event);
}
