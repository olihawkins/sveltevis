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
  import LayoutReport from "$lib/svg/LayoutReport.svelte";
  import { config } from "./config.js";
  
  const links = {
    previous: {
      label: "Home",
      href: "/"
    },
    next: {
      label: "Axes",
      href: "/axes"
    }
  };

</script>

<div id="column">
  <SiteHeader />
  <h2>1. Layout</h2>

  <p>The root component for a SvelteVis visualisation is called <code>Visualisation</code>. It is a general purpose container with a simple structure and a built-in system for handling responsiveness. The <code>Visualisation</code> component manages the size of the graphic and the plotting area for each visualisation, and makes this data available to its child components through a shared context.</p>
  
  <h3>1.1. Structure</h3>

  <p>A <code>Visualisation</code> is divided vertically into three regions: a <code>Header</code>, a <code>Graphic</code> and a <code>Footer</code>. The <code>Header</code> and <code>Footer</code> contain HTML, while the <code>Graphic</code> typically contains an SVG. The <code>Graphic</code> can have a special region called the <code>Plot</code>. This is the area within the graphic where data is visually represented. In a chart this would be the plotting area, bounded by the chart's axes.</p> 

  <div>
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

  <p>In this example, a child component of the <code>Visualisation</code> called a <code>LayoutReporter</code> reads the layout data from the shared context and visualises it. Try resizing the browser to see how the layout automatically updates. In pracice you won't need a <code>LayoutReporter</code>: it's just a component that's used to test that child components can access their visualisation's global state and respond to the available space.</p>

  <h3>1.2. Components</h3>

  <p>The Svelte components used to construct the example are shown below. The <code>Visualisation</code> component takes a single called <code>config</code>. This is a json object that contains the settings for <strong><i>all</i></strong> of the components.</p>

  <div class="codeblock">
  <pre>
  <code>
  import &#123; config &#125; from "./lib/config.js";
  
  import &#123; 
    Visualisation, 
    Header,
    Footer,
    Graphic,
    Svg,
    LayoutReport 
  &#125; from "sveltevis";
  
  &lt;Visualisation config=&#123;config&#125;&gt;
    &lt;Header /&gt;
    &lt;Graphic&gt;
      &lt;Svg&gt;
        &lt;LayoutReport /&gt;
      &lt;/Svg&gt;
    &lt;/Graphic&gt;
    &lt;Footer /&gt;
  &lt;/Visualisation&gt;</code>
  </pre>
  </div>

  <h3>1.3. Configuration</h3>

  <p>The <code>config</code> used in the visualisation is shown below. A <code>config</code> contains objects specifying the settings for each SvelteVis component used in the visualisation. Components are identified with names in <code>camelCase</code> rather than <code>PascalCase</code>. So in the example below, the <code>visualisation</code>, <code>header</code> and <code>footer</code> objects contain the user-specified settings for those components.</p>
  
  <div class="codeblock">
  <pre>
  <code>
  const config = &#123;
    main: &#123;
      name: "desktop",
      visualisation: &#123;
        minwidth: 700,
        graphic: &#123;
          height: 450,
          margin: &#123;
            top: 50, 
            right: 50, 
            bottom: 50, 
            left: 50
          &#125;
        &#125;
      &#125;,
      header: &#123;
        title: "&lt;b&gt;Title&lt;/b&gt;",
        subtitle: "Subtitle"
      &#125;,
      footer: &#123;
        footnote: "Footnote",
        source: "Source"
      &#125;
    &#125;,
    alts: [
      &#123;
        name: "mobile",
        visualisation: &#123;
          minwidth: 0,
          graphic: &#123;
            height: 300,
            margin: &#123;
              top: 40, 
              right: 40, 
              bottom: 40, 
              left: 40
            &#125;
          &#125;
        &#125;,
      &#125;
    ]
  &#125;;</code>
  </pre>
  </div>

<p>Every component has default settings, so you only need to specify config values for settings that you need to override. Some aspects of the appearance of SvelteVis components are controlled with global CSS, but some are controlled with the config. Broadly speaking, anything that is purely aesthetic (colors, fonts etc.) is controlled with CSS, while anything that affects the layout and its behaviour is controlled with the config.

<h3>1.4. Responsiveness</h3>

<p>The top level of the <code>config</code> contains two keys: <code>main</code> and <code>alts</code>. The <code>main</code> key contains an object that is the baseline config: this is where any customisations to component settings should be specified first. The <code>alts</code> key contains an array: each value of this array contains alternative settings which are merged into the <code>main</code> config when the width of the browser window is reduced.</p>

<p>Each <code>visualisation</code> object contains a value called <code>minwidth</code>. This specifies the minimum width of the browser window, above which the given settings will take effect. Ideally, the <code>main</code> configuration object should contain the largest <code>minwidth</code>, while <code>alts</code> should specify smaller values, with at least one alternative configuration specifying a <code>minwidth</code> of zero. SvelteVis will do its best to interpret your config sensibly if this is not the case.</p>

<p>The visualisation will automatically select the right settings to use, given the width of the browser window, and share these values with its child componenets. This selection is based on the <code>innerWidth</code> of the browser, as this is the value that is used for CSS media queries that target the width of the browser. This makes it easy to align your config with a responsive stylesheet, so that component styles and behaviour change at the same thresholds.</p>

<p>If you want to implement your own SvelteVis componenents, you can subscribe to the parent <code>Visualisation's</code> layout context to receive updates to the <code>settings</code> when the width of the browser window changes. This means every component can be designed responsively by opting into an integrated system that is consistent within each visualisation.</p>

<SiteFooter {links} />

</div>