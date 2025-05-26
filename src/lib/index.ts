// Disable linter to silence VS Code linting bug in SvelteKit
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Configuration } from "./configuration";
import type { Layout } from "./layout.svelte";
import type { LayoutGraphic } from "./layout.svelte";
import type { LayoutMargin } from "./layout.svelte";
import type { LayoutPlot } from "./layout.svelte";
import type { LayoutEvent } from "./layout.svelte";
import type { Observation } from "./data";

import { getLayout } from "$lib/layout.svelte";
import { getSettings } from "$lib/configuration";

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