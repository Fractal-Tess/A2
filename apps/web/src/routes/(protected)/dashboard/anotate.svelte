<script lang="ts">
	import { page } from '$app/stores';
	import { createSessionClient } from '$lib/client/appwrite';
	import { PUBLIC_APPWRITE_DATABASE_ID } from '$env/static/public';
	import { Button } from '@repo/ui';
	import { Label } from '@repo/ui/label';
	import { Slider } from '@repo/ui/slider';
	import { Query } from 'appwrite';
	import type { Models } from 'appwrite';
	const { account, databases } = createSessionClient($page.data.session!);
	import { ID } from 'appwrite';

	let anotatedIds = [''] as string[];

	// Items
	let products = $state([] as Models.Document[]);
	let index = $state(0);

	// Sliders
	let budgetSlider = $state([5]);
	let hobbiesSlider = $state([5]);
	let interestsSlider = $state([5]);
	let ageSlider = $state([5]);
	let sexSlider = $state([5]);
	let overallSlider = $state([5]);

	async function loadData() {
		const anotated = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE_ID, 'GRADE', [
			Query.equal('userId', $page.data.user!.$id),
			Query.limit(1000)
		]);

		anotatedIds = anotated.documents.map((doc) => doc.picked.$id);
		try {
			const response = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE_ID, 'P', [
				Query.limit(1500)
			]);
			products = response.documents.filter((doc) => !anotatedIds.includes(doc.$id));
		} catch (error) {
			console.error('Error fetching products:', error);
		} finally {
			index = 0;
		}
	}
	$effect(() => {
		if (products.length === 0) loadData();
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const id = products[index].$id;
		await databases.createDocument(PUBLIC_APPWRITE_DATABASE_ID, 'GRADE', ID.unique(), {
			budget: budgetSlider[0],
			hobbies: hobbiesSlider[0],
			interests: interestsSlider[0],
			age: ageSlider[0],
			sex: sexSlider[0],
			overall: overallSlider[0],
			userId: $page.data.user!.$id,
			picked: id
		});

		index += 1;
	}

	function handleKeyPress(event: KeyboardEvent, slider: any) {
		const key = parseInt(event.key);
		if (!isNaN(key) && key >= 1 && key <= 9) {
			slider[0] = key;
		}
	}
</script>

{#if products[index]}
	<div class=" mx-auto flex w-full max-w-6xl flex-1 items-center justify-center gap-16">
		<div class="mb-6 flex-1 rounded-lg bg-white p-6 shadow-lg">
			<img
				src={products[index].imgUrl}
				alt="Product"
				class="mb-4 h-64 w-full rounded-lg object-cover"
			/>
			<h2 class="mb-2 text-xl font-bold">{products[index].label}</h2>
			<p class="mb-2 text-gray-600">Original Price: {products[index].originalPrice}</p>
			<p class="mb-2 text-gray-600">Current Price: {products[index].currentPrice}</p>
			<p class="mb-2 text-gray-700">{products[index].description}</p>
			<p class="mb-2 text-gray-600">Category: {products[index].category}</p>
			<a href={products[index].url} target="_blank" class="text-blue-500 hover:underline"
				>View Product</a
			>
		</div>

		<form onsubmit={handleSubmit} class="flex-1 rounded-lg bg-white p-6 shadow-lg">
			<div class="space-y-8 [&_label]:pb-2 [&_label]:text-center">
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<div
					role="group"
					onkeydown={(e) => handleKeyPress(e, budgetSlider)}
					class="focus-within:ring-primary rounded-md p-2 focus-within:ring-2"
				>
					<Label class="pointer-events-none block text-sm font-medium text-gray-700">Budget</Label>
					<Slider bind:value={budgetSlider} min={0} max={10} class="w-full" />
					<span class="text-sm text-gray-500">{budgetSlider}</span>
				</div>
				<div
					role="group"
					onkeydown={(e) => handleKeyPress(e, hobbiesSlider)}
					class="focus-within:ring-primary rounded-md p-2 focus-within:ring-2"
				>
					<Label class="pointer-events-none block text-sm font-medium text-gray-700">Hobbies</Label>
					<Slider bind:value={hobbiesSlider} min={0} max={10} class="w-full" />
					<span class="text-sm text-gray-500">{hobbiesSlider}</span>
				</div>
				<div
					role="group"
					onkeydown={(e) => handleKeyPress(e, interestsSlider)}
					class="focus-within:ring-primary rounded-md p-2 focus-within:ring-2"
				>
					<Label class="pointer-events-none block text-sm font-medium text-gray-700"
						>Interests</Label
					>
					<Slider bind:value={interestsSlider} min={0} max={10} class="w-full" />
					<span class="text-sm text-gray-500">{interestsSlider}</span>
				</div>
				<div
					role="group"
					onkeydown={(e) => handleKeyPress(e, ageSlider)}
					class="focus-within:ring-primary rounded-md p-2 focus-within:ring-2"
				>
					<Label class="block text-sm font-medium text-gray-700">Age</Label>
					<Slider bind:value={ageSlider} min={0} max={10} class="w-full" />
					<span class="text-sm text-gray-500">{ageSlider}</span>
				</div>
				<div
					role="group"
					onkeydown={(e) => handleKeyPress(e, sexSlider)}
					class="focus-within:ring-primary rounded-md p-2 focus-within:ring-2"
				>
					<Label
						class="pointer-events-none pointer-events-none block text-sm font-medium text-gray-700"
						>Sex</Label
					>
					<Slider bind:value={sexSlider} min={0} max={10} class="w-full" />
					<span class="text-sm text-gray-500">{sexSlider}</span>
				</div>
				<div
					role="group"
					onkeydown={(e) => handleKeyPress(e, overallSlider)}
					class="focus-within:ring-primary rounded-md p-2 focus-within:ring-2"
				>
					<Label class="block text-sm font-medium text-gray-700">Overall</Label>
					<Slider bind:value={overallSlider} min={0} max={10} class="w-full" />
					<span class="text-sm text-gray-500">{overallSlider}</span>
				</div>
				<Button class="w-full" type="submit">Next</Button>
			</div>
		</form>
	</div>
{:else}
	<div class="mx-auto max-w-2xl p-6 text-center">
		<h2 class="text-xl font-bold">No more products to grade</h2>
	</div>
{/if}
