<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Navbar from './Navbar.svelte';

	let { children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Navbar />
{@render children()}
