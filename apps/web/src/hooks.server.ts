import { PUBLIC_SESSION_COOKIE } from '$env/static/public';
import { createSessionClient } from '$lib/client/appwrite';

export async function handle({ event, resolve }) {
	try {
		const { account } = createSessionClient(event.cookies.get(PUBLIC_SESSION_COOKIE) ?? '');
		event.locals.user = await account.get();
		event.locals.session = event.cookies.get(PUBLIC_SESSION_COOKIE);
	} catch {}

	return resolve(event);
}
