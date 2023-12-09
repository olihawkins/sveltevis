<script>
  
  // Imports ----------------------------------------------------------------------------

  import defaults from "./defaults/layoutReportDefaults.js"
  import { getLayout } from "./context.svelte.js";
  import { getSettings } from "./settings.js";
  
  // Layout -----------------------------------------------------------------------------

  const layout = getLayout();

  // Settings ---------------------------------------------------------------------------
  
  const settings = $derived(getSettings(defaults, layout.config, "layoutReport"));
  const color = $derived(settings.color);
  const rectLong = 50;
  const rectShort = 3;

  // Report properties ------------------------------------------------------------------

  const config = $derived(layout.config);
  const graphic = $derived(layout.graphic);
  const plot = $derived(layout.plot);
  const margin = $derived(graphic.margin);

</script>

<!-- Border -->
<rect 
  x=0
  y=0
  width={graphic.width}
  height={graphic.height}
  fill-opacity=0
  stroke={color}
  stroke-width=1 />

<!-- Top left -->
<rect 
  x=0 
  y=0 
  width={rectLong} 
  height={rectShort}
  fill={color} />

<rect 
  x=0 
  y=0 
  width={rectShort} 
  height={rectLong} 
  fill={color} />

<!-- Top right -->
<rect 
  x={graphic.width - rectLong} 
  y=0 
  width={rectLong} 
  height={rectShort}
  fill={color} />

<rect 
  x={graphic.width - rectShort} 
  y=0 
  width={rectShort}  
  height={rectLong}
  fill={color} />

<!-- Bottom right -->
<rect 
  x={graphic.width - rectLong} 
  y={graphic.height - rectShort} 
  width={rectLong} 
  height={rectShort}
  fill={color} />

<rect 
  x={graphic.width - rectShort} 
  y={graphic.height - rectLong} 
  width={rectShort} 
  height={rectLong}
  fill={color} />

<!-- Bottom left -->
<rect 
  x=0 
  y={graphic.height - rectShort} 
  width={rectLong} 
  height={rectShort}
  fill={color} />

<rect 
  x=0 
  y={graphic.height - rectLong} 
  width={rectShort} 
  height={rectLong}
  fill={color} />

<!-- Report -->
<g transform={`translate(${margin.left} ${margin.top})`} fill={color}>
  <text x=0 y=10>config.name: {config.name}</text>
  <text x=0 y=30>graphic.width: {graphic.width}</text>
  <text x=0 y=50>graphic.height: {graphic.height}</text>
  <text x=0 y=70>plot.width: {plot.width}</text>
  <text x=0 y=90>plot.height: {plot.height}</text>
</g>

