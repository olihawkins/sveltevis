<script>

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

  let specIndex = $state(0);
  const specs = [lightSpec, darkSpec];
  function updateSpec() {
    specIndex = specIndex == 0 ? 1 : 0;
  }

</script>

  <button on:click={updateSpec}>Update</button>
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