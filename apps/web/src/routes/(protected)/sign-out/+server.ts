import { dev } from '$app/environment';
import { PUBLIC_SESSION_COOKIE } from '$env/static/public';
import { createSessionClient } from '$lib/client/appwrite';

export async function GET(event) {
	const { account } = createSessionClient(event.cookies.get(PUBLIC_SESSION_COOKIE));
	await account.deleteSession('current');

	const headers = new Headers({
		location: '/sign-in',
		'set-cookie': event.cookies.serialize(PUBLIC_SESSION_COOKIE, '', {
			sameSite: 'strict',
			expires: new Date(0),
			secure: !dev,
			path: '/'
		})
	});

	return new Response(null, { status: 302, headers });
}
