<script>
  import "$lib/css/site.css";
  import "$lib/css/sveltevis.css";
  import SiteHeader from "$lib/site/SiteHeader.svelte";
  import SiteFooter from "$lib/site/SiteFooter.svelte";
  import Visualisation from "$lib/Visualisation.svelte";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import Graphic from "$lib/Graphic.svelte";
  import Svg from "$lib/svg/Svg.svelte";
  import Gridlines from "$lib/svg/Gridlines.svelte";
  import AxisX from "$lib/svg/AxisX.svelte";
  import AxisY from "$lib/svg/AxisY.svelte";
  import { spec } from "./spec.js";

  const links = {
    previous: {
      label: "Layout",
      href: "/1-layout"
    },
    next: {
      label: "Plots and Geometries",
      href: "/3-plots-and-geometries"
    }
  };
  
</script>

<div id="column">
  
  <SiteHeader />
  
  <h2>2. Gridlines and Axes</h2>

  <p>You can add axes to a visualisation with the <code>AxisX</code> and <code>AxisY</code> components. These are SVG components that are located in the margins of the <code>Graphic</code>, so they are placed within the <code>Svg</code> but outside the <code>Plot</code>.</p>

  <div style="min-width: 300px">
    <Visualisation >
      <Graphic>
        <Svg>
          <Gridlines />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

  <div style="min-width: 300px">
    <Visualisation >
      <Graphic>
        <Svg>
          <Gridlines />
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

  <div style="min-width: 300px">
    <Visualisation spec={spec}>
      <Graphic>
        <Svg>
          <Gridlines />
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

<SiteFooter {links} />

</div>
