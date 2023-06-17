<script>
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
    import {placemarkService} from "../../services/placemark-service.js";
    import {onMount} from "svelte";
    let images= [];

    onMount(async () => {
    images = await placemarkService.getAllImages();
    });
</script>

<Header>
    <MainMenu/>
</Header>

{#each images as image}
    <img src={image.secure_url} alt="" width="500" height="600">
{/each}