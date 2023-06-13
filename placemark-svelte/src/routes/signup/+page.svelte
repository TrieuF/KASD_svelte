<script>
  import Header from '$lib/Header.svelte';
  import SignupForm from "$lib/SingupForm.svelte";
  import WelcomeMenu from "$lib/WelcomeMenu.svelte";
</script>

<Header>
  <WelcomeMenu/>
</Header>

<div class="columns">
  <div class="column">
    <div class="box">
      <h1 class="title">Sign up</h1>
      <SignupForm />
    </div>
  </div>
  <div class="column has-text-centered">
    <img alt="" src="/istock.jpeg" width="300" />
  </div>
</div>
