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
    title: null,
    subtitle: null
  };

  // Props --------------------------------------------------------------------

	interface Props {
		key?: string;
		children?: Snippet;
	}

  let { key = "header", children }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config: Configuration = $derived(layout.config);
  const settings: Configuration = $derived(getSettings(defaults, config, key));
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