<script lang="ts">

  import "$lib/css/site.css";
  import "$lib/css/sveltevis.css";
  import SiteHeader from "$lib/site/SiteHeader.svelte";
  import SiteFooter from "$lib/site/SiteFooter.svelte";
  import Visualisation from "$lib/Visualisation.svelte";
  import Graphic from "$lib/Graphic.svelte";
  import Svg from "$lib/svg/Svg.svelte";
  import Gridlines from "$lib/svg/Gridlines.svelte";
  import AxisX from "$lib/svg/AxisX.svelte";
  import AxisY from "$lib/svg/AxisY.svelte";
  import Plot from "$lib/svg/Plot.svelte";
  import LineGeometry from "$lib/svg/geometries/LineGeometry.svelte";
  import { spec } from "./spec.ts";
  import data from "./visnet-training.json" assert { type: "json" };

  const links = {
    previous: {
      label: "Circle Geometry",
      href: "/3-circle-geometry"
    },
    next: {
      label: "Events",
      href: "/5-events"
    }
  };

</script>

<div id="column">

  <SiteHeader />

  <h2>4. Line Geometry</h2>
  
  <p>This line chart is made using a <code>LineGeometry</code> component.</p>
  
  <div style="min-width: 300px">
    <Visualisation spec={spec}>
      <Graphic>
        <Svg>
          <Gridlines />
          <Plot>
            <LineGeometry data={data} />
          </Plot>
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

  <SiteFooter {links} />

</div>