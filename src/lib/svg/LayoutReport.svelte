<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../context.svelte.js";
  import { getSettings } from "../settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    rect: {
      long: 50,
      short: 3
    }
  };

  // Props --------------------------------------------------------------------

  let { key = "layoutReport" } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
  const rectLong = $derived(settings.rect.long);
  const rectShort = $derived(settings.rect.short);

  // Report properties --------------------------------------------------------

  const windowWidth = $derived(layout.windowWidth);
  const graphic = $derived(layout.graphic);
  const plot = $derived(layout.plot);
  const margin = $derived(graphic.margin);

</script>

<g class="sveltevis-layout-report-margin">

  <!-- Graphic Border -->
  <rect 
    x=0
    y=0
    width={graphic.width}
    height={graphic.height}
    fill-opacity=0
    stroke-width=1 />

  <!-- Plot Border -->
    <rect 
    x={graphic.margin.left}
    y={graphic.margin.top}
    width={plot.width}
    height={plot.height}
    fill-opacity=0
    stroke-width=1
    stroke-dasharray="2, 2" />

  <!-- Top left -->
  <rect 
    x=0 
    y=0 
    width={rectLong} 
    height={rectShort} />

  <rect 
    x=0 
    y=0 
    width={rectShort} 
    height={rectLong}  />

  <!-- Top right -->
  <rect 
    x={graphic.width - rectLong} 
    y=0 
    width={rectLong} 
    height={rectShort} />

  <rect 
    x={graphic.width - rectShort} 
    y=0 
    width={rectShort}  
    height={rectLong} />

  <!-- Bottom right -->
  <rect 
    x={graphic.width - rectLong} 
    y={graphic.height - rectShort} 
    width={rectLong} 
    height={rectShort} />

  <rect 
    x={graphic.width - rectShort} 
    y={graphic.height - rectLong} 
    width={rectShort} 
    height={rectLong} />

  <!-- Bottom left -->
  <rect 
    x=0 
    y={graphic.height - rectShort} 
    width={rectLong} 
    height={rectShort} />

  <rect 
    x=0 
    y={graphic.height - rectLong} 
    width={rectShort} 
    height={rectLong} />

</g>

<!-- Graphic label-->
<text 
  x={graphic.width / 2} 
  y={graphic.height - 20} 
  text-anchor="middle"
  class="sveltevis-layout-report-label">
    Graphic
</text>

<!-- Report -->
<g class="sveltevis-layout-report-content" 
  transform={`translate(${margin.left} ${margin.top})`} >
    
    <!-- Plot label-->
    <text 
    x={plot.width / 2} 
    y={plot.height - 20} 
    text-anchor="middle"
    class="sveltevis-layout-report-label">
      Plot
    </text>

    <!-- Layout properties -->
    <text x=20 y=30>window.innerWidth: {windowWidth}</text>
    <text x=20 y=50>config.name: {config.name}</text>
    <text x=20 y=70>graphic.width: {graphic.width}</text>
    <text x=20 y=90>graphic.height: {graphic.height}</text>
    <text x=20 y=110>plot.width: {plot.width}</text>
    <text x=20 y=130>plot.height: {plot.height}</text>
</g>

<style>
.sveltevis-layout-report-margin {
  fill: var(--sveltevis-color);
  stroke: var(--sveltevis-color);
}
.sveltevis-layout-report-content {
  fill: var(--sveltevis-color);
  font-size: var(--sveltevis-font-size);
}

.sveltevis-layout-report-label {
  fill: var(--sveltevis-color);
  stroke: "none";
  font-size: var(--sveltevis-font-size);
}
</style>