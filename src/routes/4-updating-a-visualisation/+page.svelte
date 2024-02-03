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
      label: "Plots and Geometries",
      href: "/3-plots-and-geometries"
    }
  };

  let specIndex = $state(0);
  const specs = [lightSpec, darkSpec];
  function updateSpec() {
    specIndex = specIndex == 0 ? 1 : 0;
  }

</script>

<div id="column">

  <SiteHeader />

  <h2>4. Updating a Visualisation</h2>

  <p>Sometimes, you may want to make an interactive visualisation where you change what it shows by dynamically updating the settings in the <code>spec</code>. This approach is fully supported, but there are some things to bear in mind in order to make it work well. The most important thing to remember is this: if you update a visualisation's <code>spec</code>, you need to re-render the component for the changes to take effect. In most cases <b><i>you don't need to do this</i></b>. But there are ways you can do it neatly if necessary.</p>
  
  <h3>4.1. Updating component keys</h3>

  <p>Instead of recreating the entire visualisation with a new <code>spec</code> whenever you want to update its settings, you can provide alternative settings for the components that you want to update within the <code>spec</code>, using different keys.</p>
  
  <p>You can then dynamically change the <code>key</code> that a component uses to find its settings within the <code>spec</code>. In this way you can conditionally update a component's settings without re-rendering the whole visualisation. This is generally the best way to dynamically update a visualisation's settings.</p>

  <h3>4.2. Updating the Visualisation with a new spec</h3>

  <p>It is possible to re-render a visualiation with a new <code>spec</code>. This section contains guidance on how to do it well. But first it's worth understanding why a <code>Visualisation</code> component needs to be re-rendered, when its child components don't.</p>

  <p>When a <code>Visualisation</code> component is created, it sets up a system of reactive relationships with its child components, which it uses to report changes in the amount of  available space. This system allows all of the visualisation's components to respond simultaneously to changes in the width of the browser. When you update a visualisation with a completely new <code>spec</code>, the visualisation need to recreate the reactive relationships to reflect the new <code>spec</code>.</p>

  <p>In Svelte you can conditionally re-render a component using a <code>&lbrace;&#35;key&rbrace;</code> block. A <code>&lbrace;&#35;key&rbrace;</code> block is a logic block that monitors a stateful variable and re-renders a component based on that variable's value. You will need to wrap a <code>Visualisation</code> component inside a <code>&lbrace;&#35;key&rbrace;</code> block in order to dynamically update its <code>spec</code>.</p>

  <p>In some cases, re-rendering a component can have unintended consequences. For instance, if your visualisation appears at the bottom of webpage that is long enough to have a scrollbar, re-rendering the visualisation can cause the browser's viewport to scroll up.</p>

  <p>Why? Because when a component is re-rendered, the existing version of the component is removed from the DOM before a new version is inserted into it. This happens in the blink of an eye, so you don't see the component disappear and reappear. But when the old component is removed, the viewport must scroll up to the end of the shorter document. When the new component is inserted, the viewport does not subsequently scroll back down to its previous position.</p>

  <p>The solution to this is to wrap both the <code>Visualisation</code> and its <code>&lbrace;&#35;key&rbrace;</code> block inside a <code>div</code> that has the same responsive properties as the visualisation itself. So for example, if the visualisation is set to have a height of 500 pixels when the page is wider than 600 pixels, and a height of 300 pixels when it is narrower than that, give the enclosing <code>div</code> the same responsive properties in CSS. Because the <code>div</code> is outside the <code>&lbrace;&#35;key&rbrace;</code> block it is never re-rendered, so it preserves the space that the visualisation needs, and the viewport doesn't move.</p>

  <button on:click={updateSpec}>Update Spec</button>

  <div class="viscontainer" style="min-width: 300px">
    {#key specIndex}
    <Visualisation spec={specs[specIndex]}>
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
    {/key}
  </div>

  <SiteFooter {links} />

</div>

<style>
  .viscontainer {
    min-width: 300px;
    height: 600px;
  }

  @media all and (max-width: 700px) {
    .viscontainer {
      height: 375px;
    } 
  }
</style>