<script lang="ts">
    import {onMount} from "svelte";
    import {placemarkService} from "../../../services/placemark-service";
    import MainMenu from "$lib/MainMenu.svelte";
    import Header from "$lib/Header.svelte";
    import type {Placemarkreturned} from "../../../services/placemark-type";

    let placemarks:Placemarkreturned[]= [];
    export let data
    onMount(async () => {
        placemarks = await placemarkService.getAllPlacemarksByName(data.search);
    });
</script>

<Header>
    <MainMenu/>
</Header>


<table class="table is-fullwidth">
    <thead>
    <th>Name</th>
    <th>Description</th>
    <th>Latitude</th>
    <th>Longitude</th>
    <th>Category</th>
    <th></th>
    <th></th>
    </thead>
    <tbody>
    {#each placemarks as placemark}
        <tr>
            <td>
                {placemark.name}
            </td>
            <td>
                {placemark.description}
            </td>
            <td>
                {placemark.location.lat}
            </td>
            <td>
                {placemark.location.lng}
            </td>
            <td>
                {placemark.category}
            </td>
            <td>
                <a class='button' href="/dashboard/{placemark._id}">Details</a>
            </td>
            <td>
                <a class='button' href="/dashboard/{placemark._id}/delete"> <i class="fas fa-trash"></i></a>
            </td>
        </tr>
    {/each}
    </tbody>
</table>