import {writable} from "svelte/store";
import type {LoggedInUser, Placemark, chart} from "./services/placemark-type";

export const user = writable<LoggedInUser>();

export const latestPlacemark = writable<Placemark>();

export const charttype = writable<chart>();