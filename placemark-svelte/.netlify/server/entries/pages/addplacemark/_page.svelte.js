import { c as create_ssr_component, a as subscribe, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainMenu } from "../../../chunks/MainMenu.js";
import { P as PlacemarkMap } from "../../../chunks/PlacemarkMap.js";
import { u as user } from "../../../chunks/store.js";
const AddPlacemarkForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => value);
  let name = "";
  let description = "";
  let longitude = 0;
  let latitude = 0;
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
  let message = "Add a Placemark";
  $$unsubscribe_user();
  return `<form><div class="field"><label class="label" for="name">Enter Name</label>
        <input class="input" id="name" name="name" type="text"${add_attribute("value", name, 0)}></div>
    <div class="field"><label class="label" for="description">Description:</label>
        <input class="input" id="description" name="description" type="text"${add_attribute("value", description, 0)}></div>
    <div class="field"><label class="label" for="latitude">Latitude:</label>
        <input class="input" id="latitude" name="latitude" type="number" step="0.00001" min="-90" max="90"${add_attribute("value", latitude, 0)}></div>
    <div class="field"><label class="label" for="longitude">Longitude:</label>
        <input class="input" id="longitude" name="longitude" type="number" step="0.00001" min="-180" max="180"${add_attribute("value", longitude, 0)}></div>
    <div class="field"><div class="select"><select>${each(categoryList, (category) => {
    return `<option${add_attribute("value", category, 0)}>${escape(category)}</option>`;
  })}</select></div></div>
    <div class="field"><div class="control"><button class="button is-link is-light">Add Placemark</button></div></div>
    <div class="box">${escape(message)}</div></form>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainMenu, "MainMenu").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns"><div class="column"><div class="box">${validate_component(PlacemarkMap, "PlacemarkMap").$$render($$result, { mapname: "placemark-map", layer: "" }, {}, {})}</div></div>
    <div class="column"><div class="box">${validate_component(AddPlacemarkForm, "AddPlacemarkForm").$$render($$result, {}, {}, {})}</div></div></div>`;
});
export {
  Page as default
};
