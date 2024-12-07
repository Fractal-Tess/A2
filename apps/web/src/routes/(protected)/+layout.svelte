<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { State } from '$lib/state.svelte';

	let { children, data }: { children: Snippet; data: { state: State } } = $props();
</script>

<main class="container flex flex-1 flex-col">
	{@render children()}
</main>
