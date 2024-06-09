<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { 
    scaleLinear,
    scaleOrdinal,
    scaleSqrt } from "d3-scale";
  import { getLayout } from "../../layout.svelte.js";
  import { getSettings } from "../../settings.js";
  import { noop } from "../../events.js";

  // Constants ----------------------------------------------------------------

  const EVENT_KEY_ACTIVATED = "activated" 
  const EVENT_KEY_DEACTIVATED = "deactivated"

  // Generic functions --------------------------------------------------------

  function getValue(
      point, 
      scale, 
      settings, 
      dimension, 
      fallback) {
    
    const name = settings.mappings[dimension].name;

    if (name !== null) {
      return scale(point[name]);
    } else {
      return fallback;
    }
  }

  function getActiveValue(
      point, 
      activePoint,
      scale, 
      settings, 
      dimension, 
      fallback) {

    if (settings.active.enabled === true) {
      if (point[id] === activePoint[id]) {
        return settings.active[dimension];
      }
    }

    const name = settings.mappings[dimension].name;

    if (name !== null) {
      return scale(point[name]);
    } else {
      return fallback;
    }
  }

  // Attribute functions ------------------------------------------------------

  function getX(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "x", 
      0);
  }

  function getY(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "y", 
      0);
  }

  function getRadius(point, scale, settings) {
    return getValue(
      point, 
      scale, 
      settings,
      "radius", 
      settings.circle.radius);
  }

  function getFill(point, activePoint, scale, settings) {
    return getActiveValue(
      point, 
      activePoint,
      scale, 
      settings,
      "fill", 
      settings.circle.fill);
  }

  function getFillOpacity(point, activePoint, scale, settings) {
    return getActiveValue(
      point, 
      activePoint,
      scale, 
      settings,
      "fillOpacity", 
      settings.circle.fillOpacity);
  }

  function getStroke(point, activePoint, scale, settings) {
    return getActiveValue(
      point, 
      activePoint,
      scale, 
      settings,
      "stroke", 
      settings.circle.stroke);
  }

  function getStrokeOpacity(point, activePoint, scale, settings) {
    return getActiveValue(
      point, 
      activePoint,
      scale, 
      settings,
      "strokeOpacity", 
      settings.circle.strokeOpacity);
  }  

  function getStrokeWidth(point, activePoint, scale, settings) {
    return getActiveValue(
      point, 
      activePoint,
      scale, 
      settings,
      "strokeWidth", 
      settings.circle.strokeWidth);
  }

  // Defaults -----------------------------------------------------------------

  const defaults = {
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
    id: "id",
    events: {
      broadcast: false,
      propagate: false,
      raiseTarget: false
    }
  };

  // Props --------------------------------------------------------------------

  let { key = "circleGeometry", data } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
  const mappings = $derived(settings.mappings);
  const id = $derived(settings.id);

  // State --------------------------------------------------------------------

  let activePoint = $state({});

  // Scales -------------------------------------------------------------------

  const plot = $derived(layout.plot);
  
  const scaleX = $derived(mappings.x.scale(
    mappings.x.domain, 
    [0, plot.width]));

  const scaleY = $derived(mappings.y.scale(
    mappings.y.domain, 
    [plot.height, 0]));

  const scaleRadius = $derived(mappings.radius.scale(
    mappings.radius.domain, 
    [0, settings.circle.radius]));

  const scaleFill = $derived(mappings.fill.scale(
    mappings.fill.domain, 
    mappings.fill.range));

  const scaleFillOpacity = $derived(mappings.fillOpacity.scale(
    mappings.fillOpacity.domain, 
    [0, settings.circle.fillOpacity]));

  const scaleStroke = $derived(mappings.stroke.scale(
    mappings.stroke.domain, 
    mappings.stroke.range));

  const scaleStrokeOpacity = $derived(mappings.strokeOpacity.scale(
    mappings.strokeOpacity.domain, 
    [0, settings.circle.strokeOpacity]));

  const scaleStrokeWidth = $derived(mappings.strokeWidth.scale(
    mappings.strokeWidth.domain, 
    [0, settings.circle.strokeWidth]));

  // Handlers -----------------------------------------------------------------

  function getPointHandler(
      type, 
      key, 
      settings, 
      layout, 
      point) {
    
    if (settings.events.broadcast === true) {
      return (e) => {
        
        // Stop propagation
        if (settings.events.propagate === false) {
          e.stopPropagation();
        }
        
        // Set the selected point to the current point
        activePoint = point;

        // Bring point to front
        if (settings.events.raiseTarget === true) {
          data = data.filter(d => d.id !== point.id);
          data.push(point);
        }
        
        // Broadcast the event
        layout.event = { 
          e: e, 
          key: key, 
          type: type,
          data: point 
        };
      };
    } else {
      return noop;
    }
  }

  function getActivatedHandler(key, settings, layout, point) {
    return getPointHandler(
      EVENT_KEY_ACTIVATED, 
      key, 
      settings, 
      layout, 
      point);
  }

  function getDeactivatedHandler(key, settings, layout) {
    return getPointHandler(
      EVENT_KEY_DEACTIVATED, 
      key, 
      settings, 
      layout, {[id]: ""});
  }

</script>

<g class="sveltevis-circle-geometry">
  {#each data as point (point[id])}
    <circle 
      class="sveltevis-circle-geometry-circle"
      cx={getX(point, scaleX, settings)} 
      cy={getY(point, scaleY, settings)} 
      r={getRadius(point, scaleRadius, settings)}
      role="img"
      aria-roledescription="data point"
      aria-label={point[mappings.ariaLabel.name]}
      onmousemove={getActivatedHandler(key, settings, layout, point)}
      onmouseover={getActivatedHandler(key, settings, layout, point)}
      onmouseout={getDeactivatedHandler(key, settings, layout)}
      style:fill={getFill(point, activePoint, scaleFill, settings)}
      style:fill-opacity={getFillOpacity(point, activePoint, scaleFillOpacity, settings)}
      style:stroke={getStroke(point, activePoint, scaleStroke, settings)}
      style:stroke-opacity={getStrokeOpacity(point, activePoint, scaleStrokeOpacity, settings)}
      style:stroke-width={getStrokeWidth(point, activePoint, scaleStrokeWidth, settings)}>
    </circle>
  {/each}
</g>