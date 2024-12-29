<script lang="ts">

  // Props --------------------------------------------------------------------

  interface Props {
    isDarkMode?: boolean;
  }
  
  let { isDarkMode = $bindable() }: Props = $props();

  // Observe and update dark mode ---------------------------------------------

  $effect(() => {	
    
    // Set initial color scheme
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    isDarkMode = prefersDarkMode.matches;

    // Create color scheme handler
    const handleColorSchemeChange = (event: MediaQueryListEvent): void => {
      isDarkMode = event.matches;
    };

    // Add color scheme listener
    prefersDarkMode.addEventListener("change", handleColorSchemeChange);

    // Remove color scheme listener
    return (): void => {
      prefersDarkMode.removeEventListener("change", handleColorSchemeChange);
    }
  });

</script>