<!-- <script lang="ts">
	import { createSessionAPI } from '$lib/appwrite/client';
	import type { PageData } from './$types';
	import CardProfile from './ProfileCard.svelte';
	import { fade } from 'svelte/transition';
	let { data }: { data: PageData } = $props();

	let activeProfileId = $state<string | null>(null);

	const { profiles, preferences } = data.promises;
	const { session } = data.user;
	import { toast } from 'svelte-sonner';
	import ProfileCreator from './ProfileCreator.svelte';
	import type { ProfileModel } from '$lib/appwrite/types';

	preferences.then((prefs) => {
		activeProfileId = prefs.activeProfileId ?? null;
	});

	function activateProfile(profile: ProfileModel) {
		const api = createSessionAPI(session);
		api.preferences.set('activeProfileId', profile.$id);
		toast.success('Profile activated');
		activeProfileId = profile.$id;
	}
</script>

<div class="relative flex flex-1 flex-col items-center justify-center gap-16">
	{#await profiles}
		<div
			out:fade={{ duration: 1000 }}
			class="absolute flex flex-col items-center justify-center gap-4"
		>
			<span class="loading loading-spinner text-primary w-16"></span>
			<p class="text-xl font-bold">Loading profiles...</p>
		</div>
	{:then result}
		<div
			in:fade={{ duration: 1000, delay: 1001 }}
			class="flex flex-1 flex-col items-center gap-4 py-8"
		>
			<ul class="flex flex-1 flex-wrap items-center gap-8">
				{#each result.documents as profile}
					<li>
						<CardProfile
							isActive={activeProfileId === profile.$id}
							activate={() => {
								activateProfile(profile);
							}}
							{profile}
						/>
					</li>
					<li>
						<ProfileCreator {profile} />
					</li>
				{:else}
					<li>
						<p>No profiles found</p>
					</li>
				{/each}
			</ul>
		</div>
	{/await}
</div> -->
