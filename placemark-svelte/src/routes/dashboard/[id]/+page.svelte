<script lang="ts">
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
    import {onMount} from "svelte";
    import {placemarkService} from "../../../services/placemark-service.ts";
    import {goto} from "$app/navigation";
    import type {Placemarkreturned} from "../../../services/placemark-type";

    export let data;
    let placemark: Placemarkreturned={
        name: "",
            description: "",
            location: {
            lat: 0,
                lng: 0,
        },
        category: "",
            img: [],
            _id: "",
    };
    const apiKey = import.meta.env.VITE_openweatherapi;
    let conditions;
    onMount(async () => {
        placemark = await placemarkService.getPlacemark(data.placemarkid);
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${placemark.location.lat}&lon=${placemark.location.lng}&units=metric&appid=${apiKey}`;
        await fetch(requestUrl, {
            mode: 'cors'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                conditions = data;
            });
        fileName = "";
    });

    let fileName = "";
    let files;

    async function addImages() {
        if (files.length > 0) {
            fileName = "";
            for (const element of files) {
                fileName += element.name + ", ";
            }
        }
    }

    async function deleteImages() {
        const response = await placemarkService.deleteImages(placemark._id);
        if (response) {
            await goto("/dashboard")
        }
    }

    async function uploadImages() {
        const response = await placemarkService.uploadImages(placemark._id, files);
        if (response) {
            await goto("/dashboard")
        }
    }
</script>

<Header>
    <MainMenu/>
</Header>

<section class="section columns is-vcentered">
    <div class="column">
        <div class="name title">
            {placemark?.name}
        </div>
        <div>
            <div>
                <p class="title is-5">Description: </p>
                <p class="subtitle is-6">{placemark?.description}</p>
            </div>
            <div>
                <p class="title is-5">Latitude: </p>
                <p class="subtitle is-6">{placemark?.location.lat}</p>
            </div>
            <div>
                <p class="title is-5">Longitude: </p>
                <p class="subtitle is-6">{placemark?.location.lng}</p>
            </div>
            <div>
                <p class="title is-5">Category: </p>
                <p class="subtitle is-6">{placemark?.category}</p>
            </div>
            <div>
                <p class="title is-5">Weather: </p>
                <p class="subtitle is-6">{conditions?.weather[0].main}</p>
            </div>
            <div>
                <p class="title is-5">Temperature: </p>
                <p class="subtitle is-6">{conditions?.main?.temp} °C</p>
            </div>
        </div>
        <a href="/dashboard/{placemark?._id}/edit" class="button is-info">
            <span>Edit (Admin/Creator only)</span>
        </a>
    </div>
    <div class="column">
        <div class="card">
            <div class="card-header">
                <div class="card-header-title">
                    Upload Images or Delete all (Admin/Creator)
                </div>
            </div>
            {#each placemark?.img as img}
                <div class="card-image">
                    <figure class="image is-256x256">
                        <img src={img} alt="">
                    </figure>
                </div>
            {/each}
            <div class="card-content">
                <form on:submit|preventDefault={uploadImages} enctype="multipart/form-data">
                    <div id="file-select" class="file has-name is-fullwidth">
                        <label class="file-label">
                            <input bind:files on:change={addImages} multiple class="file-input" name="imagefile"
                                   type="file" accept="image/png, image/jpeg">
                            <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose max. 10 files…
            </span>
          </span>
                            <span class="file-name">{fileName}</span>
                        </label>
                        <button type="submit" class="button is-info">Upload</button>
                    </div>
                </form>
                <form on:submit|preventDefault={deleteImages}>
                    <div class="card-footer">
                        <button type="submit" class="button is-danger">
                <span class="icon">
                    <i class="fas fa-trash"></i>
                </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>