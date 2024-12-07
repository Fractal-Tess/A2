<script lang="ts">
	import type { ProfileModel } from '$lib/appwrite/types';
	import * as Card from '@repo/ui/card';
	import { Badge } from '@repo/ui/badge';
	import { Avatar, AvatarFallback } from '@repo/ui/avatar';
	import { Button, Icon } from '@repo/ui';

	let {
		profile,
		activate,
		isActive
	}: { profile: ProfileModel; activate: () => void; isActive: boolean } = $props();
</script>

<Card.Root class="max-w-md {isActive ? 'border-primary border-2' : 'opacity-75'}">
	<Card.Header>
		<div class="flex items-center space-x-4">
			<Avatar>
				<AvatarFallback>{profile.label.slice(0, 2).toUpperCase()}</AvatarFallback>
			</Avatar>
			<div>
				<Card.Title class="text-2xl">{profile.label}</Card.Title>
				<p class="text-muted-foreground text-sm">ID: {profile.$id}</p>
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="space-y-4">
			<div class="flex items-center space-x-2">
				<Icon icon="lucide:user" class="text-muted-foreground h-5 w-5" />
				<span>{profile.age} years old, {profile.sex}</span>
			</div>
			<div class="flex items-center">
				<Icon icon="lucide:wallet" class="text-muted-foreground mr-2 h-5 w-5" />
				<span>Budget: {profile.budget.toLocaleString()}</span>
				<Icon icon="lucide:euro" class="text-muted-foreground h-5 w-5" />
			</div>
			<div>
				<h3 class="flex items-center space-x-2 font-semibold">
					<Icon icon="lucide:heart" class="text-muted-foreground h-5 w-5" />
					<span>Interests</span>
				</h3>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each profile.interests as interest, index}
						<Badge variant="secondary">{interest}</Badge>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="flex items-center space-x-2 font-semibold">
					<Icon icon="lucide:info" class="text-muted-foreground h-5 w-5" />
					<span>Bio</span>
				</h3>
				<p class="text-muted-foreground mt-2 text-xs">{profile.bio}</p>
			</div>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button onclick={activate} disabled={isActive} class="w-full"
			>{isActive ? 'In use' : 'Activate'}</Button
		>
	</Card.Footer>
</Card.Root>
