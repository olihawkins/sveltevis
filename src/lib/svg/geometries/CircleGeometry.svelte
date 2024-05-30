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

  function getHighlightValue(
      point, 
      selectedPoint,
      scale, 
      settings, 
      dimension, 
      fallback) {

    if (settings.highlight.enabled === true) {
      if (point.id === selectedPoint.id) {
        return settings.highlight[dimension];
      }
    }

    const name = settings.mappings[dimension].name;

    if (name !== null) {
      return scale(point[name]);
    } else {
      return fallback;
    }
  }

  // Functions ----------------------------------------------------------------

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

  function getFill(point, selectedPoint, scale, settings) {
    return getHighlightValue(
      point, 
      selectedPoint,
      scale, 
      settings,
      "fill", 
      settings.circle.fill);
  }

  function getFillOpacity(point, selectedPoint, scale, settings) {
    return getHighlightValue(
      point, 
      selectedPoint,
      scale, 
      settings,
      "fillOpacity", 
      settings.circle.fillOpacity);
  }

  function getStroke(point, selectedPoint, scale, settings) {
    return getHighlightValue(
      point, 
      selectedPoint,
      scale, 
      settings,
      "stroke", 
      settings.circle.stroke);
  }

  function getStrokeOpacity(point, selectedPoint, scale, settings) {
    return getHighlightValue(
      point, 
      selectedPoint,
      scale, 
      settings,
      "strokeOpacity", 
      settings.circle.strokeOpacity);
  }  

  function getStrokeWidth(point, selectedPoint, scale, settings) {
    return getHighlightValue(
      point, 
      selectedPoint,
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
    highlight: {
      enabled: true,
      fill: "var(--sveltevis-color)",
      fillOpacity: 1,
      stroke: "var(--sveltevis-highlight-color)",
      strokeOpacity: 1,
      strokeWidth: 1
    },
    sendEvents: false
  };

  // Props --------------------------------------------------------------------

  let { key = "circleGeometry", data } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
  const mappings = $derived(settings.mappings);

  // State --------------------------------------------------------------------

  let selectedPoint = $state({id: ""});

  // Properties ---------------------------------------------------------------

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

// Events ---------------------------------------------------------------------

function getActivateHandler(key, settings, layout, point) {
  if (settings.sendEvents === true) {
    return (e) => {
      e.stopPropagation();
      selectedPoint = point;
      layout.event = {
        e: e, 
        key: key, 
        msg: point
      };
    };
  } else {
    noop;
  }
}

// Standard handler for deactivation
function getDeactivateHandler(source, settings, layout) {
  if (settings.sendEvents === true) {
    return (e) => {
      e.stopPropagation();
      selectedPoint = {id: ""};
      layout.event = {
        e: e, 
        key: key, 
        msg: null
      };
    };
  } else {
    noop;
  }
}

</script>

<g class="sveltevis-circle-geometry">
  {#each data as point (point.id)}
    <circle 
      class="sveltevis-circle-geometry-circle"
      cx={getX(point, scaleX, settings)} 
      cy={getY(point, scaleY, settings)} 
      r={getRadius(point, scaleRadius, settings)}
      role="img"
      aria-roledescription="data point"
      aria-label={point[mappings.ariaLabel.name]}
      onclick={getActivateHandler(key, settings, layout, point)}
      onmouseover={getActivateHandler(key, settings, layout, point)}
      onmouseout={getDeactivateHandler(key, settings, layout, point)}
      style:fill={getFill(point, selectedPoint, scaleFill, settings)}
      style:fill-opacity={getFillOpacity(point, selectedPoint, scaleFillOpacity, settings)}
      style:stroke={getStroke(point, selectedPoint, scaleStroke, settings)}
      style:stroke-opacity={getStrokeOpacity(point, selectedPoint, scaleStrokeOpacity, settings)}
      style:stroke-width={getStrokeWidth(point, selectedPoint, scaleStrokeWidth, settings)}>
    </circle>
  {/each}
</g>