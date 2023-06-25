import { c as create_ssr_component, v as validate_component, e as escape, d as each, b as add_attribute } from "../../../../chunks/index2.js";
import { H as Header } from "../../../../chunks/Header.js";
import { M as MainMenu } from "../../../../chunks/MainMenu.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let placemark = {
    name: "",
    description: "",
    location: { lat: 0, lng: 0 },
    category: "",
    img: [],
    _id: ""
  };
  var conditions = {
    current: { weather: [{ main: 0 }], temp: 0 }
  };
  let fileName = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainMenu, "MainMenu").$$render($$result, {}, {}, {})}`;
    }
  })}

<section class="section columns is-vcentered"><div class="column"><div class="name title">${escape(placemark.name)}</div>
        <div><div><p class="title is-5">Description: </p>
                <p class="subtitle is-6">${escape(placemark.description)}</p></div>
            <div><p class="title is-5">Latitude: </p>
                <p class="subtitle is-6">${escape(placemark.location.lat)}</p></div>
            <div><p class="title is-5">Longitude: </p>
                <p class="subtitle is-6">${escape(placemark.location.lng)}</p></div>
            <div><p class="title is-5">Category: </p>
                <p class="subtitle is-6">${escape(placemark.category)}</p></div>
            <div><p class="title is-5">Weather: </p>
                <p class="subtitle is-6">${escape(conditions.current.weather[0].main)}</p></div>
            <div><p class="title is-5">Temperature: </p>
                <p class="subtitle is-6">${escape(conditions.current.temp)} °C</p></div></div>
        <a href="${"/dashboard/" + escape(placemark._id, true) + "/edit"}" class="button is-info"><span>Edit (Admin/Creator only)</span></a></div>
    <div class="column"><div class="card"><div class="card-header"><div class="card-header-title">Upload Images or Delete all (Admin/Creator)
                </div></div>
            ${each(placemark.img, (img) => {
    return `<div class="card-image"><figure class="image is-256x256"><img${add_attribute("src", img, 0)} alt=""></figure>
                </div>`;
  })}
            <div class="card-content"><form enctype="multipart/form-data"><div id="file-select" class="file has-name is-fullwidth"><label class="file-label"><input multiple class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg">
                            <span class="file-cta"><span class="file-icon"><i class="fas fa-upload"></i></span>
            <span class="file-label">Choose max. 10 files…
            </span></span>
                            <span class="file-name">${escape(fileName)}</span></label>
                        <button type="submit" class="button is-info">Upload</button></div></form>
                <form><div class="card-footer"><button type="submit" class="button is-danger"><span class="icon"><i class="fas fa-trash"></i></span></button></div></form></div></div></div></section>`;
});
export {
  Page as default
};
