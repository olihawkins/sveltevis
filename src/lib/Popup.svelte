<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./context.svelte.js";
  import { getSettings } from "./settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    formatters: {}
  };

 // Props --------------------------------------------------------------------

  let { key = "popup" } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
  const event = $derived(layout.event)

  // Functions ----------------------------------------------------------------
  
  function showPopup(event) {
    let show = false;
    if (Object.hasOwn(settings.formatters, event.source) &&
        Object.hasOwn(event, "msg") && event.msg !== null) {
      show = true;
    }
    return show;
  }

  function getContent(event) {
    let content = "";
    if (showPopup(event)) {
      content = settings.formatters[event.source](event);
    }
    return content;
  }

</script>


<div class="sveltevis-popup" style:visibility={showPopup(event)}>
  {getContent(event)}
</div>

<style>
  .sveltevis-popup {
    position: absolute;
  }
</style>
