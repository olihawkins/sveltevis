<svelte:options namespace="svg" />

<script lang="ts">
  
  // Imports ------------------------------------------------------------------

  import type { Configuration } from "../../configuration.ts";
  import type { Layout } from "../../layout.svelte.ts";
  import type { LayoutPlot } from "../../layout.svelte.ts";
  import type { Observation } from "../../data.ts";

  import { line, curveLinear } from "d3-shape";
  import { scaleLinear } from "d3-scale";
  import { getSettings } from "../../configuration.ts";
  import { getLayout } from "../../layout.svelte.ts";
  
  // Interfaces ---------------------------------------------------------------

  interface Point { x: number; y: number };

  // Functions ----------------------------------------------------------------
  
  function getPathProperty(
    series: Configuration, 
    settings: Configuration, 
    property: string
  ): string {
    
    if (Object.hasOwn(series, property)) {
      return series[property] 
    } else {
      return settings[property];
    }
  }

  function createPaths(
    data: Observation[], 
    settings: Configuration, 
    scaleX: CallableFunction, 
    scaleY: CallableFunction
  ): object {
    
    // Create an object to store line properties
    const paths: {[key: string]: Configuration} = {}

    // Extract names and mappings
    const mappings = settings.mappings;
    const xName = String(mappings.x.name);
    const yName = String(mappings.y.name);
    const groupName = String(mappings.group.name);

    // Determine properties for each line from mappings and settings
    mappings.group.series.forEach((s: Configuration) => {
      paths[s.name] = {
        curve: getPathProperty(s, settings, "curve"),
        stroke: getPathProperty(s, settings, "stroke"),
        strokeWidth: getPathProperty(s, settings, "strokeWidth"),
        strokeOpacity: getPathProperty(s, settings, "strokeOpacity"),
        strokeDashArray: getPathProperty(s, settings, "strokeDashArray"),
        strokeDashOffset: getPathProperty(s, settings, "strokeDashOffset"),
        strokeLineCap: getPathProperty(s, settings, "strokeLineCap"),
        strokeLineJoin: getPathProperty(s, settings, "strokeLineJoin"),
        strokeMiterLimit: getPathProperty(s, settings, "strokeMiterLimit"),
        data: [],
      };
    });

    // Compile data for each path: only add observations with valid data
    data.forEach(d => {
      
      if (Object.hasOwn(d, groupName) && 
          Object.hasOwn(d, xName) && 
          Object.hasOwn(d, yName)) {

        const series = String(d[groupName]);

        paths[series].data.push({
          x: d[xName],
          y: d[yName]
        });
      }
    });

    // Create path for each line
    for (const [, path] of Object.entries(paths)) {
      const pathGenerator = line<Point>()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y))
        .curve(path.curve);
      path.d = pathGenerator(path.data);
    };

    return paths;    
  }

  // Defaults -----------------------------------------------------------------

  const defaults: Configuration = {
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

  interface Props {
    key?: string;
    data: Observation[]
  }

  let { key = "lineGeometry", data }: Props = $props();

  // Layout -------------------------------------------------------------------

  const layout: Layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config: Configuration = $derived(layout.config);
  const settings: Configuration = $derived(getSettings(defaults, config, key));
  const mappings: Configuration = $derived(settings.mappings);

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

  // Properties ---------------------------------------------------------------

  const paths = $derived(createPaths(data, settings, scaleX, scaleY));

</script>

<g class="sveltevis-line-geometry">
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