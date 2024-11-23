import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	console.log('load')
	if (locals.user) {
		redirect(302, '/dashboard');
	}
	return {};
}) satisfies PageServerLoad;
