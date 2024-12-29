<svelte:options namespace="svg" />

<script lang="ts">
  
  // Imports ------------------------------------------------------------------

  import type { MouseEventHandler } from "svelte/elements";
  import type { Configuration } from "../../configuration.ts";
  import type { Layout } from "../../layout.svelte.ts";
  import type { LayoutPlot } from "../../layout.svelte.ts";
  import type { LayoutEvent } from "../../layout.svelte.ts";
  import type { Observation } from "../../data.ts";

  import { scaleLinear, scaleOrdinal, scaleSqrt } from "d3-scale";
  import { getSettings } from "../../configuration.ts";
  import { getLayout } from "../../layout.svelte.ts";
  import { noop } from "../../events.ts";
  
  // Constants ----------------------------------------------------------------

  const EVENT_KEY_ACTIVATED = "activated" 
  const EVENT_KEY_DEACTIVATED = "deactivated"

  // Generic functions --------------------------------------------------------

  function getValue(
    point: Observation, 
    scale: CallableFunction, 
    settings: Configuration, 
    dimension: string, 
    fallback: number | string
  ): string {
    
    const name: string | null = settings.mappings[dimension].name;
    return (name !== null) ? String(scale(point[name])) : String(fallback);
  }

  function getActiveValue(
      point: Observation, 
      activePoint: Observation,
      dataKey: string,
      scale: CallableFunction, 
      settings: Configuration, 
      dimension: string, 
      fallback: number | string
    ): string {

    if (settings.active.enabled === true) {
      if (point[dataKey] === activePoint[dataKey]) {
        return settings.active[dimension];
      }
    }

    const name = settings.mappings[dimension].name;
    return (name !== null) ? String(scale(point[name])) : String(fallback);
  }

  // Attribute functions ------------------------------------------------------

  function getX(
    point: Observation, 
    scale: CallableFunction, 
    settings: Configuration
  ): string {
    
    return getValue(
      point, 
      scale, 
      settings,
      "x", 
      0);
  }

  function getY(
    point: Observation, 
    scale: CallableFunction, 
    settings: Configuration
  ): string {

    return getValue(
      point, 
      scale, 
      settings,
      "y", 
      0);
  }

  function getRadius(
    point: Observation, 
    scale: CallableFunction, 
    settings: Configuration
  ): string {
    
    return getValue(
      point, 
      scale, 
      settings,
      "radius", 
      settings.circle.radius);
  }

  function getFill(
    point: Observation, 
    activePoint: Observation, 
    dataKey: string,
    scale: CallableFunction, 
    settings: Configuration
  ): string {

    return getActiveValue(
      point, 
      activePoint,
      dataKey,
      scale, 
      settings,
      "fill", 
      settings.circle.fill);
  }

  function getFillOpacity(
    point: Observation, 
    activePoint: Observation, 
    dataKey: string,
    scale: CallableFunction, 
    settings: Configuration
  ): string {

    return getActiveValue(
      point, 
      activePoint,
      dataKey,
      scale, 
      settings,
      "fillOpacity", 
      settings.circle.fillOpacity);
  }

  function getStroke(
    point: Observation, 
    activePoint: Observation, 
    dataKey: string,
    scale: CallableFunction, 
    settings: Configuration
  ): string {

    return getActiveValue(
      point, 
      activePoint,
      dataKey,
      scale, 
      settings,
      "stroke", 
      settings.circle.stroke);
  }

  function getStrokeOpacity(
    point: Observation, 
    activePoint: Observation, 
    dataKey: string,
    scale: CallableFunction, 
    settings: Configuration
  ): string {

    return getActiveValue(
      point, 
      activePoint,
      dataKey,
      scale, 
      settings,
      "strokeOpacity", 
      settings.circle.strokeOpacity);
  }  

  function getStrokeWidth(
    point: Observation, 
    activePoint: Observation, 
    dataKey: string,
    scale: CallableFunction, 
    settings: Configuration
  ): string {

    return getActiveValue(
      point, 
      activePoint,
      dataKey,
      scale, 
      settings,
      "strokeWidth", 
      settings.circle.strokeWidth);
  }

  function getAriaLabel(point: Observation): string {
    const ariaKey: string | null = settings.mappings["ariaLabel"].name;
    return (ariaKey !== null) ? String(point[ariaKey]) : "";
  }

  // Defaults -----------------------------------------------------------------

  const defaults: Configuration = {
    dataKey: "id",
    mappings: {
      x: {
        name: null,
        scale: scaleLinear,
        domain: [-4, 4]
      },
      y: {
        name: null,
        scale: scaleLinear,
        domain: [-4, 4],
      },
      radius: {
        name: null,
        scale: scaleSqrt,
        domain: [0, 4],
      },
      fill: {
        name: null,
        scale: scaleOrdinal,
        domain: [],
        range: []
      },
      fillOpacity: {
        name: null,
        scale: scaleLinear,
        domain: [],
      },
      stroke: {
        name: null,
        scale: scaleOrdinal,
        domain: [],
        range: []
      },
      strokeOpacity: {
        name: null,
        scale: scaleLinear,
        domain: [],
      },
      strokeWidth: {
        name: null,
        scale: scaleLinear,
        domain: [],
      },
      ariaLabel: {
        name: null,
      }
    },
    circle: {
      radius: 8,
      fill: "var(--sveltevis-color)",
      fillOpacity: 1,
      stroke: "var(--sveltevis-color)",
      strokeOpacity: 1,
      strokeWidth: 1
    },
    active: {
      enabled: false,
      fill: "var(--sveltevis-active-fill)",
      fillOpacity: 1,
      stroke: "var(--sveltevis-active-stroke)",
      strokeOpacity: 1,
      strokeWidth: 1
    },
    events: {
      broadcast: false,
      propagate: false,
      raiseTarget: false
    }
  };

  // Props --------------------------------------------------------------------

  interface Props {
    key?: string;
    data: Observation[]
  }
  
  let { key = "circleGeometry", data }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config: Configuration = $derived(layout.config);
  const settings: Configuration = $derived(getSettings(defaults, config, key));
  const mappings: Configuration = $derived(settings.mappings);
  const dataKey: string = $derived(settings.dataKey);

  // State --------------------------------------------------------------------

  let activePoint: Observation = $state({});

  // Scales -------------------------------------------------------------------

  const plot: LayoutPlot = $derived(layout.plot);
  
  const scaleX: CallableFunction = $derived(
    mappings.x.scale(
      mappings.x.domain, 
      [0, plot.width]));

  const scaleY: CallableFunction = $derived(
    mappings.y.scale(
      mappings.y.domain, 
      [plot.height, 0]));

  const scaleRadius: CallableFunction = $derived(
    mappings.radius.scale(
      mappings.radius.domain, 
      [0, settings.circle.radius]));

  const scaleFill: CallableFunction = $derived(
    mappings.fill.scale(
      mappings.fill.domain, 
      mappings.fill.range));

  const scaleFillOpacity: CallableFunction = $derived(
    mappings.fillOpacity.scale(
      mappings.fillOpacity.domain, 
      [0, settings.circle.fillOpacity]));

  const scaleStroke: CallableFunction = $derived(
    mappings.stroke.scale(
      mappings.stroke.domain, 
      mappings.stroke.range));

  const scaleStrokeOpacity: CallableFunction = $derived(
    mappings.strokeOpacity.scale(
      mappings.strokeOpacity.domain, 
      [0, settings.circle.strokeOpacity]));

  const scaleStrokeWidth: CallableFunction = $derived(
    mappings.strokeWidth.scale(
      mappings.strokeWidth.domain, 
      [0, settings.circle.strokeWidth]));

  // Handlers -----------------------------------------------------------------

  function getPointHandler(
    type: string, 
    key: string, 
    settings: Configuration, 
    layout: Layout, 
    point: Observation,
    dataKey: string
  ): MouseEventHandler<SVGCircleElement> {
    
    if (settings.events.broadcast === true) {
      return (e: Event): void => {

        // Stop propagation
        if (settings.events.propagate === false) {
          e.stopPropagation();
        }

        // Bring point to front
        if (settings.events.raiseTarget === true) {
          data = data.filter(d => d[dataKey] !== point[dataKey]);
          data.push(point);
        }
        
        // Set the selected point to the current point
        activePoint = point;
        
        // Create an event
        const pointerEvent: LayoutEvent = { 
          e: e, 
          key: key, 
          type: type,
          data: point 
        };

        // Broadcast the event
        layout.event = pointerEvent;
      };

    } else {
      return noop;
    }
  }

  function getActivatedHandler(
    key: string, 
    settings: Configuration, 
    layout: Layout, 
    point: Observation,
    dataKey: string
  ): MouseEventHandler<SVGCircleElement> {

    return getPointHandler(
      EVENT_KEY_ACTIVATED, 
      key, 
      settings, 
      layout, 
      point,
      dataKey);
  }

  function getDeactivatedHandler(
    key: string, 
    settings: Configuration, 
    layout: Layout, 
    dataKey: string
  ): MouseEventHandler<SVGCircleElement> {

    return getPointHandler(
      EVENT_KEY_DEACTIVATED, 
      key, 
      settings, 
      layout, 
      { [dataKey]: "" },
      dataKey);
  }

