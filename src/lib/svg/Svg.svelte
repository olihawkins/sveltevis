<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../layout.svelte.js";
  import { getSettings } from "../settings.js";
  import { noop } from "../events.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    sendEvents: false
  };

 // Props --------------------------------------------------------------------

  let { key = "svg", children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));

  // Events -------------------------------------------------------------------

  function getDeactivateHandler(key, settings, layout) {
  if (settings.sendEvents === true) {
    return (e) => {
      e.stopPropagation();
      layout.event = {
        e: e, 
        key: key, 
        msg: null
      };
    };
  } else {
    noop;
  }
}

</script>

<svg 
  width="100%" 
  height="100%" 
  role="graphics-document",
  onclick={getDeactivateHandler(key, settings, layout)}>
  
    <g class="sveltevis-svg">
      {@render children()}
    </g>
</svg>

