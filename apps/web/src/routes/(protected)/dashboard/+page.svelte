<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Profile from './profile.svelte';
	import Anotate from './anotate.svelte';

	let { data }: { data: PageData } = $props();
	let profileSet = $state($page.data.user?.prefs.profile);

	function profileSetHandler() {
		profileSet = true;
	}
</script>

{#if !profileSet}
	<Profile profileSet={profileSetHandler} />
{:else}
	<Anotate userId={data.user.$id} />
{/if}
