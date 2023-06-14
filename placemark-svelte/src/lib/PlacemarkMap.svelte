<script>
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map";
    import { onMount } from "svelte";
    import {placemarkService} from "../services/placemark-service.js";

    const mapConfig = {
        location: { lat: 49.00346449404031, lng: 12.095848553970594 },
        zoom: 8,
        minZoom: 1
    };

    onMount(async () => {
        const map = new LeafletMap("placemark-map", mapConfig);
        map.showZoomControl();
        map.addLayerGroup("Placemarks");
        map.showLayerControl();
        const placemarks = await placemarkService.getAllPlacemarks();
        placemarks.forEach((placemark) => {
            map.addMarker({ lat: placemark.location.lat, lng: placemark.location.lng }, placemark.name, "Placemarks");
        });
    });
</script>

<div class="box" id="placemark-map" style="height:75vh"></div>