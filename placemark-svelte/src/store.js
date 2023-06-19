import {writable} from "svelte/store";

export const user = writable({
    email: "",
    token: "",
    id: "",
});

export const latestPlacemark = writable(null);

export const charttype = writable(null);