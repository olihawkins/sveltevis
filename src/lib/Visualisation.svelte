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

  // Derived values -----------------------------------------------------------

  let width = $derived(layout.width);
  let height = $derived(layout.graphic.height);

  // Observe width and update config ------------------------------------------

  function updateLayout() {
    layout.width = vis.clientWidth;
  }

  // Set up resize handling 
  onMount(() => {		

    // Update width and downstream properties
    updateLayout();
    
    // Add resize listener
    const resizeListener = () => {
      if (width !== vis.clientWidth) {
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

<div id="vis" bind:this={vis}>
  <div id="header" >
      <slot name="header" />
  </div>
  <div id="graphic" style:height={`${height}px`}>
      <svg>
        <slot />
      </svg>
  </div>
  <div id="footer">
      <slot name="footer" />
  </div>
</div>

<style>
  #vis {
    margin: 0;
    padding: 0;
  }

  #header {
    margin: 0;
    padding: 0;
  }

  #graphic {
    margin: 0;
    padding: 0;
  }

  #footer {
    margin: 0;
    padding: 0;
  }

  svg {
    width: 100%;
    height: 100%
  }
</style>