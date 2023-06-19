<script>
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
    import {onMount} from "svelte";

    export let data;
    var conditions = {current: {weather: [{main:0}], temp: 0}};
    const apiKey= import.meta.env.VITE_openweatherapi;
    onMount(async () => {const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.placemark.location.lat}&lon=${data.placemark.location.lng}&units=metric&appid=${apiKey}`;
    await fetch(requestUrl, {
        mode: 'cors'
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            conditions = data;});
    });
</script>

<Header>
    <MainMenu/>
</Header>

<section class="section columns is-vcentered">
    <div class="column">
        <div class="name title">
            {data.placemark.name}
        </div>
        <div>
            <div>
                <p class="title is-5">Description: </p>
                <p class="subtitle is-6">{data.placemark.description}</p>
            </div>
            <div>
                <p class="title is-5">Latitude: </p>
                <p class="subtitle is-6">{data.placemark.location.lat}</p>
            </div>
            <div>
                <p class="title is-5">Longitude: </p>
                <p class="subtitle is-6">{data.placemark.location.lng}</p>
            </div>
            <div>
                <p class="title is-5">Category: </p>
                <p class="subtitle is-6">{data.placemark.category}</p>
            </div>
            <div>
                <p class="title is-5">Weather: </p>
                <p class="subtitle is-6">{conditions.current.weather[0].main}</p>
            </div>
            <div>
                <p class="title is-5">Temperature: </p>
                <p class="subtitle is-6">{conditions.current.temp} °C</p>
            </div>
        </div>
    </div>
    <div class="column">
        <div class="card">
            {#each data.placemark.img as img}
                <div class="card-image">
                    <figure class="image is-256x256">
                        <img src={img} alt="">
                    </figure>
                </div>
            {/each}
        </div>
    </div>
</section>






