# Changelog

## 0.0.9

* Fixed an issue with missing exports

## 0.0.8

* Resolved conflict between .npmignore and package.json

## 0.0.7

* Fixed a bug in `LayoutReport` component
* Added .npmignore to remove site files from `dist`

## 0.0.6

* Adds a system for sending messages about events between components
* Adds a `Popup` component for displaying data on mouse events
* Adds a `LineGeometry` component for line charts

## 0.0.5

* Fixed issues with `dist` files

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