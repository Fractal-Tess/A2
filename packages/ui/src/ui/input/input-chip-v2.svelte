<script lang="ts">
  import { Input } from '@repo/ui/input';
  const { values = $bindable() }: { values: string[] } = $props();
  let inputValue = $state('');

  function addValue(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!inputValue) {
        return;
      }

      if (values.includes(inputValue)) {
        inputValue = '';
        return;
      }

      values.push(inputValue);
      inputValue = '';
    }
  }
</script>

<Input bind:value={inputValue} onkeydown={addValue} />
