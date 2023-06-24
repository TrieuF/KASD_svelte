<script lang="ts">
    import { placemarkService } from "../services/placemark-service.js";
    import { user} from "../store.ts";

    let name = "";
    let description = "";
    let longitude = 0;
    let latitude = 0;

    let categoryList = ["Landscape-Feature", "National-monument", "Island", "Town", "City",
        "Forest", "River", "Bridge", "Entertainment-Venue", "Archaeological-Feature", "Others"];
    let selectedCategory = "";

    let message = "Add a Placemark";
    async function addPlacemark() {
        if (name && selectedCategory && $user?.id) {
            const placemarktoadd = {
                name: name,
                description: description,
                location: {
                    lat: latitude,
                    lng: longitude,
                },
                category: selectedCategory,
            }
            const success= await placemarkService.addPlacemark($user.id, placemarktoadd);
            if (!success) {
                message = "Adding not completed - some error occurred";
                return;
            }
            message = "You added a Placemark";
        } else {
            message = "Please select name, location and category OR Login";
        }
    }
</script>

<form on:submit|preventDefault={addPlacemark}>
    <div class="field">
        <label class="label" for="name">Enter Name</label>
        <input bind:value={name} class="input" id="name" name="name" type="text" />
    </div>
    <div class="field">
        <label class="label" for="description">Description:</label>
        <input bind:value={description} class="input" id="description" name="description" type="text" />
    </div>
    <div class="field">
        <label class="label" for="latitude">Latitude:</label>
        <input bind:value={latitude} class="input" id="latitude" name="latitude" type="number" step="0.00001" min="-90" max="90" />
    </div>
    <div class="field">
        <label class="label" for="longitude">Longitude:</label>
        <input bind:value={longitude} class="input" id="longitude" name="longitude" type="number" step="0.00001" min="-180" max="180" />
    </div>
    <div class="field">
        <div class="select">
            <select bind:value={selectedCategory}>
                {#each categoryList as category}
                    <option>{category}</option>
                {/each}
            </select>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Add Placemark</button>
        </div>
    </div>
    <div class="box">
        {message}
    </div>
</form>
