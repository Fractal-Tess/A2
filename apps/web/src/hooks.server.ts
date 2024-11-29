import { validateRequest } from '$lib/appwrite/server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		event.locals.user = await validateRequest(event);
	} catch { }
	return resolve(event);
}
