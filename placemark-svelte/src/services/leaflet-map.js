/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as L from "leaflet";
import {placemarkService} from "./placemark-service.js";
import axios from "axios";
const apiKey = "f056af070b3bf3b0532587880c466c3d";

export class LeafletMap {
    imap = {};
    control = {};
    overlays = {};


    baseLayers = {
        Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 17,
            attribution:
                'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }),
        OPNVKarte: L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        OpenTopoMap: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        Stadia_OSMBright: L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }),
        Temperature: L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
            maxZoom: 17
        }),
        Rain: L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
            maxZoom: 17
        }),
    };

    constructor(id, descriptor, activeLayer="") {
        let defaultLayer = this.baseLayers.Terrain;
        if (activeLayer) {
            defaultLayer = this.baseLayers[activeLayer];
        }
        this.imap = L.map(id, {
            center: [descriptor.location.lat, descriptor.location.lng],
            zoom: descriptor.zoom,
            minZoom: descriptor.minZoom,
            zoomControl: false,
            layers: [defaultLayer]
        });
    }

    addLayer(title, layer) {
        this.overlays[title] = layer;
        this.imap.addLayer(layer);
    }

    addLayerGroup(title) {
        this.overlays[title] = L.layerGroup([]);
        this.imap.addLayer(this.overlays[title]);
    }

    showLayerControl() {
        this.control = L.control.layers(this.baseLayers, this.overlays).addTo(this.imap);
    }

    showZoomControl(position = "topleft") {
        L.control
            .zoom({
                position: position
            })
            .addTo(this.imap);
    }

    moveTo(zoom, location) {
        this.imap.setZoom(zoom);
        this.imap.panTo(new L.LatLng(location.lat, location.lng));
    }

    zoomTo(location) {
        this.imap.setView(new L.LatLng(location.lat, location.lng), 8);
    }

    async addMarker(location, popupText = "", layerTitle = "default") {
        let group = {};
        let marker = L.marker([location.lat, location.lng]);
        if (popupText) {
            var popup = L.popup({ autoClose: false, closeOnClick: false });
            //var conditions = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${apiKey}`);
            var conditions;
            const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&units=metric&appid=${apiKey}`;
            await fetch(requestUrl, {
                mode: 'cors'
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    conditions = data;});
            popup.setContent(popupText + " Weather: " +conditions.current.weather[0].main +" Temperature: " + conditions.current.temp);
            marker.bindPopup(popup);
        }
        if (!this.overlays[layerTitle]) {
            group = L.layerGroup([]);
            this.overlays[layerTitle] = group;
            this.imap.addLayer(group);
        } else {
            group = this.overlays[layerTitle];
        }
        marker.addTo(group);
    }

    invalidateSize() {
        this.imap.invalidateSize();
        let hiddenMethodMap = this.imap;
        hiddenMethodMap._onResize();
    }
}
