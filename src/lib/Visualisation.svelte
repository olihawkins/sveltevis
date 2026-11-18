<script lang="ts">

  // Imports ------------------------------------------------------------------

  import type { Snippet } from "svelte";
  import type { Configuration } from "./configuration.js";
  import type { Layout } from "./layout.svelte";

  import { untrack } from "svelte";
  import { createConfigs } from "./configuration.js";
  import { createLayout } from "./layout.svelte";

  // Defaults -----------------------------------------------------------------

  const defaults: Configuration = {
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

	interface Props {
		spec?: Configuration;
		children?: Snippet;
	}

  let { spec = {}, children }: Props = $props();

  // Layout -------------------------------------------------------------------

  const configs: Configuration[] = $derived(createConfigs(spec, defaults));
  const layout: Layout = createLayout(untrack(() => configs[0]));

  // Bound elements -----------------------------------------------------------
  
  let vis: HTMLDivElement | undefined = $state();

  // State --------------------------------------------------------------------

  let visibility: string = $state("hidden");

  // Derived values -----------------------------------------------------------

  let windowWidth: number = $derived(layout.windowWidth);
  let windowHeight: number = $derived(layout.windowHeight);

  // Config selection ---------------------------------------------------------


  // Observe window width and update layout -----------------------------------

  function updateWindowDimensions(): void {
    if (vis instanceof HTMLDivElement) {
      layout.windowWidth = window.innerWidth;
      layout.windowHeight = window.innerHeight;
    }
  }

  // Set up window resize handling 
  $effect(() => {		

    // Update the window dimensions in the layout
    updateWindowDimensions();
    
    // Create resize handler
    const handleWindowResize = (): void => {
      if (windowWidth !== window.innerWidth || 
          windowHeight !== window.innerHeight) {
        updateWindowDimensions();
      }
    };

    // Add resize listener
    window.addEventListener("resize", handleWindowResize);

    return () => {
      // Remove resize listener
      window.removeEventListener("resize", handleWindowResize);
    }
  });

  // Config selection ---------------------------------------------------------
  
  function getConfig(clientWidth: number): Configuration {
      let config = layout.config;
      for (const c of configs) {
        if (clientWidth >= c.visualisation.minwidth) {
          config = c;
          break;
        }
      }
      return config;
  }

  // Observe visualisation width and update layout ----------------------------

  $effect(() => {
    
    if (!(vis instanceof HTMLDivElement)) return;

    // capture a stable, non-nullable reference for the closure
    const element = vis; 

    const observer = new ResizeObserver(() => {
      // Set layout width to draw in the space available
      layout.width = element.clientWidth;
      // Set config based on clientWidth
      layout.config = getConfig(element.clientWidth);
      // Set visible once layout properties are known: no-op when unchanged
      visibility = "visible";
    });

    observer.observe(element);

    return () => {
      // Remove resize observer
      observer.disconnect();
    }
  });

</script>

<div class="sveltevis-visualisation" style:visibility={visibility} bind:this={vis}>
  {#if children}
    {@render children()}
  {/if}
</div>