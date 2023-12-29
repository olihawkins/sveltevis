<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { scaleLinear} from "d3-scale";
  import { getLayout } from "../context.svelte.js";
  import { getSettings } from "../settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    axisDomain: [0, 10],
    lineDomain: [0, 10],
    lineHeight: 0.5,
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

  // Properties --------------------------------------------------------------

  const graphic = $derived(layout.graphic);
  const plot = $derived(layout.plot);
  const margin = $derived(graphic.margin);

  const scale = $derived(scaleLinear(
    settings.axisDomain, 
    [margin.left, margin.left + plot.width]));

</script>

<g class="sveltevis-axis-x">
  <!--Axis line-->
  <rect
    class="sveltevis-axis-x-line"
    x={scale(settings.lineDomain[0])}
    y={margin.top + plot.height}
    height={settings.lineHeight}
    width={scale(settings.lineDomain[1]) - scale(settings.lineDomain[0])} >
</g>

<style>
  .sveltevis-axis-x-line {
    fill: var(--sveltevis-color);
  }

  .sveltevis-axis-x-tick {
    fill: var(--sveltevis-color);
  }  
</style>