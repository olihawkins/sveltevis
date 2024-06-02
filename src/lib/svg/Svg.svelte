<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../layout.svelte.js";
  import { getSettings } from "../settings.js";
  import { noop } from "../events.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    sendClickEvents: false,
    sendMouseEvents: false
  };

 // Props --------------------------------------------------------------------

  let { key = "svg", children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));

  // Events -------------------------------------------------------------------

  function getClickEventsHandler(key, settings, layout) {
    if (settings.sendClickEvents === true) {
      return (e) => {
        e.stopPropagation();
        layout.event = { e: e, key: key, data: "" };
      };
    } else {
      return noop;
    }
  }

  function getMouseEventsHandler(key, settings, layout) {
    if (settings.sendMouseEvents === true) {
      return (e) => {
        e.stopPropagation();
        layout.event = { e: e, key: key, data: "" };
      };
    } else {
      return noop;
    }
  }

</script>

<svg 
  width="100%" 
  height="100%" 
  role="graphics-document",
  onclick={getClickEventsHandler(key, settings, layout)}
  onmouseover={getMouseEventsHandler(key, settings, layout)}
  onmouseout={getMouseEventsHandler(key, settings, layout)}>
  
    <g class="sveltevis-svg">
      {@render children()}
    </g>
</svg>

