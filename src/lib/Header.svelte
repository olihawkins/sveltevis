<div class="sveltevis-header" >
  <p class="sveltevis-header-title">Title</p>
  <p class="sveltevis-header-subtitle">Subtitle</p>
  <slot />
</div>

<style>
  .sveltevis-header {
    margin: 0 0 2rem 0;
    padding: 0;
  }

  .sveltevis-header-title {
    margin: 0 0 0.5rem 0;
    padding: 0;
    line-height: var(--sveltevis-line-height);
    font-size: var(--sveltevis-heading-font-size);
  }

  .sveltevis-header-subtitle {
    margin: 0 0 0.5rem 0;
    padding: 0;
    line-height: var(--sveltevis-line-height);
    font-size: var(--sveltevis-font-size);
  }
</style> 
