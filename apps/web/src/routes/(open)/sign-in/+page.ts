import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	if (user) {
		redirect(302, '/dashboard');
	}
}) satisfies PageLoad;
