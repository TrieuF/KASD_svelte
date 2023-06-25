import { c as create_ssr_component, v as validate_component } from "../../chunks/index2.js";
import { H as Header } from "../../chunks/Header.js";
import { W as WelcomeMenu } from "../../chunks/WelcomeMenu.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(WelcomeMenu, "WelcomeMenu").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns"><div class="column"><div class="box"><div class="notification is-dark">Hello from ME!
            </div></div></div>
    <div class="column has-text-centered"><img alt="" src="/istock.jpeg" width="300"></div></div>`;
});
export {
  Page as default
};
