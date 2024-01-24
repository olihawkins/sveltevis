<script>
  import { onMount } from "svelte";
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
  import Plot from "$lib/svg/Plot.svelte";
  import CircleGeometry from "$lib/svg/geometries/CircleGeometry.svelte";
  import { baseConfig } from "./config.js";
  import data from "./uk-election-2019-yh.json";

  const links = {
    previous: {
      label: "Gridlines and Axes",
      href: "/2-gridlines-and-axes"
    }
  };

  const mediaTarget = "(prefers-color-scheme: dark)";
  let config = $state(baseConfig);
  
  function updateConfig(isDarkMode) {
    
    const strokeRange = 
      isDarkMode === true ? 
      ["#8c03fc", "#d9a311"] : 
      ["#ffa600", "#8d34e0"];
    
      config
        .main
        .circleGeometry
        .mappings
        .stroke
        .range = strokeRange;
  }

  onMount(() => {	
    
    // Set initial color scheme
    let isDarkMode = window.matchMedia(mediaTarget).matches;
    updateConfig(isDarkMode);

    // Listen for changes to color scheme
    window.matchMedia(mediaTarget).addEventListener("change", event => {
      let isDarkMode = event.matches;
      updateConfig(isDarkMode);
    });
  });

</script>

<div id="column">
  
  <SiteHeader />
  <h2>3. Plots and Geometries</h2>

  <p>Use geometries to plot data.</p>
  
  <div style="min-width: 300px">
    <Visualisation config={{...config}}>
      <Graphic>
        <Svg>
          <Gridlines />
          <Plot>
            <CircleGeometry data={data}></CircleGeometry>
          </Plot>
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

<SiteFooter {links} />
</div>