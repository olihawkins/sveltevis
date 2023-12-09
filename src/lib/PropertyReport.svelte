<script>
  
  // Imports ----------------------------------------------------------------------------

  import { getLayout } from "./contexts.svelte.js"
  
  // Props ------------------------------------------------------------------------------

  let { color } = $props();

  // Contexts ---------------------------------------------------------------------------

  const layout = getLayout();

  // Derived values ---------------------------------------------------------------------

  let config = $derived(layout.config);
  let graphic = $derived(layout.graphic);
  let plot = $derived(layout.plot);
  let margin = $derived(graphic.margin);
  
  const rectLong = 50;
  const rectShort = 3;

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

<g transform={`translate(${margin.left} ${margin.top})`} fill={color}>
  <text x=0 y=20>config: {config.vis.name}</text>
  <text x=0 y=40>graphic.width: {graphic.width}</text>
  <text x=0 y=60>graphic.height: {graphic.height}</text>
  <text x=0 y=80>plot.width: {plot.width}</text>
  <text x=0 y=100>plot.height: {plot.height}</text>
</g>

