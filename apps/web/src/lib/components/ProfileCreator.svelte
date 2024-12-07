<script lang="ts">
	import { createSessionAPI } from '$lib/appwrite/client';
	import { Icon } from '@repo/ui';
	import { Button } from '@repo/ui/button';
	import * as Dialog from '@repo/ui/dialog';
	import { Input, InputChipV2 } from '@repo/ui/input';
	import { Label } from '@repo/ui/label';
	import * as Select from '@repo/ui/select';
	import { Textarea } from '@repo/ui/textarea';
	import { page } from '$app/stores';
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import { Badge } from '@repo/ui/badge';
	import { writable } from 'svelte/store';

	const schema = z.object({
		label: z.string().min(3, 'Името трябва да бъде поне 3 символа'),
		sex: z.enum(['мъж', 'жена']).transform((sex) => (sex === 'мъж' ? 'male' : 'female')),
		age: z.number().min(0, 'Възрастта трябва да бъде поне 0'),
		interests: z.array(z.string()).min(1, 'Интересите трябва да бъдат поне 1'),
		budget: z.number().min(0, 'Бюджетът трябва да бъде поне 0'),
		bio: z.string().min(10, 'Биографията трябва да бъде поне 10 символа')
	});

	let {}: {} = $props();

	let open = $state(true);

	let profile = $state({
		interests: ['ss'] as string[],
		label: '',
		sex: null as 'мъж' | 'жена' | null,
		age: null,
		budget: null,
		bio: ''
	});

	async function createProfile() {
		const user = $page.data.user;
		if (!user) return;
		const { success, data, error } = await schema.safeParseAsync(profile);
		if (!success) {
			const { errors } = error;
			toast.error('Невалидни данни', {
				class: 'text-center',
				description: error.errors.at(0)?.message,
				duration: 5000
			});
			return;
		}

		const api = createSessionAPI($page.data.session);
		await api.profile.create({
			...data,
			userId: user.model.$id
		});
	}

	function removeInterest(interest: string) {
		profile.interests = profile.interests.filter((i) => i !== interest);
	}
</script>

<Dialog.Root {open} controlledOpen={false} onOpenChange={(open) => (open = open)}>
	<Dialog.Trigger
		class="bg-primary absolute bottom-8 right-8 rounded-full p-2 focus:outline-none"
		tabindex={-1}
	>
		<Icon icon="lucide:plus" class="h-8 w-8" />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[625px]">
		<Dialog.Header class="mx-auto text-center">
			<Dialog.Title>Създаване на нов профил</Dialog.Title>
		</Dialog.Header>
		<form>
			<div class="flex flex-col gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="label" class="text-right">Име на профила</Label>
					<Input id="label" class="col-span-3" bind:value={profile.label} />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="sex" class="text-right">Пол</Label>
					<Select.Root type="single" name="sex" bind:value={profile.sex}>
						<Select.Trigger id="sex" class="col-span-3">
							{profile.sex || ''}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Item value="мъж" label="Мъж">Мъж</Select.Item>
								<Select.Item value="жена" label="Жена">Жена</Select.Item>
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="age" class="text-right">Възраст</Label>
					<Input
						id="age"
						type="number"
						class="col-span-3 appearance-none"
						bind:value={profile.age}
					/>
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="budget" class="text-right">Бюджет</Label>
					<Input id="budget" type="number" class="col-span-3" bind:value={profile.budget} />
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<ul class="col-span-3 col-start-2 flex flex-wrap gap-2">
						{#each profile.interests as interest}
							<li class="contents">
								<button
									class="bg-primary text-primary-foreground roudned-md px-2 py-1"
									onclick={() => removeInterest(interest)}
								>
									{interest}
								</button>
							</li>
						{/each}
					</ul>
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="interests" class="text-right">Интереси</Label>
					<div class="col-span-3 flex flex-wrap gap-2">
						<InputChipV2 bind:values={profile.interests} />
					</div>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="bio" class="text-right">Биография</Label>
					<Textarea id="bio" class="col-span-3" bind:value={profile.bio} />
				</div>
			</div>
			<Dialog.Footer>
				<Button onclick={createProfile}>Създай профил</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
