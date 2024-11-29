<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function onClick() {
		$page.data.user!.model = {
			...$page.data.user!.model,
			$id: 'hello'
		};
	}
	$effect(() => {
		console.log($page.data.user);
	});
</script>

<button onclick={onClick}>Mutate</button>

<h1>Page data</h1>
<pre class="w-full overflow-x-hidden">
{JSON.stringify($page.data.user, null, 2)}
</pre>
