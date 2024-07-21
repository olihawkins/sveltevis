<script>
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./layout.svelte.js";
  import { getSettings } from "./settings.js";

  // Defaults -----------------------------------------------------------------

  const defaults = {
    title: null,
    subtitle: null
  };

  // Props --------------------------------------------------------------------

  let { key = "header", children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
</script>

<div class="sveltevis-header">
  {#if settings.title !== null}
    <p class="sveltevis-header-title">
      {@html settings.title}
    </p>
  {/if}
  {#if settings.subtitle !== null}
    <p class="sveltevis-header-subtitle">
      {@html settings.subtitle}
    </p>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>