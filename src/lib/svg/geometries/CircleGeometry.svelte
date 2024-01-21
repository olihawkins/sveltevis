<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { 
    scaleLinear,
    scaleOrdinal,
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

  function getFill(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "fill", 
      settings.fill);
  }

  function getFillOpacity(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "fillOpacity", 
      settings.fillOpacity);
  }

  function getStroke(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "stroke", 
      settings.stroke);
  }

  function getStrokeOpacity(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "strokeOpacity", 
      settings.strokeOpacity);
  }  

  function getStrokeWidth(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "strokeWidth", 
      settings.strokeWidth);
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
      },
      fill: {
        name: null,
        scale: scaleOrdinal,
        domain: [],
        range: []
      },
      fillOpacity: {
        name: null,
        scale: scaleLinear,
        domain: [],
      },
      stroke: {
        name: null,
        scale: scaleOrdinal,
        domain: [],
        range: []
      },
      strokeOpacity: {
        name: null,
        scale: scaleLinear,
        domain: [],
      },
      strokeWidth: {
        name: null,
        scale: scaleLinear,
        domain: [],
      }
    },
    radius: 8,
    fill: "var(--sveltevis-color)",
    fillOpacity: 1,
    stroke: "var(--sveltevis-color)",
    strokeOpacity: 1,
    strokeWidth: 1
  };

  // Props --------------------------------------------------------------------

  let { key = "circleGeometry", data } = $props();

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

  const scaleFill = $derived(mappings.fill.scale(
    mappings.fill.domain, 
    mappings.fill.range));

  const scaleFillOpacity = $derived(mappings.fillOpacity.scale(
    mappings.fillOpacity.domain, 
    [0, settings.fillOpacity]));

  const scaleStroke = $derived(mappings.stroke.scale(
    mappings.stroke.domain, 
    mappings.stroke.range));

  const scaleStrokeOpacity = $derived(mappings.strokeOpacity.scale(
    mappings.strokeOpacity.domain, 
    [0, settings.strokeOpacity]));

  const scaleStrokeWidth = $derived(mappings.strokeWidth.scale(
    mappings.strokeWidth.domain, 
    [0, settings.strokeWidth]));

</script>

<g class="sveltevis-circle-geometry">
  {#each data as point (point.id)}
    <circle 
      class="sveltevis-circle-geometry-circle"
      on:mouseover={() => console.log(point)}
      on:focus={() => console.log(point)}
      role="log"
      cx={getX(point, scaleX, settings)} 
      cy={getY(point, scaleY, settings)} 
      r={getRadius(point, scaleRadius, settings)}
      style:fill={getFill(point, scaleFill, settings)}
      style:fill-opacity={getFillOpacity(point, scaleFillOpacity, settings)}
      style:stroke={getStroke(point, scaleStroke, settings)}
      style:stroke-opacity={getStrokeOpacity(point, scaleStrokeOpacity, settings)}
      style:stroke-width={getStrokeWidth(point, scaleStrokeWidth, settings)}>
    </circle>
  {/each}
</g>