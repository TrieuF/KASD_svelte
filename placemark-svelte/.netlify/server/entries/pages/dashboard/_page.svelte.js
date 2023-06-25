import { c as create_ssr_component, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainMenu } from "../../../chunks/MainMenu.js";
import { P as PlacemarkMap } from "../../../chunks/PlacemarkMap.js";
const Query = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  return `<div class="box"><form><div class="level"><div class="level-item"><input class="input is-rounded is-small" id="name" name="name" type="text" placeholder="Name"${add_attribute("value", name, 0)}>
                <button class="button is-small is-link is-light">Search</button></div></div></form></div>`;
});
const SearchCategory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    "Wonder-of-the-World",
    "Others"
  ];
  return `<div class="dropdown is-hoverable"><div class="dropdown-trigger"><button class="button is-small" aria-haspopup="true" aria-controls="dropdown-menu"><span>Select</span>
            <span class="icon is-small"><i class="fas fa-angle-down" aria-hidden="true"></i></span></button></div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu"><div class="dropdown-content">${each(categoryList, (category) => {
    return `<a class="dropdown-item" href="${"/category/" + escape(category, true)}">${escape(category)}</a>`;
  })}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainMenu, "MainMenu").$$render($$result, {}, {}, {})}`;
    }
  })}

<section class="section"><div class="columns is-vcentered "><div class="column">${validate_component(PlacemarkMap, "PlacemarkMap").$$render($$result, { mapname: "placemark-map", layer: "" }, {}, {})}</div>
        <div class="column">${validate_component(Query, "Query").$$render($$result, {}, {}, {})}
            <div class="buttons are-large"><div class="buttons are-large"><a class="button is-fullwidth is-danger" href="/maps">Maps</a>
                    <a class="button is-fullwidth is-primary" href="/analytics">Analytics</a>
                    <a class="button is-fullwidth is-info" href="/addplacemark">Add Placemark</a>
                    <a class="button is-fullwidth is-warning" href="/imagegallery">Image Gallery</a></div></div>
            ${validate_component(SearchCategory, "SearchCategory").$$render($$result, {}, {}, {})}</div></div></section>`;
});
export {
  Page as default
};
