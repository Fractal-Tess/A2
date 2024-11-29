import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		return { user: undefined }
	}

	return {
		user: {
			session: locals.user.session,
			model: locals.user.model
		}
	}
}) satisfies LayoutServerLoad;
