# Changelog

## 0.0.5

* Fixed an issue with `dist` files

## 0.0.4

* Updates to achieve compatibility with the latest Svelte 5 beta (Svelte 5.0.0-next.141)
    * Replaces slots with `{@render children()}`
    * Replaces event handler directives with new event properties
    * Adds `$bindable()` rune to `ColorSchemeObserver`

## 0.0.3

* First milestone reached: implements components needed to make a responsive scatterplot
* Adds the first geometry component with mappings from variables to visual elements
* Adds a reactive pathway to dynamically update a `Visualisation`'s spec
* Adds a `ColorSchemeObserver` for monitoring dark and light mode settings
* Fixes a bug with ids in `Gridlines` and `Axis` components
* The full set of components exported in this release are:
    * `ColorSchemeObserver`
    * `Visualisation`
    * `Header`
    * `Footer`
    * `Graphic`
    * `Svg`
    * `Gridlines`
    * `AxisX`
    * `AxisY`
    * `Plot`
    * `CircleGeometry`

## 0.0.2

* Adds `AxisX` and `AxisY` components
* Exports `getLayout` and `getSettings` so that consumers can implement their own SvelteVis components

## 0.0.1

* Initial release
* Adds basic structural components for responsive visualisations:
    * `Visualisation`
    * `Header`
    * `Footer`
    * `Graphic`
    * `Svg`
    * `Plot`