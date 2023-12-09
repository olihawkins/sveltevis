<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./contexts.svelte.js"
  
  // Contexts -----------------------------------------------------------------

  const layout = getLayout();

  // Derived values -----------------------------------------------------------

  let margin = $derived(layout.graphic.margin);

</script>

<g id="plot" transform={`translate(${margin.left} ${margin.top})`}>
  <slot />
</g>

<style>
  #plot {
    margin: 0;
    padding: 0;
  }
</style>