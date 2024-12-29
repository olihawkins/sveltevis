<svelte:options namespace="svg" />

<script lang="ts">
  
  // Imports ------------------------------------------------------------------

  import type { Snippet } from "svelte";
  import type { Configuration } from "../configuration.ts";
  import type { Layout } from "../layout.svelte.ts";
  import type { LayoutPlot } from "../layout.svelte.ts";
  import type { LayoutMargin } from "../layout.svelte.ts";

  import { getSettings } from "../configuration.ts";
  import { getLayout } from "../layout.svelte.ts";
  
  // Defaults -----------------------------------------------------------------

  const defaults: Configuration = {
    clip: true
  };

  // Props --------------------------------------------------------------------
  
  interface Props {
    key?: string;
    children?: Snippet;
  }

  let { key = "plot", children }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config: Configuration = $derived(layout.config);
  const settings: Configuration = $derived(getSettings(defaults, config, key));

  // Properties ---------------------------------------------------------------

  let plot: LayoutPlot = $derived(layout.plot);
  let margin: LayoutMargin = $derived(layout.graphic.margin);

</script>

{#if settings.clip === true}
  <clipPath id="sveltevis-plot-clip-path">
    <rect 
      x={margin.left} 
      y={margin.top} 
      width={plot.width} 
      height={plot.height} />
  </clipPath>
  <g clip-path="url(#sveltevis-plot-clip-path)">
    <g class="sveltevis-plot" transform={`translate(${margin.left} ${margin.top})`}>
      {#if children}
        {@render children()}
      {/if}
    </g>
  </g>
{:else}
  <g class="sveltevis-plot" transform={`translate(${margin.left} ${margin.top})`}>
    {#if children}
      {@render children()}
    {/if}
  </g>
{/if}