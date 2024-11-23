<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { toggleMode } from 'mode-watcher';
	import { Button, Icon } from '@repo/ui';
	import { Client, Databases, Query } from 'appwrite';
	import { onMount } from 'svelte';
	import {
		PUBLIC_APPWRITE_DATABASE_ID,
		PUBLIC_APPWRITE_PROJECT_ID,
		PUBLIC_APPWRITE_URL
	} from '$env/static/public';
	import { createSessionClient } from '$lib/client/appwrite';
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
	<Anotate />
{/if}