</script>

<g class="sveltevis-circle-geometry">
  {#each data as point: Observation (point[dataKey])}
    <!--svelte-ignore a11y_mouse_events_have_key_events-->
    <circle 
      class="sveltevis-circle-geometry-circle"
      cx={getX(point, scaleX, settings)} 
      cy={getY(point, scaleY, settings)} 
      r={getRadius(point, scaleRadius, settings)}
      role="img"
      aria-roledescription="data point"
      aria-label={getAriaLabel(point)}
      onmousemove={getActivatedHandler(key, settings, layout, point, dataKey)}
      onmouseover={getActivatedHandler(key, settings, layout, point, dataKey)}
      onmouseout={getDeactivatedHandler(key, settings, layout, dataKey)}
      style:fill={getFill(point, activePoint, dataKey, scaleFill, settings)}
      style:fill-opacity={getFillOpacity(point, activePoint, dataKey, scaleFillOpacity, settings)}
      style:stroke={getStroke(point, activePoint, dataKey, scaleStroke, settings)}
      style:stroke-opacity={getStrokeOpacity(point, activePoint, dataKey, scaleStrokeOpacity, settings)}
      style:stroke-width={getStrokeWidth(point, activePoint, dataKey, scaleStrokeWidth, settings)}>
    </circle>
  {/each}
</g>