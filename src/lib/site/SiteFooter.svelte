<script>

  // Props --------------------------------------------------------------------

  let { links } = $props();

  // Data ---------------------------------------------------------------------
  
  let hasPrevious = $derived(Object.hasOwn(links, "previous"));
  let hasNext = $derived(Object.hasOwn(links, "next"));
  
</script>


<div class="sveltevis-site-footer-nav">
  {#if hasPrevious}
    <div class="sveltevis-site-footer-nav-previous">
      <a href={links.previous.href}>&#8592; {links.previous.label}</a>
    </div>
  {/if}
  {#if hasNext}
    <div class="sveltevis-site-footer-nav-next">
      <a href={links.next.href}>{links.next.label} &#8594;</a>
    </div>
  {/if}
</div>
