<svelte:options namespace="svg" />

<script lang="ts">
  
  // Imports ------------------------------------------------------------------

  import type { Snippet } from "svelte";
  import type { Configuration } from "../configuration.ts";
  import type { Layout } from "../layout.svelte.ts";

  import { getSettings } from "../configuration.ts";
  import { getLayout } from "../layout.svelte.ts";
  
  // Defaults -----------------------------------------------------------------

  const defaults: Configuration = {
    title: null,
    desc: null
  };

  // Props --------------------------------------------------------------------

  interface Props {
    key?: string;
    children?: Snippet;
  }

  let { key = "svg", children }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config: Configuration = $derived(layout.config);
  const settings: Configuration = $derived(getSettings(defaults, config, key));

</script>

<svg 
  width="100%" 
  height="100%" 
  role="graphics-document">
  
  {#if settings.title !== null}
    <title>{settings.title}</title>
  {/if}

  {#if settings.desc !== null}
    <desc>{settings.desc}</desc>
  {/if}
  
  <g class="sveltevis-svg">
    {#if children}
      {@render children()}
    {/if}
  </g>
</svg>

