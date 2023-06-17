import {writable} from "svelte/store";

export const user = writable({
    email: "",
    token: "",
    isAdmin: "",
});

export const latestPlacemark = writable(null);

export const charttype = writable(null);