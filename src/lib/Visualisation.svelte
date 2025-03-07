<script lang="ts">

  // Imports ------------------------------------------------------------------

  import type { Snippet } from "svelte";
  import type { Configuration } from "./configuration.ts";
  import type { Layout } from "./layout.svelte.ts";

  import { createConfigs } from "./configuration.ts";
  import { createLayout } from "./layout.svelte.ts";

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

  const layout: Layout = createLayout(createConfigs(spec, defaults));
  const configs: Configuration[] = $derived(createConfigs(spec, defaults));

  $effect(() => {
    layout.configs = [];
    layout.configs = configs;
  });

  // Bound elements -----------------------------------------------------------
  
  let vis: HTMLDivElement | undefined = $state();

  // State --------------------------------------------------------------------

  let visibility: string = $state("hidden");

  // Derived values -----------------------------------------------------------

  let windowWidth: number = $derived(layout.windowWidth);
  let windowHeight: number = $derived(layout.windowHeight);

  // Observe width and update layout ------------------------------------------

  function updateLayout(): void {
    if (vis instanceof HTMLDivElement) {
      layout.width = vis.clientWidth;
      layout.windowWidth = window.innerWidth;
      layout.windowHeight = window.innerHeight;
    }
  }

  // Set up resize handling 
  $effect(() => {		

    // Update width and downstream layout properties
    updateLayout();

    // Set visible once layout properties are known
    visibility = "visible";
    
    // Create resize handler
    const handleResize = (): void => {
      if (windowWidth !== window.innerWidth || 
          windowHeight !== window.innerHeight) {
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