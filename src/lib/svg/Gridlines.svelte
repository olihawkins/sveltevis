<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../context.svelte.js";
  import { getSettings } from "../settings.js";

  // Defaults -----------------------------------------------------------------

  const defaults = {
    x: {
      show: true,
      scale: scaleLinear,
      domain: [-4, 4],
      width: 0.5,
      lines: [
        {value: -4, label: "-4"},
        {value: -2, label: "-2"},
        {value: 0, label: "0"},
        {value: 2, label: "2"},
        {value: 4, label: "-4"},
      ]
    },
    y: {
      show: true,
      scale: scaleLinear,
      domain: [-4, 4],
      height: 0.5,
      lines: [
        {value: -4, label: "-4"},
        {value: -2, label: "-2"},
        {value: 0, label: "0"},
        {value: 2, label: "2"},
        {value: 4, label: "4"},
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
  {#each settings.x.lines as line, i (i)}
    {#if settings.x.show === true}
      <rect
        class="sveltevis-gridline-x"
        x={scaleX(line.value) - (settings.x.width / 2)}
        y={margin.top}
        width={settings.x.width}
        height={plot.height} />
    {/if}
  {/each}

  {#each settings.y.lines as line, i (i)}
    {#if settings.y.show === true}
    <rect
      class="sveltevis-gridline-y"
      x={margin.left}
      y={scaleY(line.value) - (settings.y.height / 2)}
      width={plot.width}
      height={settings.y.height} />
    {/if}
  {/each}

</g>

<style>
  .sveltevis-gridline-x {
    fill: var(--sveltevis-color);
    fill-opacity: 0.5;
  }

  .sveltevis-gridline-y {
    fill: var(--sveltevis-color);
    fill-opacity: 0.5;
  }
</style>