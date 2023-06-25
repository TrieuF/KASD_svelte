import { c as create_ssr_component } from "./index2.js";
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Header as H
};
