<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../context.svelte.js";
  import { getSettings } from "../settings.js";
  
  // Functions ----------------------------------------------------------------

  function getLineY(linePosition, linePositionMiddle, plotHeight) {
    
    let lineY;
    
    switch (linePosition) {
      case "top":
        lineY = 0;
        break;
      case "middle":
        lineY = plotHeight * (1 - linePositionMiddle);
        break;
      case "bottom":
        lineY = plotHeight;
        break;
      default:
        lineY = plotHeight;
    }
   
    return lineY;
  }

  function getTickY(tickPosition, tickHeight) {
    
    let tickY;

    switch (tickPosition) {
      case "top":
        tickY = -1 * tickHeight;
        break;
      case "middle":
        tickY = -1 * tickHeight / 2;
        break;
      case "bottom":
        tickY = 0;
        break;
      default:
        tickY = 0;
    }

   return tickY;
  }

  function getTickLabelY(tickLabelPosition, tickHeight, tickLabelOffset) {
    
    let tickLabelY;

    switch (tickLabelPosition) {
      case "top":
        tickLabelY = -1 * (tickHeight + tickLabelOffset);
        break;
      case "bottom":
        tickLabelY = tickHeight + tickLabelOffset;
        break;
      default:
        tickLabelY = tickHeight + tickLabelOffset;
    }

   return tickLabelY;
  }

  function getTickLabelBaseline(tickLabelPosition) {
    
    let tickLabelBaseline;

    switch (tickLabelPosition) {
      case "top":
        tickLabelBaseline = "auto";
        break;
      case "bottom":
        tickLabelBaseline = "hanging";
        break;
      default:
        tickLabelBaseline = "hanging";
    }

   return tickLabelBaseline;
  }

  function getLabelY(labelPosition, labelOffset, marginTop, plotHeight) {
    
    let labelY;

    switch (labelPosition) {
      case "top":
        labelY = marginTop + (-1 * labelOffset);
        break;
      case "bottom":
        labelY = marginTop + plotHeight + labelOffset;
        break;
      default:
        labelY = marginTop + plotHeight + labelOffset;
    }

   return labelY;
  }

  function getLabelBaseline(labelPosition) {
    
    let labelBaseline;

    switch (labelPosition) {
      case "top":
        labelBaseline = "auto";
        break;
      case "bottom":
        labelBaseline = "hanging";
        break;
      default:
        labelBaseline = "hanging";
    }

   return labelBaseline;
  }

  // Defaults -----------------------------------------------------------------

  const defaults = {
    scale: scaleLinear,
    domain: [-4, 4],
    showLine: true,
    linePosition: "bottom",
    linePositionMiddle: 0.5,
    lineDomain: [-4, 4],
    lineHeight: 1,
    showTicks: true,
    ticks: [
      {value: -4, label: "-4"},
      {value: -2, label: "-2"},
      {value: 0, label: "0"},
      {value: 2, label: "2"},
      {value: 4, label: "-4"},
    ],
    tickPosition: "bottom",
    tickWidth: 1,
    tickHeight: 6,
    showTickLabels: true,
    tickLabelPosition: "bottom",
    tickLabelOffset: 8,
    showGridlines: false,
    gridlineWidth: 0.5,
    showLabel: false,
    label: "Axis X",
    labelPosition: "bottom",
    labelOffset: 50
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
  
  const scale = $derived(settings.scale(
    settings.domain, 
    [margin.left, margin.left + plot.width]));
  
  const lineY = $derived(getLineY(
    settings.linePosition, 
    settings.linePositionMiddle,
    plot.height));
  
  const tickY = $derived(getTickY( 
    settings.tickPosition,
    settings.tickHeight));

  const tickLabelY = $derived(getTickLabelY( 
    settings.tickLabelPosition,
    settings.tickHeight,
    settings.tickLabelOffset));

  const tickLabelBaseline = $derived(getTickLabelBaseline( 
    settings.tickLabelPosition));

  const labelY = $derived(getLabelY( 
    settings.labelPosition,
    settings.labelOffset,
    margin.top,
    plot.height));

  const labelBaseline = $derived(getLabelBaseline( 
    settings.labelPosition));

</script>

<g class="sveltevis-axis-x">

  <!--Axis ticks-->
  {#each settings.ticks as tick, i (i)}

    <!--Axis gridlines-->
    {#if settings.showGridlines === true}
      <rect
        class="sveltevis-axis-x-gridline"
        x={scale(tick.value) - (settings.gridlineWidth / 2)}
        y={margin.top}
        width={settings.gridlineWidth}
        height={plot.height} />
    {/if}

    <!--Axis ticks-->
    {#if settings.showTicks === true}
      <rect
        class="sveltevis-axis-x-tick"
        x={scale(tick.value) - (settings.tickWidth / 2)}
        y={margin.top + lineY + tickY}
        width={settings.tickWidth}
        height={settings.tickHeight} />
    {/if}

    <!--Axis tick labels-->
    {#if settings.showTickLabels === true}
      <text
        class="sveltevis-axis-x-ticklabel"
        x={scale(tick.value) - (settings.tickWidth / 2)}
        y={margin.top + lineY + tickLabelY}
        text-anchor="middle"
        dominant-baseline={tickLabelBaseline}>
          {tick.label}
      </text>
    {/if}

  {/each}

  <!--Axis line-->
  {#if settings.showLine === true}
    <rect
      class="sveltevis-axis-x-line"
      x={scale(settings.lineDomain[0]) - (settings.tickWidth / 2)}
      y={(margin.top + lineY) - (settings.lineHeight / 2)}
      width={scale(settings.lineDomain[1]) - scale(settings.lineDomain[0]) + settings.tickWidth}
      height={settings.lineHeight} />
  {/if}

  <!--Axis label-->
  {#if settings.showLabel === true}
    <text
      class="sveltevis-axis-x-label"
      x={margin.left + (plot.width / 2)}
      y={labelY}
      text-anchor="middle"
      dominant-baseline={labelBaseline}>
      {settings.label}
    </text>
  {/if}

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
  
  .sveltevis-axis-x-label {
    fill: var(--sveltevis-color);
    font-size: var(--sveltevis-font-size);
  }
</style>