import { c as create_ssr_component, v as validate_component, d as each, b as add_attribute, e as escape } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainMenu } from "../../../chunks/MainMenu.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let charttypes = [
    { name: "Bar", value: "bar" },
    { name: "Pie", value: "pie" },
    { name: "Line", value: "line" },
    { name: "Percentage", value: "percentage" }
  ];
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainMenu, "MainMenu").$$render($$result, {}, {}, {})}`;
    }
  })}


<form><div class="columns"><div class="column has-text-centered"><label for="charttype" class="title is-5">Charttype:</label>
            <div class="select"><select id="charttype">${each(charttypes, (chart) => {
    return `<option${add_attribute("value", chart.value, 0)}>${escape(chart.name)}</option>`;
  })}</select></div></div>

        <div class="column"><div class="field"><div class="control"><button class="button is-link is-light">Select this type</button></div></div></div></div></form>`;
});
export {
  Page as default
};
