<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./layout.svelte.js";
  import { getSettings } from "./settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    pad: 10,
    formatters: {},
  };

 // Props --------------------------------------------------------------------

  let { key = "popup" } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
  const event = $derived(layout.event);

  // Functions ----------------------------------------------------------------
  
  function showPopup(event) {
    let show = false;
    if (Object.hasOwn(settings.formatters, event.key) &&
        Object.hasOwn(event, "msg") && event.msg !== null) {
      show = true;
    }
    return show;
  }

  function getContent(event) {
    let content = "";
    if (showPopup(event)) {
      content = settings.formatters[event.key](event);
    }
    return content;
  }

  function getVisibility(event) {
    let visibility = "hidden";
    if (showPopup(event)) {
      visibility = "visible";
    }
    return visibility;
  }

  function getLeft(event) {
    let left = null;
    if (Object.hasOwn(event, "e") && event.e !== null) {
      if (event.e.clientX <= layout.windowWidth / 2) {
        left = `${event.e.pageX + settings.pad}px`;
      }
    }
    return left;
  }

  function getRight(event) {
    let right = null;
    if (Object.hasOwn(event, "e") && event.e !== null) {
      if (event.e.clientX > layout.windowWidth / 2) {
        right = `${layout.windowWidth - (event.e.pageX - settings.pad)}px`;
      }
    }
    return right;
  }

  function getTop(event) {
    let top = null;
    if (Object.hasOwn(event, "e") && event.e !== null) {
      if (event.e.clientY <= layout.windowHeight / 2) {
        top = `${event.e.pageY + settings.pad}px`;
      }
    }
    return top;
  }

  function getBottom(event) {
    let bottom = null;
    if (Object.hasOwn(event, "e") && event.e !== null) {
      if (event.e.clientY > layout.windowHeight / 2) {
        bottom = `${layout.windowHeight - (event.e.pageY - settings.pad)}px`;
      }
    }
    return bottom;
  }

</script>

<div 
  class="sveltevis-popup" 
  style:visibility={getVisibility(event)}
  style:left={getLeft(event)} 
  style:right={getRight(event)} 
  style:top={getTop(event)}
  style:bottom={getBottom(event)} >
    {getContent(event)}
</div>

<style>
  .sveltevis-popup {
    position: absolute;
  }
</style>
