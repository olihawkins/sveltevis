<script>

  import { settings } from "./settings.js";
  import { createConfigs } from "$lib/configs.js";
  import Visualisation from "$lib/Visualisation.svelte";
  import Plot from "$lib/Plot.svelte";
  import PropertyReport from "$lib/PropertyReport.svelte";

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
    <PropertyReport color="#707070" />
    <Plot />
    <div slot="footer">
      <p>Source</p>
      <p>Footnote</p>
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



