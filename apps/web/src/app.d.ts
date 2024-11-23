// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Models } from 'appwrite';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
 			user: Models.User<Models.Preferences> | undefined;
			session: string | undefined;
		}
		interface PageData {
			user: Models.User<Models.Preferences> | undefined;
			session: string | undefined;
		}
		// interface Platform {}
	}
}

export {};
