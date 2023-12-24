<script>
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./context.svelte.js";
  
  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Derived values -----------------------------------------------------------

  let height = $derived(layout.graphic.height);

</script>

<div class="sveltevis-visualisation-graphic" style:height={`${height}px`}>
  <slot />
</div>

<style>
.sveltevis-visualisation-graphic {
  margin: 0;
  padding: 0;
}
</style>