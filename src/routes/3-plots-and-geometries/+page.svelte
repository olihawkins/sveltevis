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
  import { lightConfig, darkConfig } from "./config.js";
  import data from "./uk-election-2019-yh.json";

  const links = {
    previous: {
      label: "Gridlines and Axes",
      href: "/2-gridlines-and-axes"
    }
  };

  const mediaTarget = "(prefers-color-scheme: dark)";
  let isDarkMode = $state(false);
  
  onMount(() => {	
    
    // Set initial color scheme
    isDarkMode = window.matchMedia(mediaTarget).matches;

    // Listen for changes to color scheme
    window.matchMedia(mediaTarget).addEventListener("change", event => {
      isDarkMode = event.matches;
    });
  });

</script>

<div id="column">
  
  <SiteHeader />
  <h2>3. Plots and Geometries</h2>

  <p>Use geometries to plot data.</p>
  
  <div style="min-width: 300px">
  {#if isDarkMode}
    <Visualisation config={darkConfig}>
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
  {:else}
    <Visualisation config={lightConfig}>
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
  {/if}
  </div>

<SiteFooter {links} />
</div>