<script>

  import "$lib/css/site.css";
  import "$lib/css/sveltevis.css";
  import SiteHeader from "$lib/site/SiteHeader.svelte";
  import SiteFooter from "$lib/site/SiteFooter.svelte";
  import ColorSchemeObserver from "$lib/ColorSchemeObserver.svelte";
  import Visualisation from "$lib/Visualisation.svelte";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import Graphic from "$lib/Graphic.svelte";
  import Svg from "$lib/svg/Svg.svelte";
  import Gridlines from "$lib/svg/Gridlines.svelte";
  import AxisX from "$lib/svg/AxisX.svelte";
  import AxisY from "$lib/svg/AxisY.svelte";
  import Plot from "$lib/svg/Plot.svelte";
  import CircleGeometry from "$lib/svg/geometries/CircleGeometry.svelte";
  import { spec } from "./spec.js";
  import data from "./uk-election-2019-yh.json";

  const links = {
    previous: {
      label: "Gridlines and Axes",
      href: "/2-gridlines-and-axes"
    },
    next: {
      label: "Updating a Visualisation",
      href: "/4-updating-a-visualisation"
    }
  };

  let isDarkMode = $state(false);
  let circleGeometryKey = $derived(
    isDarkMode ? 
    "circleGeometryDark" : 
    "circleGeometryLight");

</script>

<div id="column">

  <SiteHeader />

  <h2>3. Plots and Geometries</h2>
  
  <p>Geometries are components that map data to visual elements of a plot. They are placed inside a <code>Plot</code> component, which defines the drawing area for data and handles things like clipping. The <code>Plot</code> is located between the gridlines and the axes in the component order.</p>
  
  <div style="min-width: 300px">
    <ColorSchemeObserver bind:isDarkMode={isDarkMode} />
    <Visualisation spec={spec}>
      <Graphic>
        <Svg>
          <Gridlines />
          <Plot>
            <CircleGeometry key={circleGeometryKey} data={data} />
          </Plot>
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

  <p>This visualisation maps data to multiple dimensions of visual representation, including x and y position, circle radius, fill colour, fill opacity, and stroke colour.</p>

  <SiteFooter {links} />

</div>