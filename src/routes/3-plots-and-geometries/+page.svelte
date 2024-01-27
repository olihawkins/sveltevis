<script>

  import "$lib/css/site.css";
  import "$lib/css/sveltevis.css";
  import SiteHeader from "$lib/site/SiteHeader.svelte";
  import SiteFooter from "$lib/site/SiteFooter.svelte";
  import ColorSchemeVisualisation from "$lib/ColorSchemeVisualisation.svelte";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import Graphic from "$lib/Graphic.svelte";
  import Svg from "$lib/svg/Svg.svelte";
  import Gridlines from "$lib/svg/Gridlines.svelte";
  import AxisX from "$lib/svg/AxisX.svelte";
  import AxisY from "$lib/svg/AxisY.svelte";
  import Plot from "$lib/svg/Plot.svelte";
  import CircleGeometry from "$lib/svg/geometries/CircleGeometry.svelte";
  import { lightSpec, darkSpec } from "./spec.js";
  import data from "./uk-election-2019-yh.json";

  const links = {
    previous: {
      label: "Gridlines and Axes",
      href: "/2-gridlines-and-axes"
    }
  };

</script>

<div id="column">

  <SiteHeader />

  <h2>3. Plots and Geometries</h2>
  
  <p>Use geometries to plot data.</p>
  
  <div style="min-width: 300px">
    <ColorSchemeVisualisation 
        lightSpec={lightSpec} 
        darkSpec={darkSpec}>
      <Graphic>
        <Svg>
          <Gridlines />
          <Plot>
            <CircleGeometry data={data} />
          </Plot>
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </ColorSchemeVisualisation>
  </div>

  <SiteFooter {links} />

</div>