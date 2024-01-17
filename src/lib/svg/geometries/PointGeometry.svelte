<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../../context.svelte.js";
  import { getSettings } from "../../settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    scaleX: scaleLinear,
    domainX: [-4, 4],
    scaleY: scaleLinear,
    domainY: [-4, 4],
    radius: 20
  };

  // Props --------------------------------------------------------------------

  let { key = "pointGeometry", data } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));

  // Properties --------------------------------------------------------------

  const plot = $derived(layout.plot);
  
  const scaleX = $derived(settings.scaleX(
    settings.domainX, 
    [0, plot.width]));

  const scaleY = $derived(settings.scaleY(
    settings.domainY, 
    [plot.height, 0]));

</script>

<g class="sveltevis-point-geometry">
  <circle 
    class="sveltevis-point-geometry-circle"
    cx={scaleX(-4)} 
    cy={scaleY(0)}
    r={settings.radius}>
  </circle>
  <circle 
  class="sveltevis-point-geometry-circle"
  cx={scaleX(4)} 
  cy={scaleY(0)}
  r={settings.radius}>
</circle>
</g>

<style>
  .sveltevis-point-geometry-circle {
    /* fill: var(--sveltevis-color); */
    fill: #00ccff;
    fill-opacity: 0.5;
  }
</style>