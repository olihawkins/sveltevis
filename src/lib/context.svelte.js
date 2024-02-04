// Imports --------------------------------------------------------------------

import { getContext, hasContext, setContext } from "svelte";

// Constants ------------------------------------------------------------------

const LAYOUT_CONTEXT = "layout";

// Choose config based on width -----------------------------------------------

function getNextConfig(configs, width) {
  for (let i = 0; i < configs.length; i++) {
    if (width > configs[i].visualisation.minwidth) {
      return configs[i];
    }
  }
  return configs[configs.length - 1];
}

// Create layout object -------------------------------------------------------

export function createLayout(configs) {

  // State
  let windowWidth = $state(0);
  let width = $state(0);

  // Derived values
  let config = $derived(getNextConfig(configs, windowWidth));

  let graphic = $derived({ 
    width: width, 
    height: config.visualisation.graphic.height,
    margin: config.visualisation.graphic.margin
  });

  let plot = $derived({ 
    width: graphic.width - graphic.margin.left - graphic.margin.right, 
    height: graphic.height - graphic.margin.top - graphic.margin.bottom
  });

  // Public interface
  const layout = {
    get config() {
      return config;
    },
    get graphic() {
      return graphic;
    },
    get plot() {
      return plot;
    },
    get width() {
      return width;
    },
    set width(w) {
      width = w;
    },
    get windowWidth() {
      return windowWidth;
    },
    set windowWidth(w) {
      windowWidth = w;
    }
  };

  // Store and return
  setContext(LAYOUT_CONTEXT, layout);
  return layout;
}

// Get layout object --------------------------------------------------------------------

export function getLayout() {
  return getContext(LAYOUT_CONTEXT);
}
