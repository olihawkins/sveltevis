<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./layout.svelte.js";
  import { getSettings } from "./settings.js";

  // Events -------------------------------------------------------------------

  function processEvent(event) {

    // No actions exist for events with this key
    if (! Object.hasOwn(settings.actions, event.key)) {
      return { ...event, action: "" };
    }

    // Event type is listed in activate action for this key
    if (settings.actions[event.key].activate.includes(event.type)) {
      return { ...event, action: "activate" };
    }

    // Event type is listed in deactivate action for this key
    if (settings.actions[event.key].deactivate.includes(event.type)) {
      return { ...event, action: "deactivate" };
    }

    return { ...event, action: "" };
  }

  // Defaults -----------------------------------------------------------------

  const defaults = {
    actions: {},
    offset: 10
  };

 // Props ---------------------------------------------------------------------

  let { key = "popup", children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Bound elements -----------------------------------------------------------
  
  let popup = $state();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
  const event = $derived(processEvent(layout.event));

  // Display ------------------------------------------------------------------
  
  function getVisibility(event) {
    return (event.action === "activate") ? "visible" : "hidden";
  }

  function getTop(event) {
    let top = "auto";
    if (Object.hasOwn(event, "e") && event.e !== null) {
      const innerRect = event.e.target.getBoundingClientRect();
      const targetTop = window.scrollY + event.e.clientY + settings.offset;
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
      const targetBottom = doc.clientHeight - (window.scrollY + event.e.clientY) + settings.offset;
      if (event.e.clientY > window.innerHeight / 2) {
        bottom = `${targetBottom}px`;
      }
    }
    return bottom;
  }

  function getLeft(event) {
    let left = "auto";
    if (Object.hasOwn(event, "e") && event.e !== null) {
      const targetLeft = window.scrollX + event.e.clientX + settings.offset;
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
      const targetRight = doc.clientWidth - (window.scrollX + event.e.clientX) + settings.offset;
      if (event.e.clientX > window.innerWidth / 2) {
        right = `${targetRight}px`;
      }
    }
    return right;
  }

</script>

<div 
  class="sveltevis-popup" 
  style:visibility={getVisibility(event)}
  style:top={getTop(event)}
  style:bottom={getBottom(event)}
  style:left={getLeft(event)} 
  style:right={getRight(event)} 
  bind:this={popup} >
    {#if event.action === "activate"}
      {@render children(event.key, event.data)}
    {/if}
</div>

<style>
  .sveltevis-popup {
    position: absolute;
  }
</style>
