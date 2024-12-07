import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
    const { state } = await parent();
    const { collections } = state;

    const collection = collections?.find(({ $id }) => $id === params.collectionId);

    return { collection };
}) satisfies PageLoad;