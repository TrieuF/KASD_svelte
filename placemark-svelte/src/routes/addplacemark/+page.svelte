<script>
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
    import { beforeUpdate } from "svelte";
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import { placemarkService } from "../../services/placemark-service";
    import AddPlacemarkForm from "$lib/AddPlacemarkForm.svelte";

    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<Header>
    <MainMenu/>
</Header>

<div class="columns">
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map" layer=""/>
        </div>
    </div>
    <div class="column">
        <div class="box">
            <AddPlacemarkForm/>
        </div>
    </div>
</div>


