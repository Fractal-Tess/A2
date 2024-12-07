import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { State } from '$lib/state.svelte';
import { createClientAPI, createSessionClient } from '$lib/appwrite/client';

// Loads all data for the app into a global state object
export const load = (async ({ parent, fetch, data }) => {
    const { user } = await parent();
    if (!user) {
        throw redirect(302, '/sign-in');
    }

    const client = createSessionClient(user.session, fetch)
    const api = createClientAPI(client)

    const state = new State(api)
    state.setCollections(data.collections)

    return {
        state
    };
}) satisfies LayoutLoad;