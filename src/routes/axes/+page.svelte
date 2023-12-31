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
      label: "Layout",
      href: "/layout"
    }
  };
  
</script>

<div id="column">
  
  <SiteHeader />
  <h2>2. Axes</h2>

  <p>The root component for a SvelteVis visualisation is called <code>Visualisation</code>. It is a general purpose container with a simple structure and a built-in system for handling responsiveness. The <code>Visualisation</code> component manages the size of the graphic and the plotting area for each visualisation, and makes this data available to its child components through a shared context.</p>
  
  <h3>2.1. Structure</h3>

  <p>A <code>Visualisation</code> is divided vertically into three regions: a <code>Header</code>, a <code>Graphic</code> and a <code>Footer</code>. The <code>Header</code> and <code>Footer</code> contain HTML, while the <code>Graphic</code> typically contains an SVG. The <code>Graphic</code> can have a special region called the <code>Plot</code>. This is the area within the graphic where data is visually represented. In a chart this would be the plotting area, bounded by the chart's axes.</p> 

  
  <div style="min-width: 300px">
    <Visualisation config={config}>
      <Header />
      <Graphic>
        <Svg>
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
      <Footer />
    </Visualisation>
  </div>

<p>A <code>Visualisation</code> is divided vertically into three regions: a <code>Header</code>, a <code>Graphic</code> and a <code>Footer</code>. The <code>Header</code> and <code>Footer</code> contain HTML, while the <code>Graphic</code> typically contains an SVG. The <code>Graphic</code> can have a special region called the <code>Plot</code>. This is the area within the graphic where data is visually represented. In a chart this would be the plotting area, bounded by the chart's axes.</p> 
 
<SiteFooter {links} />
</div>
