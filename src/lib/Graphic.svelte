<script>
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./context.svelte.js";
  
  // Props --------------------------------------------------------------------

  let { children = null } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Derived values -----------------------------------------------------------

  let height = $derived(layout.graphic.height);

</script>

<div class="sveltevis-graphic" style:height={`${height}px`}>
  {#if children !== null}
    {@render children()}
  {/if}
</div>

<style>
.sveltevis-graphic {
  margin: 0;
  padding: 0;
}
</style>