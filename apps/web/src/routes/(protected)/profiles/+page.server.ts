import { createSessionAPI } from '$lib/appwrite/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const api = createSessionAPI(locals.user?.session);
    console.log(locals.user);
    const profiles = api.profile.get();
    const preferences = api.preferences.get();

    return {
        promises: {
            profiles,
            preferences
        }
    };
}) satisfies PageServerLoad;