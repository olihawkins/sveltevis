<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../context.svelte.js";
  import { getSettings } from "../settings.js";

  // Defaults -----------------------------------------------------------------

  const defaults = {
    scaleX: scaleLinear,
    domainX: [-4, 4],
    showX: true,
    sizeX: 0.5,
    x: [
      {value: -4, label: "-4"},
      {value: -2, label: "-2"},
      {value: 0, label: "0"},
      {value: 2, label: "2"},
      {value: 4, label: "-4"},
    ],
    scaleY: scaleLinear,
    domainY: [-4, 4],
    showY: true,
    sizeY: 0.5,
    y: [
      {value: -4, label: "-4"},
      {value: -2, label: "-2"},
      {value: 0, label: "0"},
      {value: 2, label: "2"},
      {value: 4, label: "4"},
    ],
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
  
  const scaleX = $derived(settings.scaleX(
    settings.domainX, 
    [margin.left, margin.left + plot.width]));

  const scaleY = $derived(settings.scaleY(
    settings.domainY, 
    [margin.top + plot.height, margin.top]));

</script>

<g class="sveltevis-axis-x">

  <!--Gridlines X-->
  {#each settings.x as x, i (i)}
    {#if settings.showX === true}
      <rect
        class="sveltevis-gridline-x"
        x={scaleX(x.value) - (settings.sizeX / 2)}
        y={margin.top}
        width={settings.sizeX}
        height={plot.height} />
    {/if}
  {/each}

  {#each settings.y as y, i (i)}
    {#if settings.showY === true}
    <rect
      class="sveltevis-gridline-y"
      x={margin.left}
      y={scaleY(y.value) - (settings.sizeY / 2)}
      width={plot.width}
      height={settings.sizeY} />
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