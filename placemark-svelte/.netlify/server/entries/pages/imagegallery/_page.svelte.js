import { c as create_ssr_component, v as validate_component, d as each, b as add_attribute } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainMenu } from "../../../chunks/MainMenu.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let images = [];
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainMenu, "MainMenu").$$render($$result, {}, {}, {})}`;
    }
  })}

${each(images, (image) => {
    return `<img${add_attribute("src", image.secure_url, 0)} alt="" width="500" height="600">`;
  })}`;
});
export {
  Page as default
};
