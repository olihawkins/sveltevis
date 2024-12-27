<svelte:options namespace="svg" />

<script lang="ts">
  
  // Imports ------------------------------------------------------------------

  import type { Configuration } from "../configuration.ts";
  import type { Layout } from "../layout.svelte.ts";
  import type { LayoutGraphic } from "../layout.svelte.ts";
  import type { LayoutPlot } from "../layout.svelte.ts";
  import type { LayoutMargin } from "../layout.svelte.ts";

  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../layout.svelte.ts";
  import { getSettings } from "../configuration.ts";
  
  // Functions ----------------------------------------------------------------

  function getLineY(
    linePosition: string, 
    linePositionMiddle: number, 
    plotHeight: number
  ): number {
    
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

  function getTickY(
    tickPosition: string, 
    tickHeight: number
  ): number {
    
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

  function getTickLabelY(
    tickLabelPosition: string, 
    tickHeight: number, 
    tickLabelOffset: number
  ): number {
    
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

  function getTickLabelBaseline(
    tickLabelPosition: string
  ): string {
    
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

  function getLabelY(
    labelPosition: string, 
    labelOffset: number, 
    marginTop: number, 
    plotHeight: number
  ): number {
    
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

  function getLabelBaseline(
    labelPosition: string
  ): string {
    
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
    lineExtend: {
      left: 0.5,
      right: 0.5
    },
    showTicks: true,
    ticks: [
      {value: -4, label: "-4"},
      {value: -2, label: "-2"},
      {value: 0, label: "0"},
      {value: 2, label: "2"},
      {value: 4, label: "4"},
    ],
    tickPosition: "bottom",
    tickWidth: 1,
    tickHeight: 6,
    showTickLabels: true,
    tickLabelPosition: "bottom",
    tickLabelOffset: 8,
    showLabel: false,
    label: "Axis X",
    labelPosition: "bottom",
    labelOffset: 50
  };

  // Props --------------------------------------------------------------------

  interface Props {
    key?: string;
  }

  let { key = "axisX" }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config: Configuration = $derived(layout.config);
  const settings: Configuration = $derived(getSettings(defaults, config, key));

  // Properties --------------------------------------------------------------

  const graphic: LayoutGraphic = $derived(layout.graphic);
  const plot: LayoutPlot = $derived(layout.plot);
  const margin: LayoutMargin = $derived(graphic.margin);
  
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
  {#each settings.ticks as tick (tick.value)}

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
      x={scale(settings.lineDomain[0]) - settings.lineExtend.left}
      y={margin.top + lineY - (settings.lineHeight / 2)}
      width={
        scale(settings.lineDomain[1]) - 
        scale(settings.lineDomain[0]) + 
        settings.lineExtend.left + 
        settings.lineExtend.right}
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