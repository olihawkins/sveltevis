<script>

  // Imports ------------------------------------------------------------------

  import { onMount } from "svelte";
  import { createConfigs } from "./settings.js";
  import { createLayout } from "./context.svelte.js";

  // Defaults -----------------------------------------------------------------

  const defaults = {
    main: {
      name: "main",
      visualisation: {
        minwidth: 0,
        graphic: {
          height: 450,
          margin: {
            top: 50, 
            right: 50, 
            bottom: 50, 
            left: 50
          }
        }
      }
    },
    alts: []
  };

  // Props --------------------------------------------------------------------

  let { spec = {} } = $props();

  // Layout -------------------------------------------------------------------

  const configs = createConfigs(spec, defaults);
  const layout = createLayout(configs);

  // Bound elements -----------------------------------------------------------
  
  let vis = $state();

  // State --------------------------------------------------------------------

  let visibility = $state("hidden");

  // Derived values -----------------------------------------------------------

  let windowWidth = $derived(layout.windowWidth);

  // Observe width and update layout ------------------------------------------

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
    
    // Create resize handler
    const handleResize = () => {
      if (windowWidth !== window.innerWidth) {
        updateLayout();
      }
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove resize listener
      window.removeEventListener("resize", handleResize);
    }
  });

</script>

<div class="sveltevis-visualisation" style:visibility={visibility} bind:this={vis}>
  <slot />
</div>

<style>
  .sveltevis-visualisation {
    margin: 2rem 0 2rem 0;
    padding: 0;
  }
</style>