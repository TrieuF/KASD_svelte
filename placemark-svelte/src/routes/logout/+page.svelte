<script lang="ts">
    import { goto } from "$app/navigation";
    import { placemarkService } from "../../services/placemark-service.js";

    placemarkService.logout();
    goto("/");
</script>
