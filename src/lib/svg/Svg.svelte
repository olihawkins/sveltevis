<svelte:options namespace="svg" />

<script lang="ts">
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../layout.svelte.ts";
  import { getSettings } from "../configuration.ts";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    title: null,
    desc: null
  };

 // Props --------------------------------------------------------------------

  let { key = "svg", children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));

</script>

<svg 
  width="100%" 
  height="100%" 
  role="graphics-document">
  
  {#if settings.title !== null}
    <title>{settings.title}</title>
  {/if}

  {#if settings.desc !== null}
    <desc>{settings.desc}</desc>
  {/if}
  
  <g class="sveltevis-svg">
    {@render children()}
  </g>
</svg>

