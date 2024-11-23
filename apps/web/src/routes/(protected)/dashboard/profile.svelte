<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '@repo/ui/dialog';
	import { Button, buttonVariants } from '@repo/ui/button';
	import { Label } from '@repo/ui/label';
	import { Input } from '@repo/ui/input';
	import { Textarea } from '@repo/ui/textarea';
	import * as Select from '@repo/ui/select';

	import z from 'zod';
	import { createSessionClient } from '$lib/client/appwrite';
	import { page } from '$app/stores';
	import { PUBLIC_APPWRITE_DATABASE_ID } from '$env/static/public';
	import { goto, invalidateAll } from '$app/navigation';
	const schema = z.object({
		hobbies: z.string().min(1, { message: 'Hobbies is required' }),
		interests: z.string().min(1, { message: 'At least one interest is required' }),
		age: z.number().min(1, { message: 'Age is required' }),
		bio: z.string().min(1, { message: 'Bio is required' }),
		budget: z.number().min(1, { message: 'Budget is required' }),
		sex: z.string().min(1, { message: 'Sex is required' })
	});

	// Sex enum options
	const sexOptions = ['Male', 'Female'];

	let { profileSet }: { profileSet: () => void } = $props();

	let selectedSex = $state('');

	const sexTriggerContent = $derived(
		sexOptions.find((option) => option.toLowerCase() === selectedSex)?.toString() ?? 'Select sex'
	);

	let formErrors = $state<Record<string, string[]>>({});

	let loading = $state(false);
	async function handleSubmit(event: SubmitEvent) {
		loading = true;
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);

		const data = {
			hobbies: formData.get('hobbies'),
			interests: formData.get('interests'),
			age: Number(formData.get('age')), // Convert to number
			bio: formData.get('bio'),
			budget: Number(formData.get('budget')), // Convert to number
			sex: selectedSex
		};
		console.log(data);

		const result = schema.safeParse(data);
		if (!result.success) {
			formErrors = result.error.flatten().fieldErrors;
			return;
		}

		formErrors = {};

		const { account, databases } = createSessionClient($page.data.session!);
		try {
			await databases.getDocument(PUBLIC_APPWRITE_DATABASE_ID, 'PROFILES', $page.data.user!.$id);
		} catch {
			await databases.createDocument(
				PUBLIC_APPWRITE_DATABASE_ID,
				'PROFILES',
				$page.data.user!.$id,
				{
					...data
				}
			);
		}

		await account.updatePrefs({
			profile: $page.data.user!.$id
		});

		loading = false;
		profileSet();
	}
</script>

<Dialog open={true}>
	<DialogContent class="sm:max-w-[425px]">
		<form onsubmit={handleSubmit}>
			<DialogHeader>
				<DialogTitle>Edit profile</DialogTitle>
				<DialogDescription>
					Make changes to your profile here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="hobbies" class="text-right">Hobbies</Label>
					<div class="col-span-3 space-y-1">
						<Input id="hobbies" name="hobbies" placeholder="Your hobbies" />
						{#if formErrors.hobbies}
							<p class="text-sm text-red-500">{formErrors.hobbies[0]}</p>
						{/if}
					</div>
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="interests" class="text-right">Interests</Label>
					<div class="col-span-3 space-y-1">
						<Input id="interests" name="interests" placeholder="Your interests" />
						{#if formErrors.interests}
							<p class="text-sm text-red-500">{formErrors.interests[0]}</p>
						{/if}
					</div>
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="age" class="text-right">Age</Label>
					<div class="col-span-3 space-y-1">
						<Input type="number" id="age" name="age" />
						{#if formErrors.age}
							<p class="text-sm text-red-500">{formErrors.age[0]}</p>
						{/if}
					</div>
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="bio" class="text-right">Bio</Label>
					<div class="col-span-3 space-y-1">
						<Textarea
							id="bio"
							name="bio"
							class="min-h-[100px]"
							placeholder="Tell us about yourself"
						/>
						{#if formErrors.bio}
							<p class="text-sm text-red-500">{formErrors.bio[0]}</p>
						{/if}
					</div>
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="budget" class="text-right">Budget</Label>
					<div class="col-span-3 space-y-1">
						<Input type="number" id="budget" name="budget" />
						{#if formErrors.budget}
							<p class="text-sm text-red-500">{formErrors.budget[0]}</p>
						{/if}
					</div>
				</div>

				<div class="grid grid-cols-4 items-center gap-4 [&_*]:!w-full">
					<Label for="sex" class="text-right">Sex</Label>
					<div class="col-span-3 space-y-1">
						<Select.Root type="single" name="sex" bind:value={selectedSex}>
							<Select.Trigger class="w-full">
								{sexTriggerContent}
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each sexOptions as option}
										<Select.Item value={option.toLowerCase()} label={option}>
											{option}
										</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
						{#if formErrors.sex}
							<p class="text-sm text-red-500">{formErrors.sex[0]}</p>
						{/if}
					</div>
				</div>
			</div>
			<DialogFooter>
				<Button type="submit" disabled={loading}>
					{#if loading}
						<span class="mr-2 h-4 w-4 animate-spin">◌</span>
					{/if}
					Save changes
				</Button>
			</DialogFooter>
		</form>
	</DialogContent>
</Dialog>
