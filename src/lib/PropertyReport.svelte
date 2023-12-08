<script>
  
    // Imports ----------------------------------------------------------------------------
  
    import { getLayout } from "./contexts.svelte.js"
    
    // Contexts ---------------------------------------------------------------------------
  
    const layout = getLayout();
  
    // Derived values ---------------------------------------------------------------------
  
    let config = $derived(layout.config);
    let graphicWidth = $derived(layout.graphicWidth);
    let graphicHeight = $derived(layout.graphicHeight);
    let graphicMargin = $derived(layout.graphicMargin);
    let plotWidth = $derived(layout.plotWidth);
    let plotHeight = $derived(layout.plotHeight);
  
</script>

<g>
    <text x=0 y=20>config: {config.vis.name}</text>
    <text x=0 y=40>graphic width: {graphicWidth}</text>
    <text x=0 y=60>graphic height: {graphicHeight}</text>
    <text x=0 y=80>plot width: {plotWidth}</text>
    <text x=0 y=100>plot height: {plotHeight}</text>
</g>