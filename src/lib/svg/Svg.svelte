<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../layout.svelte.js";
  import { getSettings } from "../settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
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
      <desc>{settings.desc}</desc>
    {/if}
  
    <g class="sveltevis-svg">
      {@render children()}
    </g>
</svg>

