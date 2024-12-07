<script lang="ts">
	import { Button } from '@repo/ui/button';
	import * as Card from '@repo/ui/card';
	import type { CollectionList } from '$lib/appwrite/types';

	let { collection }: { collection: CollectionList[number] } = $props();
</script>

<Card.Root class="w-[350px] shadow-lg">
	<Card.Header>
		<Card.Title>{collection.name}</Card.Title>
	</Card.Header>
	<Card.Content></Card.Content>
	<Card.Footer class="flex justify-between">
		<Button href={`/collections/${collection.$id}`} class="ml-auto">View</Button>
	</Card.Footer>
</Card.Root>
