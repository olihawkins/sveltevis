<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../layout.svelte.js";
  import { getSettings } from "../settings.js";

  // Defaults -----------------------------------------------------------------

  const defaults = {
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

  let { key = "gridlines" } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));

  // Properties --------------------------------------------------------------

  const graphic = $derived(layout.graphic);
  const plot = $derived(layout.plot);
  const margin = $derived(graphic.margin);
  
  const scaleX = $derived(settings.x.scale(
    settings.x.domain, 
    [margin.left, margin.left + plot.width]));

  const scaleY = $derived(settings.y.scale(
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