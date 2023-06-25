import { c as create_ssr_component } from "./index2.js";
const WelcomeMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav class="navbar" aria-label="dropdown navigation"><div class="navbar-menu"><div class="navbar-end"><div class="navbar-item has-dropdown is-hoverable"><div class="navbar-item"><a class="button navbar-link" href="/">About</a></div>

                <div class="navbar-dropdown"><div class="navbar-item"><a class="button" id="login" href="/login">Log in</a></div>
                    <div class="navbar-item"><a class="button is-link" id="signup" href="/signup">Sign up</a></div></div></div></div></div></nav>`;
});
export {
  WelcomeMenu as W
};
