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
  import AxisX from "$lib/svg/AxisX.svelte";
  import AxisY from "$lib/svg/AxisY.svelte";
  import { config } from "./config.js";

  const links = {
    previous: {
      label: "Axes",
      href: "/axes"
    }
  };
  
</script>

<div id="column">
  
  <SiteHeader />
  <h2>3. Geometries</h2>

  <p>Use geometries to plot data.</p>
  
  <div style="min-width: 300px">
    <Visualisation config={config}>
      <Graphic>
        <Svg>
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

<SiteFooter {links} />
</div>