<script>

  import { settings } from "./settings.js";
  import { createConfigs } from "$lib/config.js";
  import Visualisation from "$lib/Visualisation.svelte";
  import Plot from "$lib/Plot.svelte";
  import LayoutReport from "$lib/LayoutReport.svelte";

  const configs = createConfigs(settings);

</script>

<svelte:head>
  <link rel="stylesheet" href="sveltevis.css" />
</svelte:head>


<div id="column">
  <h1>SvelteVis</h1>
  <Visualisation configs={configs}>
    <div slot="header">
      <p>Title</p>
      <p>Subtitle</p>
    </div>
    <LayoutReport color="#707070" />
    <Plot />
    <div slot="footer">
      <p>Footnotes</p>
      <p>Source</p>
    </div>
  </Visualisation>
</div>

<style>
  h1 {
    margin: 4rem 0 2rem 0;
    padding: 1rem;
    text-align: center;
  }

  #column {
    max-width: 900px;
    margin: 0 auto;
    color: #707070;
  }
</style>



