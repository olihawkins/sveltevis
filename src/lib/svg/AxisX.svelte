<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../context.svelte.js";
  import { getSettings } from "../settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    axisDomain: [0, 10],
    lineDomain: [0, 10],
    lineHeight: 1,
    ticks: [0, 2, 4, 6, 8, 10],
    tickLabels: ["0", "2", "4", "6", "8", "10"],
    tickHeight: 5,
    tickWidth: 1
  };

  // Props --------------------------------------------------------------------

  let { key = "axisX" } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));

  // Properties ---------------------------------------------------------

  const graphic = $derived(layout.graphic);
  const plot = $derived(layout.plot);
  const margin = $derived(graphic.margin);

</script>

<g class="sveltevis-axis-x">
  <!--Axis line-->
  <rect
    x={margin.left}
    y={margin.top + plot.height}
    height={settings.lineHeight}
    width={plot.width}
    fill="var(--sveltevis-color)">
</g>