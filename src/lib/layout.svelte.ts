// Imports --------------------------------------------------------------------

import type { Configuration } from "./configuration.ts";

import { getContext, setContext } from "svelte";

// Constants ------------------------------------------------------------------

const LAYOUT_CONTEXT = "layout";

// Interfaces -----------------------------------------------------------------

export interface LayoutMargin {
  top: number,
  right: number,
  bottom: number,
  left: number
}

export interface LayoutGraphic {
  width: number,
  height: number,
  margin: LayoutMargin
}

export interface LayoutPlot {
  width: number,
  height: number
}

export interface LayoutEvent {
  e: Event | null,
  key: string,
  type: string,
  data: object
}

export interface Layout {
  readonly config: Configuration;
  readonly graphic: LayoutGraphic;
  readonly plot: LayoutPlot;
  configs: Configuration[];
  event: LayoutEvent;
  width: number;
  windowHeight: number;
  windowWidth: number;
}

// Choose config based on width -----------------------------------------------

function getNextConfig(
  configs: Configuration[], 
  width: number
): Configuration {
  
  for (let i = 0; i < configs.length; i++) {
    if (width > configs[i].visualisation.minwidth) {
      return configs[i];
    }
  }
  return configs[configs.length - 1];
}

// Create layout object -------------------------------------------------------

export function createLayout(c: Configuration[]): Layout {

  // State
  let configs: Configuration[] = $state(c);
  let windowWidth: number = $state(800);
  let windowHeight: number = $state(800);
  let width: number = $state(800);
  
  let event:LayoutEvent = $state({
    e: null,
    key: "layout", 
    type: "init",
    data: {}
  });

  // Derived values
  const config: Configuration = $derived(getNextConfig(configs, windowWidth));

  const graphic: LayoutGraphic = $derived({ 
    width: width, 
    height: config.visualisation.graphic.height,
    margin: config.visualisation.graphic.margin
  });

  const plot: LayoutPlot = $derived({ 
    width: graphic.width - graphic.margin.left - graphic.margin.right, 
    height: graphic.height - graphic.margin.top - graphic.margin.bottom
  });

  // Public interface
  const layout: Layout = {
    get config(): Configuration {
      return config;
    },
    get configs(): Configuration[] {
      return configs;
    },
    get event(): LayoutEvent {
      return event;
    },
    get graphic(): LayoutGraphic {
      return graphic;
    },
    get plot(): LayoutPlot {
      return plot;
    },
    get width(): number {
      return width;
    },
    get windowHeight(): number {
      return windowHeight;
    },
    get windowWidth(): number {
      return windowWidth;
    },
    set configs(c: Configuration[]) {
      configs = c;
    },
    set event(e: LayoutEvent) {
      event = e;
    },
    set width(w: number) {
      width = w;
    },
    set windowHeight(h: number) {
      windowHeight = h;
    },
    set windowWidth(w: number) {
      windowWidth = w;
    }
  };

  // Store and return
  setContext(LAYOUT_CONTEXT, layout);
  return layout;
}

// Get layout object --------------------------------------------------------------------

export function getLayout(): Layout {
  return getContext(LAYOUT_CONTEXT);
}
