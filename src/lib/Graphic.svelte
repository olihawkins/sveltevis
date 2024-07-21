<script>
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./layout.svelte.js";
  
  // Props --------------------------------------------------------------------

  let { children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Derived values -----------------------------------------------------------

  let height = $derived(layout.graphic.height);

</script>

<div class="sveltevis-graphic" style:height={`${height}px`}>
  {#if children}
    {@render children()}
  {/if}
</div>