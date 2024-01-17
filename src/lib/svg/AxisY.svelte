<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../context.svelte.js";
  import { getSettings } from "../settings.js";
  
  // Functions ----------------------------------------------------------------

  function getLineX(linePosition, linePositionMiddle, plotWidth) {
    
    let lineX;
    
    switch (linePosition) {
      case "left":
        lineX = 0;
        break;
      case "middle":
        lineX = plotWidth * linePositionMiddle;
        break;
      case "right":
        lineX = plotWidth;
        break;
      default:
        lineX = 0;
    }
   
    return lineX;
  }

  function getTickX(tickPosition, tickWidth) {
    
    let tickX;

    switch (tickPosition) {
      case "left":
        tickX = -1 * tickWidth;
        break;
      case "middle":
        tickX = -1 * tickWidth / 2;
        break;
      case "right":
        tickX = 0;
        break;
      default:
        tickX = -1 * tickWidth;
    }

   return tickX;
  }

  function getTickLabelX(tickLabelPosition, tickWidth, tickLabelOffset) {
    
    let tickLabelX;

    switch (tickLabelPosition) {
      case "left":
        tickLabelX = -1 * (tickWidth + tickLabelOffset);
        break;
      case "right":
        tickLabelX = tickWidth + tickLabelOffset;
        break;
      default:
        tickLabelX = -1 * (tickWidth + tickLabelOffset);
    }

   return tickLabelX;
  }

  function getTickLabelAnchor(tickLabelPosition) {
    
    let tickLabelAnchor;

    switch (tickLabelPosition) {
      case "left":
        tickLabelAnchor = "end";
        break;
      case "right":
        tickLabelAnchor = "start";
        break;
      default:
        tickLabelAnchor = "end";
    }

   return tickLabelAnchor;
  }

  function getLabelX(labelPosition, labelOffset, marginLeft, plotWidth) {
    
    let labelX;

    switch (labelPosition) {
      case "left":
        labelX = marginLeft + (-1 * labelOffset);
        break;
      case "right":
        labelX = marginLeft + plotWidth + labelOffset;
        break;
      default:
        labelX = marginLeft + (-1 * labelOffset);
    }

   return labelX;
  }

  function getLabelRotation(rotation, labelX, marginTop, plotHeight) {
    return `rotate(${rotation}, ${labelX}, ${marginTop + (plotHeight / 2)})`;
  }

  // Defaults -----------------------------------------------------------------

  const defaults = {
    scale: scaleLinear,
    domain: [-4, 4],
    showLine: true,
    linePosition: "left",
    linePositionMiddle: 0.5,
    lineDomain: [-4, 4],
    lineWidth: 1,
    linePadding: {
      top: 0,
      bottom: 0
    },
    showTicks: true,
    ticks: [
      {value: -4, label: "-4"},
      {value: -2, label: "-2"},
      {value: 0, label: "0"},
      {value: 2, label: "2"},
      {value: 4, label: "4"},
    ],
    tickPosition: "left",
    tickWidth: 6,
    tickHeight: 1,
    showTickLabels: true,
    tickLabelPosition: "left",
    tickLabelOffset: 8,
    showGridlines: false,
    gridlineHeight: 0.5,
    showLabel: false,
    label: "Axis Y",
    labelPosition: "left",
    labelOffset: 50,
    labelRotation: 270
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

  const scale = $derived(settings.scale(
    settings.domain, 
    [margin.top + plot.height, margin.top]));

  const lineX = $derived(getLineX(
    settings.linePosition, 
    settings.linePositionMiddle,
    plot.width));

  const tickX = $derived(getTickX( 
    settings.tickPosition,
    settings.tickWidth));

  const tickLabelX = $derived(getTickLabelX( 
    settings.tickLabelPosition,
    settings.tickWidth,
    settings.tickLabelOffset));

  const tickLabelAnchor = $derived(getTickLabelAnchor( 
    settings.tickLabelPosition));

  const labelX = $derived(getLabelX( 
    settings.labelPosition,
    settings.labelOffset,
    margin.left,
    plot.width));

  const labelRotation = $derived(getLabelRotation(
    settings.labelRotation,
    labelX,
    margin.top,
    plot.height));

</script>

<g class="sveltevis-axis-x">

  <!--Axis ticks-->
  {#each settings.ticks as tick, i (i)}

    <!--Axis gridlines-->
    {#if settings.showGridlines === true}
      <rect
        class="sveltevis-axis-y-gridline"
        x={margin.left}
        y={scale(tick.value) - (settings.gridlineHeight / 2)}
        width={plot.width}
        height={settings.gridlineHeight} />
    {/if}

    <!--Axis ticks-->
    {#if settings.showTicks === true}
      <rect
        class="sveltevis-axis-y-tick"
        x={margin.left + lineX + tickX}
        y={scale(tick.value) - (settings.tickHeight / 2)}
        width={settings.tickWidth}
        height={settings.tickHeight} />
    {/if}

    <!--Axis ticklabels-->
    {#if settings.showTickLabels === true}
      <text
        class="sveltevis-axis-y-ticklabel"
        x={margin.left + lineX + tickLabelX}
        y={scale(tick.value) - (settings.tickHeight / 2)}
        text-anchor={tickLabelAnchor}
        dominant-baseline="middle">
          {tick.label}
      </text>
    {/if}

  {/each}
  
  <!--Axis line-->
  {#if settings.showLine === true}
    <rect
      class="sveltevis-axis-y-line"
      x={(margin.left + lineX) - (settings.lineWidth / 2)}
      y={scale(settings.lineDomain[1]) - (settings.tickHeight / 2)}
      width={settings.lineWidth}
      height={scale(settings.lineDomain[0]) - scale(settings.lineDomain[1]) + settings.tickHeight} />
  {/if}

  <!--Axis label-->
  {#if settings.showLabel === true}
    <text
      class="sveltevis-axis-y-label"
      x={labelX}
      y={margin.top + (plot.height / 2)}
      text-anchor="middle"
      dominant-baseline="middle"
      transform={labelRotation}>
        {settings.label}
    </text>
  {/if}

</g>

<style>
  .sveltevis-axis-y-gridline {
    fill: var(--sveltevis-color);
    fill-opacity: 0.5;
  }

  .sveltevis-axis-y-tick {
    fill: var(--sveltevis-color);
  }

  .sveltevis-axis-y-ticklabel {
    fill: var(--sveltevis-color);
    font-size: var(--sveltevis-font-size);
  }

  .sveltevis-axis-y-line {
    fill: var(--sveltevis-color);
  }

  .sveltevis-axis-y-label {
    fill: var(--sveltevis-color);
    font-size: var(--sveltevis-font-size);
  }
</style>