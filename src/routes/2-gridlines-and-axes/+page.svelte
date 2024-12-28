<script lang="ts">
  import "$lib/css/site.css";
  import "$lib/css/sveltevis.css";
  import SiteHeader from "$lib/site/SiteHeader.svelte";
  import SiteFooter from "$lib/site/SiteFooter.svelte";
  import Visualisation from "$lib/Visualisation.svelte";
  import Graphic from "$lib/Graphic.svelte";
  import Svg from "$lib/svg/Svg.svelte";
  import Gridlines from "$lib/svg/Gridlines.svelte";
  import AxisX from "$lib/svg/AxisX.svelte";
  import AxisY from "$lib/svg/AxisY.svelte";
  import { spec } from "./spec.js";

  const links = {
    previous: {
      label: "Layout",
      href: "/1-layout"
    },
    next: {
      label: "Plots and Geometries",
      href: "/3-circle-geometry"
    }
  };
  
</script>

<div id="column">
  
  <SiteHeader />
  
  <h2>2. Gridlines and Axes</h2>

  <p>You can add gridlines to a visualisation with the <code>Gridlines</code> component.</p>

  <div style="min-width: 300px">
    <Visualisation >
      <Graphic>
        <Svg>
          <Gridlines />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

  <p>You can add axes to a visualisation with the <code>AxisX</code> and <code>AxisY</code> components.  Axis components should be placed after any <code>Gridlines</code> components, because they sit above the gridlines in the vertical stacking order.</p> 

  <div class="codeblock">
  <pre>
  <code>
  &lt;Visualisation &gt;
    &lt;Graphic&gt;
      &lt;Svg&gt;
        &lt;Gridlines /&gt;
        &lt;AxisX /&gt;
        &lt;AxisY /&gt;
      &lt;/Svg&gt;
    &lt;/Graphic&gt;
  &lt;/Visualisation&gt;</code>
  </pre>
  </div>

  <p>All three of these components are SVG components that are located in the margins of the <code>Graphic</code>, so they are placed within the <code>Svg</code> but outside the <code>Plot</code>. As we will see in the next section, the <code>Plot</code> sits between the gridlines and axes: we want to draw the data elements of the plot over the gridlines, but we want them to clip beneath the axes.</p>

  <div style="min-width: 300px">
    <Visualisation >
      <Graphic>
        <Svg>
          <Gridlines />
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

  <p>You can pass any scaling function to axes components. The chart below uses the <code>scaleTime</code> and <code>scaleLog</code> functions from <a href="https://d3js.org/d3-scale">d3-scale</a>, but any scaling function that maps an input domain to an output range will work.</p>

  <div style="min-width: 300px">
    <Visualisation spec={spec}>
      <Graphic>
        <Svg>
          <Gridlines />
          <AxisX />
          <AxisY />
        </Svg>
      </Graphic>
    </Visualisation>
  </div>

<SiteFooter {links} />

</div>
