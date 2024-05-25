<script>
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./context.svelte.js";
  import { getSettings } from "./settings.js";

  // Defaults -----------------------------------------------------------------

  const defaults = {
    title: null,
    subtitle: null
  };

  // Props --------------------------------------------------------------------

  let { key = "header", children = null } = $props();

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
  {#if children !== null}
    {@render children()}
  {/if}

</div>

<style>
  .sveltevis-header {
    margin: 0 0 2rem 0;
    padding: 0;
  }

  .sveltevis-header-title {
    margin: 0 0 0.5rem 0;
    padding: 0;
    line-height: var(--sveltevis-line-height);
    font-size: var(--sveltevis-heading-font-size);
    color: var(--sveltevis-color);
  }

  .sveltevis-header-subtitle {
    margin: 0;
    padding: 0;
    line-height: var(--sveltevis-line-height);
    font-size: var(--sveltevis-font-size);
    color: var(--sveltevis-color);
  }
</style> 
