<script lang="ts">
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import Query from "$lib/Query.svelte";
    import SearchCategory from "$lib/SearchCategory.svelte";
</script>

<Header>
    <MainMenu/>
</Header>

<section class="section">
    <div class="columns is-vcentered ">
        <div class="column">
            <PlacemarkMap mapname="placemark-map" layer=""/>
        </div>
        <div class="column">
            <Query/>
            <div class="buttons are-large">
                <div class="buttons are-large">
                    <a class="button is-fullwidth is-danger" href="/maps">Maps</a>
                    <a class="button is-fullwidth is-primary" href="/analytics">Analytics</a>
                    <a class="button is-fullwidth is-info" href="/addplacemark">Add Placemark</a>
                    <a class="button is-fullwidth is-warning" href="/imagegallery">Image Gallery</a>
                </div>
            </div>
            <SearchCategory/>
        </div>
    </div>
</section>
