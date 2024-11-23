<script lang="ts">
	import { PUBLIC_FQDN } from '$env/static/public';
	import { createSessionClient } from '$lib/client/appwrite';
	import { Button, Icon } from '@repo/ui';
	import { OAuthProvider } from 'appwrite';

	async function signIn(provider: OAuthProvider) {
		const { account } = createSessionClient();
		await account.createOAuth2Token(provider, `${PUBLIC_FQDN}/sign-in/callback`);
	}
</script>

<div class="relative flex min-h-[100svh]">
	<section class="flex w-full flex-col items-center justify-center gap-8 p-8 lg:w-1/2">
		<h2 class="text-center text-3xl font-bold">Sign In</h2>

		<div class="w-full max-w-md space-y-4">
			<Button
				variant="outline"
				class="dark:bg-muted dark:text-muted-foreground flex w-full items-center justify-center gap-2"
				onclick={() => signIn(OAuthProvider.Google)}
			>
				<Icon icon="logos:google-icon" />
				Sign in with Google
			</Button>

			<Button
				variant="outline"
				class="dark:bg-muted dark:text-muted-foreground flex w-full items-center justify-center gap-2"
				onclick={() => signIn(OAuthProvider.Github)}
			>
				<Icon icon="logos:github-icon" class="dark:invert" />
				Sign in with GitHub
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
				variant="outline"
				class="dark:bg-muted dark:text-muted-foreground flex w-full items-center justify-center gap-2"
				onclick={() => alert('Not implemented')}
			>
				<Icon icon="lucide:key" />
				SSO
			</Button>
			<Button
				variant="outline"
				class="dark:bg-muted dark:text-muted-foreground flex w-full items-center justify-center gap-2"
				onclick={() => alert('Not implemented')}
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
		class="hidden lg:block lg:w-1/2"
		src="https://my.spline.design/clonercubesimplecopy-50b5369e1dfc1f710359510b87e39412/"
		frameborder="0"
	></iframe>
</div>
