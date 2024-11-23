<script lang="ts">
	import { createSessionClient } from '$lib/client/appwrite';
	import { PUBLIC_APPWRITE_DATABASE_ID } from '$env/static/public';
	import { Button } from '@repo/ui';
	import { Label } from '@repo/ui/label';
	import { Slider } from '@repo/ui/slider';
	import { Query } from 'appwrite';
	import type { Models } from 'appwrite';
	import { ID } from 'appwrite';
	import * as Avatar from '@repo/ui/avatar';
	import * as HoverCard from '@repo/ui/hover-card';
	import { onMount } from 'svelte';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';

	let { userId }: { userId: string } = $props();

	const { account, databases } = createSessionClient(userId);

	const profile = databases.listDocuments(PUBLIC_APPWRITE_DATABASE_ID, 'PROFILES', [
		Query.equal('$id', userId)
	]);

	// Items
	let products = $state<null | Models.Document[]>(null);
	let labeledProductIds = $state([] as string[]);

	// Stars
	let budget = $state(5);
	let hobbies = $state(5);
	let interests = $state(5);
	let ageAndSex = $state(5);
	let overall = $state(5);

	function resetStars() {
		budget = 5;
		hobbies = 5;
		interests = 5;
		ageAndSex = 5;
		overall = 5;
	}

	async function loadData() {
		try {
			const response = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE_ID, 'P', [
				Query.limit(25),
				Query.offset(labeledProductIds.length)
			]);
			products = response.documents.filter((doc) => !labeledProductIds.includes(doc.$id));
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	}
	async function loadLabeled() {
		// Get all of the already labeled items by this user
		for (let i = 0; ; i++) {
			console.log(`fetching preload ${i * 50 + 1}`);
			const labeled = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE_ID, 'GRADE', [
				Query.equal('userId', userId),
				Query.limit(50),
				Query.offset(i * 50 + 1)
			]);
			if (!labeled.documents.length) break;
			labeledProductIds.push(...labeled.documents.map((doc) => doc.picked.$id));
		}
	}

	async function handleSubmit(e: SubmitEvent, skipped?: boolean) {
		e.preventDefault();

		// Should not be possible
		if (!products) return;

		// If the number of products in the buffer are decreasing, fill them back up
		if (products.length < 10) loadData();
		const product = products.shift();
		// If there are no products left, return
		if (!product) return;

		await databases.createDocument(PUBLIC_APPWRITE_DATABASE_ID, 'GRADE', ID.unique(), {
			budget,
			hobbies,
			interests,
			ageAndSex,
			overall,
			userId: userId,
			picked: product.$id,
			skipped: skipped ?? false
		});

		labeledProductIds.push(product.$id);

		resetStars();
	}

	onMount(async () => {
		await loadLabeled();
		await loadData();
	});
</script>

