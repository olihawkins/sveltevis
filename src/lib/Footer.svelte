<script>
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./context.svelte.js";
  import { getSettings } from "./settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    footnote: null,
    source: null
  };

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, "footer"));
</script>

<div class="sveltevis-footer">
  <slot />
  {#if settings.footnote !== null}
    <p class="sveltevis-footer-footnote">
      {@html settings.footnote}
    </p>
  {/if}
  {#if settings.source !== null}
    <p class="sveltevis-footer-source">
      {@html settings.source}
    </p>
  {/if}
</div>

<style>
  .sveltevis-footer {
    margin: 2rem 0 0 0;
    padding: 0;
  }

  .sveltevis-footer-footnote {
    margin: 0 0 0.5rem 0;
    line-height: var(--sveltevis-line-height);
    font-size: var(--sveltevis-font-size);
    color: var(--sveltevis-color); 
  }

  .sveltevis-footer-source {
    margin: 0;
    padding: 0;
    line-height: var(--sveltevis-line-height);
    font-size: var(--sveltevis-font-size);
    color: var(--sveltevis-color);
  }
</style>