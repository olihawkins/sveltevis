<script>
  
  // Imports ------------------------------------------------------------------

  import defaults from "./defaults/layoutReportDefaults.js"
  import { getLayout } from "./context.svelte.js";
  import { getSettings } from "./settings.js";
  
  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, "layoutReport"));
  const rectLong = $derived(settings.rect.long);
  const rectShort = $derived(settings.rect.short);

  // Report properties --------------------------------------------------------

  const windowWidth = $derived(layout.windowWidth);
  const graphic = $derived(layout.graphic);
  const plot = $derived(layout.plot);
  const margin = $derived(graphic.margin);

</script>

<g class="sveltevis-layout-report-margin">

  <!-- Border -->
  <rect 
    x=0
    y=0
    width={graphic.width}
    height={graphic.height}
    fill-opacity=0
    stroke-width=1 />

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

<!-- Report -->
<g class="sveltevis-layout-report-content" 
  transform={`translate(${margin.left} ${margin.top})`} >
    <text x=0 y=10>windowWidth: {windowWidth}</text>
    <text x=0 y=30>config.name: {config.name}</text>
    <text x=0 y=50>graphic.width: {graphic.width}</text>
    <text x=0 y=70>graphic.height: {graphic.height}</text>
    <text x=0 y=90>plot.width: {plot.width}</text>
    <text x=0 y=110>plot.height: {plot.height}</text>
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
</style>