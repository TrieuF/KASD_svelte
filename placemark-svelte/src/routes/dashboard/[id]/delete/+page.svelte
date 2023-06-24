<script lang="ts">
    import {onMount} from "svelte";

    export let data;
    import { goto } from "$app/navigation";
    import { placemarkService} from "../../../../services/placemark-service";

    onMount(async() =>{
        await placemarkService.deletePlacemark(data.placemarkid)
        await goto("/dashboard");
    })
</script>