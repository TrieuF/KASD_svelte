<script>
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";

    export let data;
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
        </div>
    </div>
    <div class="column">
        <div class="card">
            <div class="card-image">
                <figure class="image is-256x256">
                    <img src={data.placemark.img} alt="">
                </figure>
            </div>
        </div>
    </div>
</section>






