<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../../context.svelte.js";
  import { getSettings } from "../../settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    x: {
      name: "x",
      scale: scaleLinear,
      domain: [-4, 4]
    },
    y: {
      name: "y",
      scale: scaleLinear,
      domain: [-4, 4],
    },
    radius: 8  
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
  
  const scaleX = $derived(settings.x.scale(
    settings.x.domain, 
    [0, plot.width]));

  const scaleY = $derived(settings.y.scale(
    settings.y.domain, 
    [plot.height, 0]));

</script>

<g class="sveltevis-point-geometry">
  {#each data as point (point.id)}
    <circle 
      class="sveltevis-point-geometry-circle"
      on:mouseover={() => console.log(point)}
      on:focus={() => console.log(point)}
      role="log"
      cx={scaleX(point[settings.x.name])} 
      cy={scaleY(point[settings.y.name])} 
      r={settings.radius}>
    </circle>
  {/each}
  <!-- <circle 
    class="sveltevis-point-geometry-circle"
    cx={scaleX(-4)} 
    cy={scaleY(4)}
    r={settings.radius}>
  </circle>
  <circle 
    class="sveltevis-point-geometry-circle"
    cx={scaleX(4)} 
    cy={scaleY(-4)}
  r={settings.radius}>
</circle> -->
</g>

<style>
  .sveltevis-point-geometry-circle {
    /* fill: var(--sveltevis-color); */
    fill: #00ccff;
    fill-opacity: 0.5;
  }
</style>