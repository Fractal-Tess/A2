<script lang="ts">
	import { PUBLIC_FQDN } from '$env/static/public';
	import { createSessionClient } from '$lib/appwrite/client';
	import { Button, Icon } from '@repo/ui';
	import { OAuthProvider } from 'appwrite';

	async function signIn(provider: OAuthProvider) {
		spinner = provider;
		const { account } = createSessionClient();
		await account.createOAuth2Token(provider, `${PUBLIC_FQDN}/sign-in/callback`);
	}
	$effect(() => {
		console.log(spinner);
	});

	let spinner = $state<OAuthProvider | null>(null);
</script>

<div class="relative flex min-h-[100svh]">
	<section class="flex w-full flex-col items-center justify-center gap-8 p-8 lg:w-1/2">
		<h2 class="text-center text-3xl font-bold">Sign In</h2>

		<div class="w-full max-w-md space-y-4">
			<Button
				variant="secondary"
				class="flex w-full items-center justify-center gap-2"
				onclick={() => signIn(OAuthProvider.Google)}
			>
				{#if spinner === OAuthProvider.Google}
					<span class="loading loading-spinner"></span>
				{:else}
					<Icon icon="logos:google-icon" />
					Sign in with Google
				{/if}
			</Button>

			<Button
				variant="secondary"
				class="flex w-full items-center justify-center gap-2"
				onclick={() => signIn(OAuthProvider.Github)}
			>
				{#if spinner === OAuthProvider.Github}
					<span class="loading loading-spinner"></span>
				{:else}
					<Icon icon="logos:github-icon" class="dark:invert" />
					Sign in with GitHub
				{/if}
			</Button>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t"></span>
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background text-muted-foreground px-2">or</span>
				</div>
			</div>

			<Button
				variant="ghost"
				class="dark:bg-muted dark:text-muted-foreground flex w-full items-center justify-center gap-2 opacity-50"
				disabled={true}
			>
				<Icon icon="lucide:key" />
				SSO
			</Button>
			<Button
				variant="outline"
				class="dark:bg-muted dark:text-muted-foreground flex w-full items-center justify-center gap-2 opacity-50"
				disabled={true}
			>
				<Icon icon="lucide:fingerprint" />
				Sign in with Biometrics
			</Button>

			<p class="text-muted-foreground text-center text-sm">
				By signing in, you agree to our <a href="/terms" class="text-blue-600 underline"
					>Terms of Service</a
				>
				and
				<a href="/privacy" class="text-blue-600 underline">Privacy Policy</a>
			</p>
		</div>
	</section>
	<iframe
		title="Spline"
		src="https://my.spline.design/clonercubesimplecopy-50b5369e1dfc1f710359510b87e39412/"
		frameborder="0"
		class="bg-background hidden w-full lg:block lg:w-1/2"
	></iframe>
</div>
