import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// This is a guard for the `/` route to redirect to the sign-in or collections page
export const load = (async ({ parent }) => {
    const { user } = await parent();
    if (user) {
        redirect(302, '/collections');
    } else {
        redirect(302, '/sign-in');
    }
}) satisfies PageLoad;