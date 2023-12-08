<script>

  // Imports ----------------------------------------------------------------------------

  import { onMount } from "svelte";
  import { createLayout } from "./contexts.svelte.js";

  // Props ------------------------------------------------------------------------------

  let { configs } = $props();

  // Contexts ---------------------------------------------------------------------------

  const layout = createLayout(configs);

  // Bound elements ---------------------------------------------------------------------
  
  let vis = $state();

  // Derived values ---------------------------------------------------------------------

  let graphicWidth = $derived(layout.graphicWidth);
  let graphicHeight = $derived(layout.graphicHeight);

  // Observe width and update config ----------------------------------------------------

  function updateLayout() {
    layout.graphicWidth = vis.clientWidth;
  }

  // Set up resize handling 
  onMount(() => {		

    // Update width and downstream properties
    updateLayout();
    
    // Add resize listener
    const resizeListener = () => {
      if (graphicWidth !== vis.clientWidth) {
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
  <div id="graphic" style:height={`${graphicHeight}px`}>
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
    border: 1px solid #909090;
  }

  #header {
    margin: 0;
    padding: 0;
  }

  #graphic {
    margin: 0;
    padding: 0;
    border: 1px solid #909090;
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