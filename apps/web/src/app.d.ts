// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Models } from '@fractal-tess/appwrite';
import type { createAdminAPI } from '$lib/appwrite/server';
import type { createSessionClient, createClientAPI } from '$lib/appwrite/client'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				model: Models.User<Models.Preferences>
				session: string
				api: ReturnType<typeof createClientAPI>
				client: ReturnType<typeof createSessionClient>
			} | undefined
			admin: {
				api: ReturnType<typeof createAdminAPI>
			}
		}

		interface PageData {
			user: {
				model: Models.User<Models.Preferences>
				session: string
			} | undefined
		}
		// interface Platform {}
	}
}


export { };
