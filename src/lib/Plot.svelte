<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./context.svelte.js";
  
  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Derived values -----------------------------------------------------------

  let margin = $derived(layout.graphic.margin);

</script>

<g class="sveltevis-plot" transform={`translate(${margin.left} ${margin.top})`}>
  <slot />
</g>