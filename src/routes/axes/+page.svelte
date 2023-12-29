<script>
  import "$lib/css/site.css";
  import "$lib/css/sveltevis.css";
  import Visualisation from "$lib/Visualisation.svelte";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import Graphic from "$lib/Graphic.svelte";
  import Svg from "$lib/svg/Svg.svelte";
  import AxisX from "$lib/svg/AxisX.svelte";
  import { config } from "./config.js";
  
</script>

<div id="column">
  
  <h1>SvelteVis</h1>
  <h2>Axes</h2>

  <div style="min-width: 300px">
    <Visualisation config={config}>
      <Header />
      <Graphic>
        <Svg>
          <AxisX />
        </Svg>
      </Graphic>
      <Footer />
    </Visualisation>
  </div>
    
</div>