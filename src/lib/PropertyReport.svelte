<script>
  
    // Imports ----------------------------------------------------------------------------
  
    import { getLayout } from "./contexts.svelte.js"
    
    // Contexts ---------------------------------------------------------------------------
  
    const layout = getLayout();
  
    // Derived values ---------------------------------------------------------------------
  
    let config = $derived(layout.config);
    let graphic = $derived(layout.graphic);
    let plot = $derived(layout.plot);
  
</script>

<g>
    <text x=0 y=20>config: {config.vis.name}</text>
    <text x=0 y=40>graphic.width: {graphic.width}</text>
    <text x=0 y=60>graphic.height: {graphic.height}</text>
    <text x=0 y=80>plot.width: {plot.width}</text>
    <text x=0 y=100>plot.height: {plot.height}</text>
</g>