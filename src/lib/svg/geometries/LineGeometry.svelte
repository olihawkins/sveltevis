<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { line, curveLinear } from "d3-shape";
  import { scaleLinear } from "d3-scale";
  import { getLayout } from "../../layout.svelte.js";
  import { getSettings } from "../../settings.js";

  // Functions ----------------------------------------------------------------
  
  function getPathProperty(series, settings, property) {
    if (Object.hasOwn(series, property)) {
      return series[property] 
    } else {
      return settings[property];
    }
  }

  function createPaths(data, settings, scaleX, scaleY) {

    // Extract names and mappings
    const mappings = settings.mappings;
    const xName = mappings.x.name;
    const yName = mappings.y.name;
    const groupName = mappings.group.name;
    
    // Create an object to store line properties
    const paths = {}

    // Determine properties for each line from mappings and settings
    mappings.group.series.forEach(s => {
      paths[s.name] = {
        curve: getPathProperty(s, settings, "curve"),
        stroke: getPathProperty(s, settings, "stroke"),
        strokeWidth: getPathProperty(s, settings, "strokeWidth"),
        strokeOpacity: getPathProperty(s, settings, "strokeOpacity"),
        strokeOpacity: getPathProperty(s, settings, "strokeOpacity"),
        strokeDashArray: getPathProperty(s, settings, "strokeDashArray"),
        strokeDashOffset: getPathProperty(s, settings, "strokeDashOffset"),
        strokeLineCap: getPathProperty(s, settings, "strokeLineCap"),
        strokeLineJoin: getPathProperty(s, settings, "strokeLineJoin"),
        strokeMiterLimit: getPathProperty(s, settings, "strokeMiterLimit"),
        data: [],
      };
    });

    // Compile data for each line
    data.forEach(d => {
      paths[d[groupName]].data.push({
        x: d[xName],
        y: d[yName]
      });
    });

    // Create path for each line
    for (const [name, path] of Object.entries(paths)) {
      const pathGenerator = line()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y))
        .curve(path.curve);
      path.d = pathGenerator(path.data);
    };

    return paths;    
  }

  // Defaults -----------------------------------------------------------------

  const defaults = {
    mappings: {
      x: {
        name: null,
        scale: scaleLinear,
        domain: [0, 10]
      },
      y: {
        name: null,
        scale: scaleLinear,
        domain: [0, 10],
      },
      group: {
        name: null,
        series: []
      }
    },
    curve: curveLinear,
    stroke: "var(--sveltevis-color)",
    strokeWidth: 1,
    strokeOpacity: 1,
    strokeDashArray: "none",
    strokeDashOffset: 0,
    strokeLineCap: "butt",
    strokeLineJoin: "miter",
    strokeMiterLimit: 4
  }

  // Props --------------------------------------------------------------------

  let { key = "lineGeometry", data } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));
  const mappings = $derived(settings.mappings);

  // Scales -------------------------------------------------------------------

  const plot = $derived(layout.plot);
  
  const scaleX = $derived(mappings.x.scale(
    mappings.x.domain, 
    [0, plot.width]));

  const scaleY = $derived(mappings.y.scale(
    mappings.y.domain, 
    [plot.height, 0]));

  // Properties ---------------------------------------------------------------

  const paths = $derived(createPaths(data, settings, scaleX, scaleY));

</script>

<g class="sveltevis-circle-geometry">
  {#each Object.entries(paths) as [name, path] (name)}
    <path 
      d={path.d} 
      style:stroke={path.stroke}
      style:stroke-width={path.strokeWidth}
      style:stroke-opacity={path.strokeOpacity}
      style:stroke-dasharray={path.strokeDashArray}
      style:stroke-dashoffset={path.strokeDashOffset}
      style:stroke-linecap={path.strokeLineCap}
      style:stroke-linejoin={path.strokeLineJoin}
      style:stroke-miterlimit={path.strokeMiterLimit}
      fill="none" />
  {/each}
</g>