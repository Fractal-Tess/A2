<script lang="ts">
	import '@repo/ui/app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();

	import { onMount } from 'svelte';

	onMount(() => {
		document.documentElement.style.backgroundImage = 'url(/background.webp)';
		document.documentElement.style.backgroundSize = 'cover';
		document.documentElement.style.backgroundPosition = 'center';
		document.documentElement.style.backgroundRepeat = 'no-repeat';
	});
</script>

<ModeWatcher />
<main class="relative flex min-h-[100svh] flex-col">
	{@render children()}
</main>
