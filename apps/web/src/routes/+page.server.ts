import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/sign-in');
	}
	redirect(302, '/dashboard');
}) satisfies PageServerLoad;
