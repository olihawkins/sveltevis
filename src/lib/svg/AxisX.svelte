<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../context.svelte.js";
  import { getSettings } from "../settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    axisDomain: [0, 10],
    lineDomain: [0, 10],
    lineHeight: 1,
    ticks: [
      {value: 0, label: "0"},
      {value: 2, label: "2"},
      {value: 4, label: "4"},
      {value: 6, label: "6"},
      {value: 8, label: "8"},
      {value: 10, label: "10"},
    ],
    tickWidth: 1,
    tickHeight: 8,
    tickLabelOffset: 8,
    gridlines: true
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

  <!--Axis ticks-->
  {#each settings.ticks as tick (tick.label)}

    <!--Axis gridlines-->
    {#if settings.gridlines === true}
      <rect
        class="sveltevis-axis-x-gridline"
        x={scale(tick.value) - (settings.tickWidth / 2)}
        y={margin.top}
        width={settings.tickWidth}
        height={plot.height} />
    {/if}

    <!--Axis ticks-->
    <rect
      class="sveltevis-axis-x-tick"
      x={scale(tick.value) - (settings.tickWidth / 2)}
      y={margin.top + plot.height}
      width={settings.tickWidth}
      height={settings.tickHeight} />

    <!--Axis tick labels-->
    <text
      class="sveltevis-axis-x-ticklabel"
      x={scale(tick.value) - (settings.tickWidth / 2)}
      y={margin.top + plot.height + settings.tickHeight + settings.tickLabelOffset}
      text-anchor="middle"
      dominant-baseline="hanging">
        {tick.label}
    </text>

  {/each}

  <!--Axis line-->
  <rect
    class="sveltevis-axis-x-line"
    x={scale(settings.lineDomain[0])}
    y={(margin.top + plot.height) - (settings.lineHeight / 2)}
    width={scale(settings.lineDomain[1]) - scale(settings.lineDomain[0])}
    height={settings.lineHeight} />

</g>

<style>

.sveltevis-axis-x-gridline {
    fill: var(--sveltevis-color);
    fill-opacity: 0.5;
  }

  .sveltevis-axis-x-tick {
    fill: var(--sveltevis-color);
  }

  .sveltevis-axis-x-ticklabel {
    fill: var(--sveltevis-color);
    font-size: var(--sveltevis-font-size);
  }

  .sveltevis-axis-x-line {
    fill: var(--sveltevis-color);
  }  
</style>