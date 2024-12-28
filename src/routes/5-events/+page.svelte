<script lang="ts">

  import "$lib/css/site.css";
  import "$lib/css/sveltevis.css";
  import SiteHeader from "$lib/site/SiteHeader.svelte";
  import SiteFooter from "$lib/site/SiteFooter.svelte";
  import ColorSchemeObserver from "$lib/ColorSchemeObserver.svelte";
  import Visualisation from "$lib/Visualisation.svelte";
  import Popup from "$lib/Popup.svelte";
  import Graphic from "$lib/Graphic.svelte";
  import Svg from "$lib/svg/Svg.svelte";
  import Gridlines from "$lib/svg/Gridlines.svelte";
  import AxisX from "$lib/svg/AxisX.svelte";
  import AxisY from "$lib/svg/AxisY.svelte";
  import Plot from "$lib/svg/Plot.svelte";
  import CircleGeometry from "$lib/svg/geometries/CircleGeometry.svelte";
  import { lightSpec, darkSpec } from "./spec.ts";
  import data from "./uk-election-2019-yh.json" assert { type: "json" };

  const links = {
    previous: {
      label: "Line Geometry",
      href: "/4-line-geometry"
    }
  };

  let isDarkMode = $state(false);
  let spec = $derived(isDarkMode ? darkSpec : lightSpec);

</script>

<div id="column">

  <SiteHeader />

  <h2>5. Events</h2>
  
  <p>Here is the scatterplot we looked at previously, only now it has a <code>Popup</code> component that responds to events.</p>
  
  <div style="min-width: 300px">
    <ColorSchemeObserver bind:isDarkMode={isDarkMode} />
    <Visualisation spec={spec}>
      <Popup>
        {#snippet children(key, data)}
          {#if key === "circleGeometry" && "constituency_name" in data}
            {data.constituency_name}
          {/if}
        {/snippet}
      </Popup>
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

  <SiteFooter {links} />

</div>