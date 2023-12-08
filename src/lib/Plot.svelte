<script>
  
  // Imports ----------------------------------------------------------------------------

  import { getLayout } from "./contexts.svelte.js"
  
  // Contexts ---------------------------------------------------------------------------

  const layout = getLayout();

  // Derived values ---------------------------------------------------------------------

  let graphicMargin = $derived(layout.graphicMargin);

</script>

<g id="plot" transform={`translate(${graphicMargin.left} ${graphicMargin.top})`}>
  <slot />
</g>

<style>
  #plot {
    margin: 0;
    padding: 0;
  }
</style>