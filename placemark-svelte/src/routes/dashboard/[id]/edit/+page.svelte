<script lang="ts">
    import {onMount} from "svelte";
    import {placemarkService} from "../../../../services/placemark-service";
    import {user} from "../../../../store";
    import {goto} from "$app/navigation";

    export let data;
    let placemark = {
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

    onMount(async () => {
        placemark = await placemarkService.getPlacemark(data.placemarkid);
    })

    let categoryList = ["Landscape-Feature", "National-monument", "Island", "Town", "City",
        "Forest", "River", "Bridge", "Entertainment-Venue", "Archaeological-Feature", "Others"];

    let message = "Edit Placemark";

    async function editPlacemark() {
        if (placemark.name && placemark.category && $user?.id) {
            const placemarkchanged = {
                name: placemark.name,
                description: placemark.description,
                location: {
                    lat: placemark.location.lat,
                    lng: placemark.location.lng,
                },
                category: placemark.category,
            }
            const success = await placemarkService.editPlacemark(data.placemarkid, placemarkchanged);
            if (!success) {
                message = "You aren't the creator or a admins";
                return;
            }
            message = "You edited a Placemark";
            goto("/dashboard/"+data.placemarkid)
        } else {
            message = "Please select name, location and category";
        }
    }
</script>

<form on:submit|preventDefault={editPlacemark}>
    <div class="field">
        <label class="label" for="name">Enter Name</label>
        <input bind:value={placemark.name} class="input" id="name" name="name" type="text"/>
    </div>
    <div class="field">
        <label class="label" for="description">Description:</label>
        <input bind:value={placemark.description} class="input" id="description" name="description" type="text"/>
    </div>
    <div class="field">
        <label class="label" for="latitude">Latitude:</label>
        <input bind:value={placemark.location.lat} class="input" id="latitude" name="latitude" type="number" step="0.00001" min="-90"
               max="90"/>
    </div>
    <div class="field">
        <label class="label" for="longitude">Longitude:</label>
        <input bind:value={placemark.location.lng} class="input" id="longitude" name="longitude" type="number" step="0.00001"
               min="-180" max="180"/>
    </div>
    <div class="field">
        <div class="select">
            <select bind:value={placemark.category}>
                {#each categoryList as category}
                    <option>{category}</option>
                {/each}
            </select>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Change Placemark</button>
        </div>
    </div>
    <div class="box">
        {message}
    </div>
</form>