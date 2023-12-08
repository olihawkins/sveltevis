<script>

  import Visualisation from "$lib/Visualisation.svelte";
  import Plot from "$lib/Plot.svelte";
  import { getConfigs } from "$lib/configs.js";
  import { settingsVisA, settingsVisB } from "./settings.js";

  const configsVisA = getConfigs(settingsVisA);
  const configsVisB = getConfigs(settingsVisB);

</script>

<svelte:head>
  <link rel="stylesheet" href="sveltevis.css" />
</svelte:head>


<div id="column">
  <h1>SvelteVis</h1>
  <Visualisation configs={configsVisA}>
    <div slot="header">
      <p>Title: Vis A</p>
      <p>Subtitle</p>
    </div>
    <rect x=0 y=0 width=50 height=4 />
    <rect x=0 y=0 width=4 height=50 />
    <Plot></Plot>
    <div slot="footer">
      <p>Source</p>
      <p>Footnote</p>
    </div>
  </Visualisation>
  <br />
  <Visualisation configs={configsVisB}>
    <div slot="header">
      <p>Title: Vis B</p>
      <p>Subtitle</p>
    </div>
    <rect x=0 y=0 width=50 height=4 />
    <rect x=0 y=0 width=4 height=50 />
    <Plot></Plot>
    <div slot="footer">
      <p>Source</p>
      <p>Footnote</p>
    </div>
  </Visualisation>
</div>

<style>
  h1 {
    text-align: center;
    margin: 0 0 1rem 0;
    padding: 1rem;
  }

  #column {
    max-width: 900px;
    margin: 0 auto;
    color: #707070;
    fill: #707070;
  }
</style>



