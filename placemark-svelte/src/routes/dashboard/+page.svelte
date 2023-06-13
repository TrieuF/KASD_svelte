<script>
    import {user} from "../../store.js";
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
</script>

<Header>
    <MainMenu/>
</Header>

<section class="section">
    <div class="columns is-vcentered ">
        <div class="column">
            <img alt="" src="/googlemaps.png" height="204" width="227">
        </div>
        <div class="column">
            <div class="buttons are-large">
                <div class="buttons are-large">
                    <a class="button is-fullwidth is-danger" href="/overview">Overview</a>
                    <a class="button is-fullwidth is-primary" href="/analytics">Analytics</a>
                    {#if $user.isAdmin}
                        <a class="button is-fullwidth is-info" href="/admin">Admin Dashboard</a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>
