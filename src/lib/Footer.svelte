<script lang="ts">

  // ESLint overrides ---------------------------------------------------------

  /* eslint-disable svelte/no-at-html-tags */

  // Imports ------------------------------------------------------------------

  import type { Snippet } from "svelte";
  import type { Configuration } from "./configuration.ts";
  import type { Layout } from "./layout.svelte.ts";

  import { getSettings } from "./configuration.ts";
  import { getLayout } from "./layout.svelte.ts";
  
  // Defaults -----------------------------------------------------------------

  const defaults: Configuration = {
    footnote: null,
    source: null
  };

  // Props --------------------------------------------------------------------

	interface Props {
		key?: string;
		children?: Snippet;
	}

  let { key = "footer", children }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config: Configuration = $derived(layout.config);
  const settings: Configuration = $derived(getSettings(defaults, config, key));
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