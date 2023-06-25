import { c as create_ssr_component, b as add_attribute } from "./index2.js";
import "leaflet";
import { l as latestPlacemark } from "./store.js";
const leaflet = "";
const PlacemarkMap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let map;
  let { mapname = "" } = $$props;
  let { layer = "" } = $$props;
  latestPlacemark.subscribe(async (placemark) => {
    if (placemark && map) {
      await map.addMarker(
        {
          lat: placemark.location.lat,
          lng: placemark.location.lng
        },
        placemark.name,
        "Placemarks",
        placemark._id
      );
      await map.moveTo(8, {
        lat: placemark.location.lat,
        lng: placemark.location.lng
      });
    }
  });
  if ($$props.mapname === void 0 && $$bindings.mapname && mapname !== void 0)
    $$bindings.mapname(mapname);
  if ($$props.layer === void 0 && $$bindings.layer && layer !== void 0)
    $$bindings.layer(layer);
  return `<div class="box"${add_attribute("id", mapname, 0)} style="height:75vh"></div>`;
});
export {
  PlacemarkMap as P
};
