import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/sign-in');
	}
	return {
		user: locals.user,
		session: locals.session
	};
}) satisfies LayoutServerLoad;
