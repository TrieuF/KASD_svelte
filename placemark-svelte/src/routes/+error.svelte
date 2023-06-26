<script>
    import { page } from '$app/stores';
    import MainMenu from "$lib/MainMenu.svelte";
    import Header from "$lib/Header.svelte";
</script>

<Header>
    <MainMenu/>
</Header>

<h1>Sorry, an error ocurred</h1>
<h1>{$page.status} {$page.error.message}</h1>