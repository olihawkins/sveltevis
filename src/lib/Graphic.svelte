<script lang="ts">
  // Imports ------------------------------------------------------------------

  import type { Snippet } from "svelte";
  import type { Layout } from "./layout.svelte.ts";

  import { getLayout } from "./layout.svelte.ts";
  
  // Props --------------------------------------------------------------------

  interface Props {
    children?: Snippet;
  }
  
  let { children }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Derived values -----------------------------------------------------------

  let height: number = $derived(layout.graphic.height);

</script>

<div class="sveltevis-graphic" style:height={`${height}px`}>
  {#if children}
    {@render children()}
  {/if}
</div>