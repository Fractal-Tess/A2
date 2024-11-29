<script lang="ts">
	import '@repo/ui/app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '@repo/ui/sonner';
	let { children } = $props();
</script>

<ModeWatcher />
<Toaster />
<main class="flex min-h-[100svh] flex-col">
	{@render children()}
</main>
