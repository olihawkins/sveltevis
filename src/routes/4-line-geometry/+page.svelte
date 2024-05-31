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
      label: "Circle Geometry",
      href: "/3-circle-geometry"
    },
    next: {
      label: "Events",
      href: "/5-events"
    }
  };

  let isDarkMode = $state(false);
  let spec = $derived(isDarkMode ? darkSpec : lightSpec);

</script>

<div id="column">

  <SiteHeader />

  <h2>4. Line Geometry</h2>
  
  <p>This line chart is made using a <code>LineGeometry</code> component.</p>
  
  <div style="min-width: 300px">
    <ColorSchemeObserver bind:isDarkMode={isDarkMode} />
    <Visualisation spec={spec}>
      <Graphic>
        <Svg>
          <Gridlines />
          <Plot>

          </Plot>
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

  <SiteFooter {links} />

</div>