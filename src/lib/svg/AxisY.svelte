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
    lineWidth: 1,
    ticks: [
      {value: 0, label: "0"},
      {value: 2, label: "2"},
      {value: 4, label: "4"},
      {value: 6, label: "6"},
      {value: 8, label: "8"},
      {value: 10, label: "10"},
    ],
    tickWidth: 8,
    tickHeight: 1,
    tickLabelOffset: 8
  };

  // Props --------------------------------------------------------------------

  let { key = "axisY" } = $props();

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
    [margin.top + plot.height, margin.top]));

</script>

<g class="sveltevis-axis-x">
  
  <!--Axis line-->
  <rect
    class="sveltevis-axis-y-line"
    x={margin.left - (settings.lineWidth / 2)}
    y={scale(settings.lineDomain[1])}
    width={settings.lineWidth}
    height={scale(settings.lineDomain[0]) - scale(settings.lineDomain[1])} />

  <!--Axis ticks-->
  {#each settings.ticks as tick (tick.label)}
  <rect
    class="sveltevis-axis-y-tick"
    x={margin.left - settings.tickWidth}
    y={scale(tick.value) - (settings.tickHeight / 2)}
    width={settings.tickWidth}
    height={settings.tickHeight} />
  <text
    class="sveltevis-axis-y-ticklabel"
    x={margin.left - (settings.tickWidth + settings.lineWidth + settings.tickLabelOffset)}
    y={scale(tick.value) - (settings.tickHeight / 2)}
    text-anchor="end"
    dominant-baseline="middle">
      {tick.label}
  </text>  
  {/each}
  
</g>

<style>
  .sveltevis-axis-y-line {
    fill: var(--sveltevis-color);
  }

  .sveltevis-axis-y-tick {
    fill: var(--sveltevis-color);
  }  

  .sveltevis-axis-y-ticklabel {
    fill: var(--sveltevis-color);
    font-size: var(--sveltevis-font-size);
  }
</style>