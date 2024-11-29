// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Models } from 'appwrite';
import type { createSessionAPI } from '$lib/appwrite/client'

declare global {
	namespace App {
		// interface Error {}
		interface Locals extends L {
			user: {
				model: Models.User<Models.Preferences>
				session: string
				api: ReturnType<typeof createSessionAPI>
			} | undefined
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
