<script lang="ts">
	import { Button } from '@repo/ui/button';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { toggleMode } from 'mode-watcher';
	import { page } from '$app/stores';
</script>

<header
	class={`dark:shadow-primary ${$page.url.pathname === '/sign-in' ? 'hidden' : ''} flex h-16 items-center justify-between px-4 shadow-lg`}
>
	<a href="/collections">
		<span class="text-primary text-2xl font-black">A2</span>
	</a>
	<div class="flex items-center justify-between gap-4">
		<nav class="flex gap-2 md:gap-4">
			<Button href="/collections" variant="link" class="max-sm:px-0">Collections</Button>
			<Button href="/profiles" variant="link" class="max-sm:px-0">Profiles</Button>
			<Button href="/sign-out" variant="outline">Sign-out</Button>
		</nav>
		<Button onclick={toggleMode} variant="outline" size="icon" data-sveltekit-preload-data="off">
			<Sun class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon
				class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</header>
