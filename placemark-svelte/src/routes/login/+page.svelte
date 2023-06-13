<script>
  import Header from '$lib/Header.svelte';
  import LoginForm from "$lib/LoginForm.svelte";
  import WelcomeMenu from "$lib/WelcomeMenu.svelte";
</script>

<Header>
  <WelcomeMenu/>
</Header>

<div class="columns">
  <div class="column has-text-centered">
    <img alt="" src="/istock.jpeg" width="300" />
  </div>
  <div class="column">
    <div class="box">
      <h1 class="title">Login</h1>
      <LoginForm />
    </div>
  </div>
</div>