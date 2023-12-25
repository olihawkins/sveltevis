# sveltevis

A Svelte component library for composing responsive interactive data visualisations.

## Status

This package is in active development and is **not yet ready for use**. The project is targetting <a href="https://svelte.dev/blog/whats-new-in-svelte-december-2023">Svelte 5</a> and uses <a href="https://svelte.dev/blog/runes">runes</a>.

## Roadmap

The first objective is to develop the smallest set of fully-functional components needed to make a responsive, interactive scatterplot, using the project's approach to configuring component settings and managing state. Progress towards this milestone is set out below.

### Components completed

- Visualisation
- Graphic
- Svg
- Plot
- Header
- Footer

### Components to be completed

- AxisX
- AxisY
- GeomScatter

## Trying the components

If you want to try the existing components, or contribute to development, the easiest way to try them is to download and run the demo project.

1. Clone the project repository from <a href="https://github.com/olihawkins/sveltevis">GitHub</a>

2. Run `npm install` to install the dependencies

3. Run `npm run dev` to start the demo application on localhost:5173 

It is also possible to install the package into a Vite Svelte template, but this requires modifying the template to run Svelte 5. Using the components in this way means you won't have the default stylesheet automatically installed in the project.

1. Create a Svelte project with Vite using `npm create vite@latest my-svelte-project -- --template svelte`

2. Run `npm install` to install the dependencies

3. Update Svelte to version 5 with `npm i svelte@next`

4. Install the package with `npm install sveltevis`

Note that you will need to edit `main.js` in the Vite project to replace the old method of instatiating the app with the new method.

```javascript
// Comment out old method
// const app = new App({
//   target: document.getElementById('app'),
// })

// Add new method
const app = createRoot(App, { target: document.getElementById("app") });
```