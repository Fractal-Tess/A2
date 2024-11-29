<script lang="ts">
	import { Button } from '@repo/ui';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { toggleMode } from 'mode-watcher';
</script>

<header class="dark:shadow-primary flex h-16 items-center justify-between px-4 shadow-lg">
	<div>
		<span class="rotating-gradient bg-clip-text text-2xl font-black text-transparent"> A2 </span>
	</div>
	<div class="flex items-center justify-between gap-4">
		<nav class="flex gap-4">
			<Button href="/dashboard" variant="link">Dashboard</Button>
			<Button href="/profiles" variant="link">Profiles</Button>
			<Button href="/sign-out" variant="outline">Sign-out</Button>
		</nav>
		<Button onclick={toggleMode} variant="outline" size="icon" data-sveltekit-preload-data="off">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</header>

<style>
	@keyframes rotateGradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.rotating-gradient {
		background-image: linear-gradient(
			270deg,
			hsl(var(--primary) / 0.7),
			hsl(var(--primary) / 0.5),
			hsl(var(--primary) / 0.3)
		);
		background-size: 400% 400%;
		animation: rotateGradient 5s ease infinite;
	}
</style>
