import type { LayoutServerLoad } from './$types';
import { ITEM_COLLECTION_PREFIX } from '$env/static/private';
import type { CollectionList } from '$lib/appwrite/types';

export const load = (async ({ locals }) => {
    const { api } = locals.admin
    const collections = await api.listCollections();

    return {
        collections
    };
}) satisfies LayoutServerLoad;
