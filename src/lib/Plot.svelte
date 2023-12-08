<script>
  
  // Imports ----------------------------------------------------------------------------

  import { getLayout } from "./contexts.svelte.js"
  
  // Contexts ---------------------------------------------------------------------------

  const layout = getLayout();

  // Derived values ---------------------------------------------------------------------

  let config = $derived(layout.config);
  let graphicWidth = $derived(layout.graphicWidth);
  let graphicHeight = $derived(layout.graphicHeight);
  let graphicMargin = $derived(layout.graphicMargin);
  let plotWidth = $derived(layout.plotWidth);
  let plotHeight = $derived(layout.plotHeight);

</script>

<g id="plot" transform={`translate(${graphicMargin.left} ${graphicMargin.top})`}>
  <slot />
  <g>
      <text x=0 y=20>config: {config.vis.name}</text>
      <text x=0 y=40>graphicWidth: {graphicWidth}</text>
      <text x=0 y=60>graphicHeight: {graphicHeight}</text>
      <text x=0 y=80>plotWidth: {plotWidth}</text>
      <text x=0 y=100>plotHeight: {plotHeight}</text>
  </g>
</g>

<style>
  #plot {
    margin: 0;
    padding: 0;
  }
</style>