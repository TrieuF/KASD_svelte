import { c as create_ssr_component, b as add_attribute, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { W as WelcomeMenu } from "../../../chunks/WelcomeMenu.js";
const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  return `<section class="section"><form><div class="field"><label class="label" for="email">Email</label>
            <p class="control has-icons-left"><input class="input" type="text" placeholder="Enter email" name="email" id="email"${add_attribute("value", email, 0)}>
                <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span></p></div>
        <div class="field"><label class="label" for="password">Password</label>
            <p class="control has-icons-left"><input class="input" type="password" placeholder="Enter Password" name="password" id="password"${add_attribute("value", password, 0)}>
                <span class="icon is-small is-left"><i class="fas fa-lock"></i></span></p></div>
        <div class="field is-grouped"><button class="button is-success">Submit</button></div></form></section>

${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(WelcomeMenu, "WelcomeMenu").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns"><div class="column has-text-centered"><img alt="" src="/istock.jpeg" width="300"></div>
  <div class="column"><div class="box"><h1 class="title">Login</h1>
      ${validate_component(LoginForm, "LoginForm").$$render($$result, {}, {}, {})}</div></div></div>`;
});
export {
  Page as default
};
