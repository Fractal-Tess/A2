import { dev } from '$app/environment';
import { PUBLIC_SESSION_COOKIE } from '$env/static/public';
import { createAdminClient } from '$lib/server/appwrite';

export async function GET(event) {
	const userId = event.url.searchParams.get('userId');
	const secret = event.url.searchParams.get('secret');

	if (!userId || !secret) {
		return new Response('Missing `userId` or `secret` query parameters', {
			status: 400
		});
	}

	const { account } = createAdminClient();
	const session = await account.createSession(userId, secret);

	const headers = new Headers({
		location: '/dashboard',
		'set-cookie': event.cookies.serialize(PUBLIC_SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: !dev,
			path: '/'
		})
	});

	return new Response(null, { status: 302, headers });
}
