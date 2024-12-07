<script lang="ts">
	import '@repo/ui/app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '@repo/ui/sonner';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<!-- The main wrapper for the app UI -->
<ModeWatcher />
<Toaster />
<Header />
<main class="flex flex-1 flex-col py-16">
	{@render children()}
</main>
