<svelte:options namespace="svg" />

<script lang="ts">
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../layout.svelte.ts";
  import { getSettings } from "../configuration.ts";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    clip: true
  };

 // Props --------------------------------------------------------------------

  let { key = "plot", children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));

  // Properties ---------------------------------------------------------------

  let margin = $derived(layout.graphic.margin);
  let plot = $derived(layout.plot);

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
    {#if children !== null}
      {@render children()}
    {/if}
  </g>
{/if}