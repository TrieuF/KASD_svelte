<script lang="ts">
    import {goto} from "$app/navigation";

    let name = "";

    async function searchName() {
        goto("/search/" + name);
    }
</script>

<form on:submit|preventDefault={searchName}>
    <input bind:value={name} class="input is-rounded is-small" id="name" name="name" type="text" placeholder="Name"/>
    <button class="button is-small is-link is-light">Search</button>
</form>