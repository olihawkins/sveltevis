<svelte:options namespace="svg" />

<script>
  
  // Imports ------------------------------------------------------------------

  import { getLayout } from "../layout.svelte.js";
  import { getSettings } from "../settings.js";
  import { noop } from "../events.js";
  
  // Defaults -----------------------------------------------------------------

  const defaults = {
    events: []
  };

 // Props --------------------------------------------------------------------

  let { key = "svg", children } = $props();

  // Layout -------------------------------------------------------------------

  const layout = getLayout();

  // Settings -----------------------------------------------------------------

  const config = $derived(layout.config);
  const settings = $derived(getSettings(defaults, config, key));

  // Handlers -----------------------------------------------------------------

  function getSvgHandler(type, key, settings, layout) {
    if (settings.events.includes(type)) {
      return (e) => {
        e.stopPropagation();
        selectedPoint = point;
        layout.event = { e: e, key: key, data: "" };
      };
    } else {
      return noop;
    }
  }

</script>

<svg 
  width="100%" 
  height="100%" 
  role="graphics-document",
  onclick={getSvgHandler("click", key, settings, layout)}
  onmousemove={getSvgHandler("mousemove", key, settings, layout)}
  onmouseover={getSvgHandler("mouseover", key, settings, layout)}
  onmouseout={getSvgHandler("mouseout", key, settings, layout)}>
  
    <g class="sveltevis-svg">
      {@render children()}
    </g>
</svg>

