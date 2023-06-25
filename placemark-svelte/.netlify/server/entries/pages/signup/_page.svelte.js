import { c as create_ssr_component, b as add_attribute, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { W as WelcomeMenu } from "../../../chunks/WelcomeMenu.js";
const SingupForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let firstname = "";
  let lastname = "";
  let email = "";
  let password = "";
  return `<section class="section"><form><div class="field is-horizontal"><div class="field-body"><div class="field"><label class="label" for="firstName">First Name</label>
                    <input class="input" type="text" placeholder="Enter first name" name="firstName" id="firstName"${add_attribute("value", firstname, 0)}></div>
                <div class="field"><label class="label" for="lastName">Last Name</label>
                    <input class="input" type="text" placeholder="Enter last name" name="lastName" id="lastName"${add_attribute("value", lastname, 0)}></div></div></div>
        <div class="field"><label class="label" for="email">Email</label>
            <p class="control has-icons-left"><input class="input" type="text" placeholder="Enter email" name="email" id="email"${add_attribute("value", email, 0)}>
                <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span></p></div>
        <div class="field"><label class="label" for="password">Password</label>
            <p class="control has-icons-left"><input class="input" type="password" placeholder="Enter Password" name="password" id="password"${add_attribute("value", password, 0)}>
                <span class="icon is-small is-left"><i class="fas fa-lock"></i></span></p></div>
        <div class="field is-grouped"><button class="button is-link">Submit</button></div></form></section>

${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(WelcomeMenu, "WelcomeMenu").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns"><div class="column"><div class="box"><h1 class="title">Sign up</h1>
      ${validate_component(SingupForm, "SignupForm").$$render($$result, {}, {}, {})}</div></div>
  <div class="column has-text-centered"><img alt="" src="/istock.jpeg" width="300"></div></div>`;
});
export {
  Page as default
};
