<script lang="ts">
	import CollectionCard from '$lib/components/CollectionCard.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<section>
	{#if data.state.collections?.length}
		<ul>
			{#each data.state.collections as collection}
				<li>
					<CollectionCard {collection} />
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-center text-4xl font-black md:text-5xl">No collections in database</p>
	{/if}
</section>
