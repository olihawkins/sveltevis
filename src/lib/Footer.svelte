<script>
  // Imports ------------------------------------------------------------------

  import { getLayout } from "./layout.svelte.js";
  import { getSettings } from "./settings.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    footnote: null,
    source: null
  };

  // Props --------------------------------------------------------------------

  let { key = "footer", children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
</script>

<div class="sveltevis-footer">
  {#if children}
    {@render children()}
  {/if}
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