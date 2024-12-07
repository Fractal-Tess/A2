import type { ProfileModel, PreferencesModel, CollectionListModel } from "$lib/appwrite/types";
import { createClientAPI, createSessionClient, } from '$lib/appwrite/client'
import type { Fetcher } from '$lib/appwrite/types';
import type { Models } from 'node-appwrite';


export class State {
    profiles = $state<ProfileModel[]>();
    preferences = $state<PreferencesModel>();
    collections = $state<Pick<CollectionListModel['collections'][number], 'name' | '$id'>[]>();
    private api: ReturnType<typeof createClientAPI>;

    constructor(api: ReturnType<typeof createClientAPI>) {
        this.api = api
    }

    setProfiles(profiles: ProfileModel[]) {
        this.profiles = profiles;
    }

    setPreferences(preferences: PreferencesModel) {
        this.preferences = preferences;
    }
    setCollections(collections: Pick<CollectionListModel['collections'][number], 'name' | '$id'>[]) {
        this.collections = collections;
    }
}
