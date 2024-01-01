# SvelteVis

A Svelte component library for composing responsive interactive data visualisations.

## Status

This package is in active development and is **not yet ready for use**. The API should be regarded as unstable until version 1.0.0. The project is targetting <a href="https://svelte.dev/blog/whats-new-in-svelte-december-2023">Svelte 5</a> and uses <a href="https://svelte-5-preview.vercel.app/docs/runes">runes</a>.

## Roadmap

The first objective is to develop the smallest set of fully-functional components needed to make a responsive scatterplot, using the project's approach to configuring component settings and managing state. Progress towards this milestone is set out below.

### Components completed

- Visualisation
- Header
- Footer
- Graphic
- Svg
- Plot
- AxisX
- AxisY

### Components to be completed

- PointGeometry

## Trying the components

If you want to try the existing components, the easiest way right now is to download and run the demo project.

1. Clone the project repository from <a href="https://github.com/olihawkins/sveltevis">GitHub</a>

2. Run `npm install --force` to install the dependencies (the `force` argument is needed because the project uses Svelte 5, which is in beta)

3. Run `npm run dev` to start the demo application on localhost:5173 

It is also possible to install the package from NPM into a Vite Svelte template, but this requires modifying the template to run Svelte 5.

1. Create a Svelte project with Vite using `npm create vite@latest my-svelte-project -- --template svelte`

2. Run `npm install` to install the dependencies

3. Update Svelte to version 5 with `npm i svelte@next`

4. Install the package with `npm install sveltevis`

Note that you will need to edit `main.js` in the Vite project to replace the old method of instantiating the app with the new method.

```javascript
// Comment out old method
// const app = new App({
//   target: document.getElementById('app'),
// })

// Add new method
const app = createRoot(App, { target: document.getElementById("app") });
```

## Styling components

SvelteVis allows you to target the styles used in its components using your own stylesheet, so that the styles of your visualisations match your website. Importing SvelteVis components into a new project doesn't automatically add the default styles used in the demo application. However, if you want to use these stylesheets as a starting point for making modifications, they can be found in the `css` folder: simply copy them as stylesheets to use in your own app. 

The stylesheet for targeting SvelteVis components is called `sveltevis.css` and this is the stylesheet you should modify to implement your own visualisation styles. The `site.css` stylesheet is the css used for the demo application, and it doesn't contain any of the selectors used to target the visualisation components. Both of these default stylesheets are set up to provide alternate light and dark styles based on the operating system mode.