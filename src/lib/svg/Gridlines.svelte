<svelte:options namespace="svg" />

<script lang="ts">
  
  // Imports ------------------------------------------------------------------

  import type { Configuration } from "../configuration.ts";
  import type { Layout } from "../layout.svelte.ts";
  import type { LayoutGraphic } from "../layout.svelte.ts";
  import type { LayoutPlot } from "../layout.svelte.ts";
  import type { LayoutMargin } from "../layout.svelte.ts";

  import { scaleLinear } from "d3-scale";
  import { getSettings } from "../configuration.ts";
  import { getLayout } from "../layout.svelte.ts";

  // Defaults -----------------------------------------------------------------

  const defaults: Configuration = {
    linesize: 0.5,
    x: {
      show: true,
      scale: scaleLinear,
      domain: [-4, 4],
      lines: [
        {value: -4},
        {value: -2},
        {value: 0},
        {value: 2},
        {value: 4},
      ]
    },
    y: {
      show: true,
      scale: scaleLinear,
      domain: [-4, 4],
      lines: [
        {value: -4},
        {value: -2},
        {value: 0},
        {value: 2},
        {value: 4},
      ]
    }
  };

  // Props --------------------------------------------------------------------

  interface Props {
    key?: string;
  }

  let { key = "gridlines" }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config: Configuration = $derived(layout.config);
  const settings: Configuration = $derived(getSettings(defaults, config, key));

  // Properties --------------------------------------------------------------

  const graphic: LayoutGraphic = $derived(layout.graphic);
  const plot: LayoutPlot = $derived(layout.plot);
  const margin: LayoutMargin = $derived(graphic.margin);
  
  const scaleX: CallableFunction = $derived(settings.x.scale(
    settings.x.domain, 
    [margin.left, margin.left + plot.width]));

  const scaleY: CallableFunction = $derived(settings.y.scale(
    settings.y.domain, 
    [margin.top + plot.height, margin.top]));

</script>

<g class="sveltevis-axis-x">

  <!--Gridlines X-->
  {#each settings.x.lines as line (line.value)}
    {#if settings.x.show === true}
      <rect
        class="sveltevis-gridline-x"
        x={scaleX(line.value) - (settings.linesize / 2)}
        y={margin.top - (settings.linesize / 2)}
        width={settings.linesize}
        height={plot.height + settings.linesize} />
    {/if}
  {/each}

  {#each settings.y.lines as line (line.value)}
    {#if settings.y.show === true}
    <rect
      class="sveltevis-gridline-y"
      x={margin.left - (settings.linesize / 2)}
      y={scaleY(line.value) - (settings.linesize / 2)}
      width={plot.width + settings.linesize}
      height={settings.linesize} />
    {/if}
  {/each}

</g>