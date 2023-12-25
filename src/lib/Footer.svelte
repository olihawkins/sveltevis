<div class="sveltevis-footer">
  <slot />
  <p class="sveltevis-footer-footnote">Footnote</p>
  <p class="sveltevis-footer-source">Source</p>
</div>

<style>
  .sveltevis-footer {
    margin: 2rem 0 0 0;
    padding: 0;
  }

  .sveltevis-footer-footnote {
    margin: 0 0 0.5rem 0;
    line-height: var(--sveltevis-line-height);
    font-size: var(--sveltevis-font-size);      
  }

  .sveltevis-footer-source {
    margin: 0 0 0.5rem 0;
    padding: 0;
    line-height: var(--sveltevis-line-height);
    font-size: var(--sveltevis-font-size);
}
</style>