// Imports ------------------------------------------------------------------------------

import { getContext, hasContext, setContext } from "svelte";

// Constants ----------------------------------------------------------------------------

const LAYOUT_CONTEXT = "layout";

// Choose config based on graphicWidth --------------------------------------------------

function getNextConfig(configs, graphicWidth) {
  for (let i = 0; i < configs.length; i++) {
    if (graphicWidth >= configs[i].vis.minwidth) {
      return configs[i];
    }
  }
  return configs[configs.length - 1];
}

// Create layout object -----------------------------------------------------------------

export function createLayout(configs) {

  // State
  let graphicWidth = $state(configs[0].vis.minwidth);

  // Derived values
  let config = $derived(getNextConfig(configs, graphicWidth));
  let graphicHeight = $derived(config.vis.graphic.height);
  let graphicMargin = $derived(config.vis.graphic.margin);
  let plotWidth = $derived(graphicWidth - graphicMargin.left - graphicMargin.right);
  let plotHeight = $derived(graphicHeight - graphicMargin.top - graphicMargin.bottom);

  // Public interface
  const layout = {
    get config() {
      return config;
    },
    get graphicWidth() {
      return graphicWidth;
    },
    set graphicWidth(w) {
      graphicWidth = w;
    },
    get graphicHeight() {
      return graphicHeight;
    },
    get graphicMargin() {
      return graphicMargin;
    },
    get plotWidth() {
      return plotWidth;
    },
    get plotHeight() {
      return plotHeight;
    }
  }

  // Store and return
  setContext(LAYOUT_CONTEXT, layout);
  return layout;
}

// Get layout object --------------------------------------------------------------------

export function getLayout() {
  if (hasContext(LAYOUT_CONTEXT)) {
    return getContext(LAYOUT_CONTEXT);
  }
}
