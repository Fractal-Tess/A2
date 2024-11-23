<script lang="ts">
  import Icon from '@iconify/svelte';

  export let icon: string;
  let className: string = '';
  export { className as class };
</script>

<Icon {icon} class={className} />
