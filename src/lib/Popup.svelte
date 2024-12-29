<script lang="ts">
  
  // Imports ------------------------------------------------------------------

  import type { Snippet } from "svelte";
  import type { Configuration } from "./configuration.ts";
  import type { Layout, LayoutEvent } from "./layout.svelte.ts";
  
  import { getSettings } from "./configuration.ts";
  import { getLayout } from "./layout.svelte.ts";

  // Interfaces ---------------------------------------------------------------

  interface PopupEvent extends LayoutEvent {
    action: string;
  }

  // Events -------------------------------------------------------------------

  function processEvent(
    settings: Configuration, 
    event: LayoutEvent
  ): PopupEvent {

    // No actions exist for events with this key
    if (! Object.hasOwn(settings.actions, event.key)) {
      return { ...event, action: "" };
    }

    // Event type is listed in activate action for this key
    if (settings.actions[event.key].activate.includes(event.type)) {
      return { ...event, action: "activate" };
    }

    // Event type is listed in deactivate action for this key
    if (settings.actions[event.key].deactivate.includes(event.type)) {
      return { ...event, action: "deactivate" };
    }

    return { ...event, action: "" };
  }

  // Defaults -----------------------------------------------------------------

  const defaults: Configuration = {
    actions: {},
    offset: 10
  };

  // Props --------------------------------------------------------------------

  interface Props {
    key?: string;
    children?: Snippet<[key: string, data: object ]>;
  }

  let { key = "popup", children }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Bound elements -----------------------------------------------------------
  
  let popup: HTMLDivElement | undefined = $state();

  // Settings -----------------------------------------------------------------

  const config: Configuration = $derived(layout.config);
  const settings: Configuration = $derived(getSettings(defaults, config, key));
  const event: PopupEvent = $derived(processEvent(settings, layout.event));

  // Display ------------------------------------------------------------------
  
  function getVisibility(event: PopupEvent) {
    return (event.action === "activate") ? "visible" : "hidden";
  }

  function getTop(event: PopupEvent): string {
    let top = "auto";
    if (Object.hasOwn(event, "e") && 
        event.e !== null && 
        event.e instanceof MouseEvent) {
      const targetTop = window.scrollY + event.e.clientY + settings.offset;
      if (event.e.clientY <= window.innerHeight / 2) {
        top = `${targetTop}px`;
      }
    }
    return top;
  }

  function getBottom(event: PopupEvent): string {
    let bottom = "auto";
    if (Object.hasOwn(event, "e") && 
        event.e !== null && 
        event.e instanceof MouseEvent) {
      const doc = document.documentElement;
      const targetBottom = doc.clientHeight - (window.scrollY + event.e.clientY) + settings.offset;
      if (event.e.clientY > window.innerHeight / 2) {
        bottom = `${targetBottom}px`;
      }
    }
    return bottom;
  }

  function getLeft(event: PopupEvent): string {
    let left = "auto";
    if (Object.hasOwn(event, "e") && 
        event.e !== null && 
        event.e instanceof MouseEvent) {
      const targetLeft = window.scrollX + event.e.clientX + settings.offset;
      if (event.e.clientX <= window.innerWidth / 2) {
        left = `${targetLeft}px`;
      }
    }
    return left;
  }

  function getRight(event: PopupEvent): string {
    let right = "auto";
    if (Object.hasOwn(event, "e") && 
        event.e !== null && 
        event.e instanceof MouseEvent) {
      const doc = document.documentElement;
      const targetRight = doc.clientWidth - (window.scrollX + event.e.clientX) + settings.offset;
      if (event.e.clientX > window.innerWidth / 2) {
        right = `${targetRight}px`;
      }
    }
    return right;
  }

</script>

<div 
  class="sveltevis-popup" 
  style:visibility={getVisibility(event)}
  style:top={getTop(event)}
  style:bottom={getBottom(event)}
  style:left={getLeft(event)} 
  style:right={getRight(event)} 
  bind:this={popup} >
    {#if event.action === "activate"}
      {#if children}
        {@render children(event.key, event.data)}
      {/if}
    {/if}
</div>

<style>
  .sveltevis-popup {
    position: absolute;
  }
</style>
