// Disable linter to silence VS Code linting bug in SvelteKit
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Configuration } from "./configuration.ts";
import type { Layout } from "./layout.svelte.ts";
import type { LayoutGraphic } from "./layout.svelte.ts";
import type { LayoutMargin } from "./layout.svelte.ts";
import type { LayoutPlot } from "./layout.svelte.ts";
import type { LayoutEvent } from "./layout.svelte.ts";
import type { Observation } from "./data.ts";

import { getLayout } from "$lib/layout.svelte.ts";
import { getSettings } from "$lib/configuration.ts";

import Visualisation from "$lib/Visualisation.svelte";
import ColorSchemeObserver from "$lib/ColorSchemeObserver.svelte";
import Header from "$lib/Header.svelte";
import Footer from "$lib/Footer.svelte";
import Graphic from "$lib/Graphic.svelte";
import Popup from "$lib/Popup.svelte";
import Svg from "$lib/svg/Svg.svelte";
import Gridlines from "$lib/svg/Gridlines.svelte";
import AxisX from "$lib/svg/AxisX.svelte";
import AxisY from "$lib/svg/AxisY.svelte";
import Plot from "$lib/svg/Plot.svelte";
import LayoutReport from "$lib/svg/LayoutReport.svelte";
import CircleGeometry from "$lib/svg/geometries/CircleGeometry.svelte";
import LineGeometry from "$lib/svg/geometries/LineGeometry.svelte";

export type {
  Configuration,
  Layout,
  LayoutGraphic,
  LayoutMargin,
  LayoutPlot,
  LayoutEvent,
  Observation
}

export {
  getLayout,
  getSettings,
  ColorSchemeObserver,
  Visualisation,
  Header,
  Footer,
  Graphic,
  Popup,
  Svg,
  Gridlines,
  AxisX,
  AxisY,
  Plot,
  LayoutReport,
  CircleGeometry,
  LineGeometry
};