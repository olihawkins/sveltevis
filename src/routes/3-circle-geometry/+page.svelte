<script>

  import "$lib/css/site.css";
  import "$lib/css/sveltevis.css";
  import SiteHeader from "$lib/site/SiteHeader.svelte";
  import SiteFooter from "$lib/site/SiteFooter.svelte";
  import ColorSchemeObserver from "$lib/ColorSchemeObserver.svelte";
  import Visualisation from "$lib/Visualisation.svelte";
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
    },
    next: {
      label: "Line Geometry",
      href: "/4-line-geometry"
    }
  };

  let isDarkMode = $state(false);
  let spec = $derived(isDarkMode ? darkSpec : lightSpec);

</script>

<div id="column">

  <SiteHeader />

  <h2>3. Circle Geometry</h2>
  
  <p>Geometries are components that map data to visual elements of a plot. They are placed inside a <code>Plot</code> component, which defines the drawing area for data and handles things like clipping. The <code>Plot</code> is located between the gridlines and the axes in the component order.</p>
  
  <div style="min-width: 300px">
    <ColorSchemeObserver bind:isDarkMode={isDarkMode} />
    <Visualisation spec={spec}>
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
    </Visualisation>
  </div>

  <p>This scatterplot is made using a <code>CircleGeometry</code> component, which allows variables to be mapped to multiple dimensions of the points' visual representation, including their x and y position, circle radius, fill colour, fill opacity, and stroke colour.</p>

  <SiteFooter {links} />

</div>