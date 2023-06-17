<script>
    import { beforeUpdate } from "svelte";
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
    import { placemarkService } from "../../services/placemark-service";
    import MultipleMaps from "$lib/MultipleMaps.svelte";

    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<Header>
    <MainMenu/>
</Header>

<MultipleMaps/>

