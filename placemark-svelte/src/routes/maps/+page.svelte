<script>
    import { beforeUpdate } from "svelte";
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import { placemarkService } from "../../services/placemark-service";

    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<Header>
    <MainMenu/>
</Header>

<PlacemarkMap/>

