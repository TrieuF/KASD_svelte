<script>
    import Header from '$lib/Header.svelte';
    import WelcomeMenu from "$lib/WelcomeMenu.svelte";
</script>

<Header>
    <WelcomeMenu/>
</Header>

<div class="columns">
    <div class="column">
        <div class="box">
            <div class="notification is-dark">
                Hello from ME!
            </div>
        </div>
    </div>
    <div class="column has-text-centered">
        <img alt="" src="/istock.jpeg" width="300" />
    </div>
</div>

