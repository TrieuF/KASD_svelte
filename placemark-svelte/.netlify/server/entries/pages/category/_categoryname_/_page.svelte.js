import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../../../chunks/index2.js";
import { M as MainMenu } from "../../../../chunks/MainMenu.js";
import { H as Header } from "../../../../chunks/Header.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let placemarks = [];
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainMenu, "MainMenu").$$render($$result, {}, {}, {})}`;
    }
  })}

<table class="table is-fullwidth"><thead><th>Name</th>
    <th>Description</th>
    <th>Latitude</th>
    <th>Longitude</th>
    <th>Category</th>
    <th></th>
    <th></th></thead>
    <tbody>${each(placemarks, (placemark) => {
    return `<tr><td>${escape(placemark.name)}</td>
            <td>${escape(placemark.description)}</td>
            <td>${escape(placemark.location.lat)}</td>
            <td>${escape(placemark.location.lng)}</td>
            <td>${escape(placemark.category)}</td>
            <td><a class="button" href="${"/dashboard/" + escape(placemark._id, true)}">Details</a></td>
            <td><a class="button" href="${"/dashboard/" + escape(placemark._id, true) + "/delete"}"><i class="fas fa-trash"></i></a></td>
        </tr>`;
  })}</tbody></table>`;
});
export {
  Page as default
};
