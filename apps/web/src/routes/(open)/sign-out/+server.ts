import { dev } from '$app/environment';
import { PUBLIC_SESSION_COOKIE } from '$env/static/public';
import { createSessionClient } from '$lib/appwrite/client';
import { redirect } from '@sveltejs/kit';


export async function GET(event) {
	const session = event.cookies.get(PUBLIC_SESSION_COOKIE);
	if (!session) {
		redirect(302, '/sign-in');
	}

	const { account } = createSessionClient(session);
	await account.deleteSession('current');

	event.cookies.set(PUBLIC_SESSION_COOKIE, '', {
		sameSite: 'lax',
		secure: !dev,
		expires: new Date(0),
		path: '/'
	});
	redirect(302, '/sign-in');
}
