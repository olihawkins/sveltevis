<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./layout.svelte.js";
  import { getSettings } from "./settings.js";
  
  // Constants ----------------------------------------------------------------

  const SCROLLBAR_OFFSET = 14;

  // Defaults -----------------------------------------------------------------

  const defaults = {
    formatters: {},
  };

 // Props ---------------------------------------------------------------------

  let { key = "popup" } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Bound elements -----------------------------------------------------------
  
  let popup = $state();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
  const event = $derived(layout.event);

  // Display settings ---------------------------------------------------------
  
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
    let left = "auto";
    if (Object.hasOwn(event, "e") && event.e !== null) {
      const innerRect = event.e.target.getBoundingClientRect();
      const targetLeft = window.scrollX + innerRect.right;
      if (event.e.clientX <= window.innerWidth / 2) {
        left = `${targetLeft}px`;
      }
    }
    return left;
  }

  function getRight(event) {
    let right = "auto";
    if (Object.hasOwn(event, "e") && event.e !== null) {
      const doc = document.documentElement;
      const innerRect = event.e.target.getBoundingClientRect();
      const targetRight = window.innerWidth - (window.scrollX + innerRect.left);
      if (event.e.clientX > window.innerWidth / 2) {
        if (doc.scrollHeight > doc.clientHeight) {
          right = `${targetRight - SCROLLBAR_OFFSET}px`;
        } else {
          right = `${targetRight}px`;
        }
      }
    }
    return right;
  }

  function getTop(event) {
    let top = "auto";
    if (Object.hasOwn(event, "e") && event.e !== null) {
      const innerRect = event.e.target.getBoundingClientRect();
      const targetTop = window.scrollY + innerRect.bottom;
      if (event.e.clientY <= window.innerHeight / 2) {
        top = `${targetTop}px`;
      }
    }
    return top;
  }

  function getBottom(event) {
    let bottom = "auto";
    if (Object.hasOwn(event, "e") && event.e !== null) {
      const doc = document.documentElement;
      const innerRect = event.e.target.getBoundingClientRect();
      const targetBottom = window.innerHeight - (window.scrollY + innerRect.top);
      if (event.e.clientY > window.innerHeight / 2) {
        if (doc.scrollWidth > doc.clientWidth) {
          bottom = `${targetBottom - SCROLLBAR_OFFSET}px`;
        } else {
          bottom = `${targetBottom}px`;
        }
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
  style:bottom={getBottom(event)} 
  bind:this={popup} >
    {getContent(event)}
</div>

<style>
  .sveltevis-popup {
    position: absolute;
  }
</style>
