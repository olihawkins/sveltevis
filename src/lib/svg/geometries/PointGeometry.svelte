<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { 
    scaleLinear,
    scaleSqrt } from "d3-scale";
  import { getLayout } from "../../context.svelte.js";
  import { getSettings } from "../../settings.js";
  
  // Functions ----------------------------------------------------------------

  function getValue(point, scale, settings, dimension, fallback) {
    const name = settings.mappings[dimension].name;
    if (name !== null) {
      return scale(point[name]);
    } else {
      return fallback;
    }
  }

  function getX(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "x", 
      0);
  }

  function getY(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "y", 
      0);
  }

  function getRadius(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "radius", 
      settings.radius);
  }

  // Defaults -----------------------------------------------------------------

  const defaults = {
    mappings: {
      x: {
        name: null,
        scale: scaleLinear,
        domain: [-4, 4]
      },
      y: {
        name: null,
        scale: scaleLinear,
        domain: [-4, 4],
      },
      radius: {
        name: null,
        scale: scaleSqrt,
        domain: [0, 4],
      }
    },
    radius: 8,
  };

  // Props --------------------------------------------------------------------

  let { key = "pointGeometry", data } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
  const mappings = $derived(settings.mappings);

  // Properties --------------------------------------------------------------

  const plot = $derived(layout.plot);
  
  const scaleX = $derived(mappings.x.scale(
    mappings.x.domain, 
    [0, plot.width]));

  const scaleY = $derived(mappings.y.scale(
    mappings.y.domain, 
    [plot.height, 0]));

  const scaleRadius = $derived(mappings.radius.scale(
    mappings.radius.domain, 
    [0, settings.radius]));

</script>

<g class="sveltevis-point-geometry">
  {#each data as point (point.id)}
    <circle 
      class="sveltevis-point-geometry-circle"
      on:mouseover={() => console.log(point)}
      on:focus={() => console.log(point)}
      role="log"
      cx={getX(point, scaleX, settings)} 
      cy={getY(point, scaleY, settings)} 
      r={getRadius(point, scaleRadius, settings)}>
    </circle>
  {/each}
</g>

<style>
  .sveltevis-point-geometry-circle {
    fill: #00ccff;
    fill-opacity: 0.4;
  }
</style>