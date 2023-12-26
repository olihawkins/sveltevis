<script>
  import "$lib/css/site.css";
  import "$lib/css/sveltevis.css";
  import Visualisation from "$lib/Visualisation.svelte";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import Graphic from "$lib/Graphic.svelte";
  import Svg from "$lib/Svg/Svg.svelte";
  import LayoutReport from "$lib/Svg/LayoutReport.svelte";
  import { config } from "./config.js";
  
</script>

<div id="column">
  
  <h1>SvelteVis</h1>
  <h2>Layout</h2>
  
  <p>The root component for a SvelteVis visualisation is called <code>Visualisation</code>. It is a general purpose container with a simple structure and a built-in system for handling responsiveness. The <code>Visualisation</code> component manages the size of the graphic and the plotting area for each visualisation, and makes this data available to its child components through a shared context.</p>
  
  <div style="min-width: 300px">
    <Visualisation config={config}>
      <Header />
      <Graphic>
        <Svg>
          <LayoutReport />
        </Svg>
      </Graphic>
      <Footer />
    </Visualisation>
  </div>
 
  <p>A <code>Visualisation</code> is divided vertically into three regions: a <code>Header</code>, a <code>Graphic</code> and a <code>Footer</code>. The <code>Header</code> and <code>Footer</code> contain HTML, while the <code>Graphic</code> typically contains an SVG. The <code>Graphic</code> can have a special region called the <code>Plot</code>. This is the area within the graphic where data is visually represented. In a chart this would be the plotting area, bounded by the chart's axes.</p> 
    
  <p>In this example, a child component of the <code>Visualisation</code> called a <code>LayoutReporter</code> reads the layout data from the shared context and prints it inside the <code>Plot</code> area. Try resizing the browser to see how the data automatically updates, and how the appearance of the chart adapts based on this state. In pracice you won't need a <code>LayoutReporter</code>: it's just a component that's used to visualise the layout, and to test that child components can access their visualisation's global state and respond to the available space.</p>

</div>



