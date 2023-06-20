<script>
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map";
    import { onMount } from "svelte";
    import {placemarkService} from "../services/placemark-service.js";
    import {latestPlacemark} from "../store.js";

    const mapConfig = {
        location: { lat: 49.022676838235945, lng: 12.097234021044144 },
        zoom: 8,
        minZoom: 1
    };
    let map;
    export let mapname="";
    export let layer= "";

    onMount(async () => {
        map = new LeafletMap(mapname, mapConfig, layer);
        map.showZoomControl();
        map.addLayerGroup("Placemarks");
        map.showLayerControl();
        const placemarks = await placemarkService.getAllPlacemarks();
        placemarks.forEach((placemark) => {
            map.addMarker({ lat: placemark.location.lat, lng: placemark.location.lng }, placemark.name, "Placemarks",placemark._id );
        });
    });

    latestPlacemark.subscribe(async (placemark) => {
        if (placemark && map) {
            await map.addMarker({ lat: placemark.location.lat, lng: placemark.location.lng }, placemark.name, "Placemarks", placemark._id);
            await map.moveTo(8, { lat: placemark.location.lat, lng: placemark.location.lng });
        }
    });
</script>

<div class="box" id={mapname} style="height:75vh"></div>
