<script>

  // Imports ------------------------------------------------------------------

  import { onMount } from "svelte";
  import Visualisation from "$lib/Visualisation.svelte";

  // Props --------------------------------------------------------------------

  let { lightSpec = {}, darkSpec = {} } = $props();

  // State --------------------------------------------------------------------

  let isDarkMode = $state(false);

  // Observe and update color scheme ------------------------------------------

  onMount(() => {	
    
    // Set initial color scheme
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    isDarkMode = prefersDarkMode.matches;

    // Create color scheme handler
    const handleColorSchemeChange = (event) => {
      isDarkMode = event.matches;
    };

    // Add color scheme listener
    prefersDarkMode.addEventListener("change", handleColorSchemeChange);

    // Remove color scheme listener
    return () => {
      prefersDarkMode.removeEventListener("change", handleColorSchemeChange);
    }
  });

</script>

{#if isDarkMode}
<Visualisation spec={darkSpec}>
  <slot />
</Visualisation>
{:else}
<Visualisation spec={lightSpec}>
  <slot />
</Visualisation>
{/if}