import { c as create_ssr_component, a as subscribe, e as escape } from "./index2.js";
import { u as user } from "./store.js";
const MainMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `<nav class="navbar" aria-label="dropdown navigation"><div class="navbar-menu"><div class="navbar-end"><div class="navbar-item has-dropdown is-hoverable"><div class="navbar-item"><a id="dashboard" class="button navbar-link" href="/dashboard">Dashboard </a></div>

                <div class="navbar-dropdown"><div class="navbar-item"><a class="button is-fullwidth" id="maps" href="/maps">Maps</a></div>
                    <div class="navbar-item"><a class="button is-fullwidth" id="analytic" href="/analytics">Analytics</a></div>
                    <div class="navbar-item"><a class="button is-fullwidth" href="/addplacemark">Add Placemark</a></div>
                    <div class="navbar-item"><a class="button is-fullwidth" href="/imagegallery">Image Gallery</a></div>
                    <div class="navbar-item"><a id="logout" class="button is-fullwidth is-link" href="/logout">Logout</a></div>
                    <hr class="navbar-divider">
                    <div class="navbar-item">${$user?.email ? `<div class="is-size-7">${escape($user.email)}</div>` : `<div class="is-size-7">KASD_Svelte</div>`}</div></div></div></div></div></nav>`;
});
export {
  MainMenu as M
};
