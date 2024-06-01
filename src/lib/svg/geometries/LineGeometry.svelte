<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { line } from "d3-shape";
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
        stroke: getPathProperty(s, settings, "stroke"),
        strokeOpacity: getPathProperty(s, settings, "strokeOpacity"),
        strokeWidth: getPathProperty(s, settings, "strokeWidth"),
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
        .y(d => scaleY(d.y));
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
    stroke: "var(--sveltevis-color)",
    strokeOpacity: 1,
    strokeWidth: 1
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

{#each Object.entries(paths) as [name, path] (name)}
  <path 
    d={path.d} 
    stroke={path.stroke}
    fill="none"  />
{/each}

