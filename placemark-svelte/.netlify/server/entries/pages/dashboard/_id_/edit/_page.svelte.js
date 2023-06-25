import { c as create_ssr_component, a as subscribe, b as add_attribute, d as each, e as escape } from "../../../../../chunks/index2.js";
import { u as user } from "../../../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => value);
  let { data } = $$props;
  let placemark = {
    name: "",
    description: "",
    location: { lat: 0, lng: 0 },
    category: "",
    img: [],
    _id: ""
  };
  let categoryList = [
    "Landscape-Feature",
    "National-monument",
    "Island",
    "Town",
    "City",
    "Forest",
    "River",
    "Bridge",
    "Entertainment-Venue",
    "Archaeological-Feature",
    "Others"
  ];
  let message = "Edit Placemark";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_user();
  return `<form><div class="field"><label class="label" for="name">Enter Name</label>
        <input class="input" id="name" name="name" type="text"${add_attribute("value", placemark.name, 0)}></div>
    <div class="field"><label class="label" for="description">Description:</label>
        <input class="input" id="description" name="description" type="text"${add_attribute("value", placemark.description, 0)}></div>
    <div class="field"><label class="label" for="latitude">Latitude:</label>
        <input class="input" id="latitude" name="latitude" type="number" step="0.00001" min="-90" max="90"${add_attribute("value", placemark.location.lat, 0)}></div>
    <div class="field"><label class="label" for="longitude">Longitude:</label>
        <input class="input" id="longitude" name="longitude" type="number" step="0.00001" min="-180" max="180"${add_attribute("value", placemark.location.lng, 0)}></div>
    <div class="field"><div class="select"><select>${each(categoryList, (category) => {
    return `<option${add_attribute("value", category, 0)}>${escape(category)}</option>`;
  })}</select></div></div>
    <div class="field"><div class="control"><button class="button is-link is-light">Change Placemark</button></div></div>
    <div class="box">${escape(message)}</div></form>`;
});
export {
  Page as default
};
