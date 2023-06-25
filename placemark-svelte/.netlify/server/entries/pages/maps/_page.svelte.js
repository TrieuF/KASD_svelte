import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainMenu } from "../../../chunks/MainMenu.js";
import { P as PlacemarkMap } from "../../../chunks/PlacemarkMap.js";
const MultipleMaps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="columns"><div class="column"><div class="box">${validate_component(PlacemarkMap, "PlacemarkMap").$$render($$result, { mapname: "placemark-map", layer: "" }, {}, {})}</div></div>
    <div class="column"><div class="box">${validate_component(PlacemarkMap, "PlacemarkMap").$$render(
    $$result,
    {
      mapname: "placemark-map2",
      layer: "Satellite"
    },
    {},
    {}
  )}</div></div></div>
<div class="columns"><div class="column"><div class="box">${validate_component(PlacemarkMap, "PlacemarkMap").$$render(
    $$result,
    {
      mapname: "placemark-map3",
      layer: "Temperature"
    },
    {},
    {}
  )}</div></div>
    <div class="column"><div class="box">${validate_component(PlacemarkMap, "PlacemarkMap").$$render($$result, { mapname: "placemark-map4", layer: "Rain" }, {}, {})}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainMenu, "MainMenu").$$render($$result, {}, {}, {})}`;
    }
  })}

${validate_component(MultipleMaps, "MultipleMaps").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
