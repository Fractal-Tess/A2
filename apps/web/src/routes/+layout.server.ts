import type { LayoutServerLoad } from './$types';

// Main wrapper for the app that exposes locals (which are only available on the server) to the client 
export const load = (async ({ locals }) => {
	if (!locals.user) {
		return { user: undefined }
	}

	return {
		// Only return serilizable data
		user: {
			session: locals.user.session,
			model: locals.user.model
		}
	}
}) satisfies LayoutServerLoad;
