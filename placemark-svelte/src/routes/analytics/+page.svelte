<script>
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
    import {placemarkService} from "../../services/placemark-service.js";
    import {onMount} from "svelte";
    let analyticsdata = {};

    onMount(async () => {
         analyticsdata = await placemarkService.getAnalytics();
         console.log(analyticsdata)
    });
</script>

<Header>
    <MainMenu/>
</Header>