<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../layout.svelte.js";
  import { getSettings } from "../settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    events: []
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
  
    <g class="sveltevis-svg">
      {@render children()}
    </g>
</svg>