{#if products}
	<div class="relative mx-auto flex w-full max-w-6xl flex-1 items-center justify-center gap-16">
		<div class="flexe absolute right-4 top-4 flex items-center gap-8">
			<div>
				<span class="font-bold italic text-primary">{labeledProductIds.length}</span> Items labeled
			</div>
			<HoverCard.Root>
				<HoverCard.Trigger
					href="https://github.com/sveltejs"
					target="_blank"
					rel="noreferrer noopener"
					class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
					>@Profile</HoverCard.Trigger
				>
				<Button onclick={toggleMode} variant="outline" size="icon">
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
				<HoverCard.Content>
					<togg <div class="flex flex-1 flex-col gap-1 text-xs">
						<h4 class="text-sm font-semibold">@Webbers</h4>
						{#await profile}
							Loading...
						{:then value}
							<p>
								Age: <span class="text-primary">{value.documents[0].age}</span>
							</p>
							<p>
								Sex: <span class="text-primary">{value.documents[0].sex}</span>
							</p>
							<p>
								Hobbies: <span class="text-primary">{value.documents[0].hobbies}</span>
							</p>
							<p>
								Interests: <span class="text-primary">{value.documents[0].interests}</span>
							</p>
							<p>
								Budget: <span class="text-primary">{value.documents[0].budget}</span>
							</p>
						{/await}
					</togg></HoverCard.Content
				>
			</HoverCard.Root>
		</div>
		<div class="mb-6 flex-1 rounded-lg bg-white p-6 shadow-lg">
			<img
				src={products.at(0)?.imgUrl}
				alt="Product"
				class="mb-4 h-64 w-full rounded-lg object-cover"
			/>
			<h2 class="mb-2 text-xl font-bold">{products.at(0)?.label}</h2>
			<p class="mb-2 text-gray-600">Original Price: {products.at(0)?.originalPrice}</p>
			<p class="mb-2 text-gray-700">{products.at(0)?.description}</p>
			<p class="mb-2 text-gray-600">Category: {products.at(0)?.category}</p>
			<a href={products.at(0)?.url} target="_blank" class="text-blue-500 hover:underline"
				>View Product</a
			>
		</div>

		<form onsubmit={handleSubmit} class="flex-1 rounded-lg bg-white p-6 shadow-lg">
			<div class="space-y-8 [&_label]:pb-2 [&_label]:text-center">
				<div class="rating rating-md flex flex-col items-center">
					<Label class="text-lg font-bold text-primary"
						>Цената отговаря ли на вашите изисквания?</Label
					>
					<div>
						{#each Array(10) as _, i}
							<input
								type="radio"
								name="rating-budget"
								class="mask mask-star-2 bg-orange-400"
								value={i + 1}
								bind:group={budget}
							/>
						{/each}
					</div>
				</div>

				<div class="rating rating-md flex flex-col items-center">
					<Label class="text-lg font-bold text-primary"
						>Подаръка отговаря ли на вашите хобита?</Label
					>
					<div>
						{#each Array(10) as _, i}
							<input
								type="radio"
								name="rating-hobbies"
								class="mask mask-star-2 bg-orange-400"
								value={i + 1}
								bind:group={hobbies}
							/>
						{/each}
					</div>
				</div>

				<div class="rating rating-md flex flex-col items-center">
					<Label class="text-lg font-bold text-primary"
						>Подаръка отговаря ли на вашите интереси?</Label
					>
					<div>
						{#each Array(10) as _, i}
							<input
								type="radio"
								name="rating-interests"
								class="mask mask-star-2 bg-orange-400"
								value={i + 1}
								bind:group={interests}
							/>
						{/each}
					</div>
				</div>

				<div class="rating rating-md flex flex-col items-center">
					<Label class="text-lg font-bold text-primary">Отговаря ли на вашият пол и възраст?</Label>
					<div>
						{#each Array(10) as _, i}
							<input
								type="radio"
								name="rating-age"
								class="mask mask-star-2 bg-orange-400"
								value={i + 1}
								bind:group={ageAndSex}
							/>
						{/each}
					</div>
				</div>

				<div class="rating rating-md flex flex-col items-center">
					<Label class="text-lg font-bold text-primary"
						>Каква е вашата оценка на база на критерии извън въпросите по-горе?</Label
					>
					<div>
						{#each Array(10) as _, i}
							<input
								type="radio"
								name="rating-overall"
								class="mask mask-star-2 bg-orange-400"
								value={i + 1}
								bind:group={overall}
							/>
						{/each}
					</div>
				</div>

				<div class="space-y-2">
					<Button class="w-full" type="submit">Next</Button>
					<Button
						class="w-full"
						variant="outline"
						type="button"
						onclick={(e: SubmitEvent) => handleSubmit(e, true)}>Skip</Button
					>
				</div>
			</div>
		</form>
	</div>
{:else}
	<div
		class="mx-auto flex h-full max-w-2xl flex-1 flex-col items-center justify-center gap-8 p-6 text-center"
	>
		<span class="loading loading-spinner loading-lg text-primary"></span>
		<p class="mt-4 text-xl font-bold">Loading more products...</p>
	</div>
{/if}
