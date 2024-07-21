<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../layout.svelte.js";
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

  // Properties -----------------------------------------------------------

  const windowWidth = $derived(layout.windowWidth);
  const windowHeight = $derived(layout.windowHeight);
  const graphic = $derived(layout.graphic);
  const plot = $derived(layout.plot);
  const margin = $derived(graphic.margin);

</script>

<g class="sveltevis-layout-report-margin">

  <!-- Graphic Border -->
  <rect 
    x=1
    y=1
    width={graphic.width - 2}
    height={graphic.height - 2}
    style:fill-opacity=0
    style:stroke-width=1 />

  <!-- Plot Border -->
    <rect 
    x={graphic.margin.left}
    y={graphic.margin.top}
    width={plot.width}
    height={plot.height}
    style:fill-opacity=0
    style:stroke-width=1
    style:stroke-dasharray="2, 2" />

  <!-- Top left -->
  <rect 
    x=1 
    y=1 
    width={rectLong} 
    height={rectShort} />

  <rect 
    x=1
    y=1 
    width={rectShort} 
    height={rectLong}  />

  <!-- Top right -->
  <rect 
    x={graphic.width - rectLong - 1} 
    y=1 
    width={rectLong} 
    height={rectShort} />

  <rect 
    x={graphic.width - rectShort - 1} 
    y=1 
    width={rectShort}  
    height={rectLong} />

  <!-- Bottom right -->
  <rect 
    x={graphic.width - rectLong - 1} 
    y={graphic.height - rectShort - 1} 
    width={rectLong} 
    height={rectShort} />

  <rect 
    x={graphic.width - rectShort - 1} 
    y={graphic.height - rectLong - 1} 
    width={rectShort} 
    height={rectLong} />

  <!-- Bottom left -->
  <rect 
    x=1 
    y={graphic.height - rectShort - 1} 
    width={rectLong} 
    height={rectShort} />

  <rect 
    x=0 
    y={graphic.height - rectLong - 1} 
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
    <text x=20 y=50>window.innerHeight: {windowHeight}</text>
    <text x=20 y=70>config.name: {config.name}</text>
    <text x=20 y=90>graphic.width: {graphic.width}</text>
    <text x=20 y=110>graphic.height: {graphic.height}</text>
    <text x=20 y=130>plot.width: {plot.width}</text>
    <text x=20 y=150>plot.height: {plot.height}</text>
</g>