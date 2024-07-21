<script>

  // Imports ------------------------------------------------------------------

  import { createConfigs } from "./settings.js";
  import { createLayout } from "./layout.svelte.js";

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

  let { spec = {}, children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = createLayout(createConfigs(spec, defaults));
  const configs = $derived(createConfigs(spec, defaults));
  $effect(() => layout.configs = configs);

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
    layout.windowHeight = window.innerHeight;
  }

  // Set up resize handling 
  $effect(() => {		

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
  {#if children}
    {@render children()}
  {/if}
</div>