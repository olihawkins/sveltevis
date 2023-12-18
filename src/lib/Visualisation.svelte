<script>

  // Imports ------------------------------------------------------------------

  import defaults from "./defaults/visualisationDefaults.js"
  import { onMount } from "svelte";
  import { createConfigs, getVisSettings } from "./settings.js";
  import { createLayout } from "./context.svelte.js";

  // Props --------------------------------------------------------------------

  let { config } = $props();

  // Layout -------------------------------------------------------------------

  const visSettings = getVisSettings(defaults, config);
  const configs = createConfigs(visSettings);
  const layout = createLayout(configs);

  // Bound elements -----------------------------------------------------------
  
  let vis = $state();

  // State --------------------------------------------------------------------

  let visibility = $state("hidden");

  // Derived values -----------------------------------------------------------

  let windowWidth = $derived(layout.windowWidth);
  let height = $derived(layout.graphic.height);

  // Observe width and update config ------------------------------------------

  function updateLayout() {
    layout.width = vis.clientWidth;
    layout.windowWidth = window.innerWidth;
  }

  // Set up resize handling 
  onMount(() => {		

    // Update width and downstream layout properties
    updateLayout();

    // Set visible once layout properties are known
    visibility = "visible";
    
    // Add resize listener
    const resizeListener = () => {
      if (windowWidth !== window.innerWidth) {
        updateLayout();
      }
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      // Remove resize listener
      window.removeEventListener("resize", resizeListener);
    }
  });

</script>

<div class="sveltevis-visualisation" style:visibility={visibility} bind:this={vis}>
  <div class="sveltevis-visualisation-header" >
    <slot name="header" />
  </div>
  <div class="sveltevis-visualisation-graphic" style:height={`${height}px`}>
    <slot />
  </div>
  <div class="sveltevis-visualisation-footer">
    <slot name="footer" />
  </div>
</div>

<style>
  .sveltevis-visualisation {
    margin: 0;
    padding: 0;
  }

  .sveltevis-visualisation-header {
    margin: 0;
    padding: 0;
  }

  .sveltevis-visualisation-graphic {
    margin: 0;
    padding: 0;
  }

  .sveltevis-visualisation-footer {
    margin: 0;
    padding: 0;
  }

</style>