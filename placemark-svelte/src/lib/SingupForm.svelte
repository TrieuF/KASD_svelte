<script lang="ts">
    import { goto } from "$app/navigation";
    import { placemarkService } from "../services/placemark-service.js";

    let firstname = "";
    let lastname = "";
    let email = "";
    let password = "";
    let errorMessage = "";

    async function signup() {
        let success = await placemarkService.signup(firstname, lastname, email, password);
        if (success) {
            goto("/");
        } else {
            errorMessage = "Error Trying to sign up";
        }
    }
</script>

<section class="section">
    <form on:submit|preventDefault={signup}>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field">
                    <label class="label" for="firstName">First Name</label>
                    <input bind:value={firstname} class="input" type="text" placeholder="Enter first name" name="firstName" id="firstName">
                </div>
                <div class="field">
                    <label class="label" for="lastName">Last Name</label>
                    <input bind:value={lastname} class="input" type="text" placeholder="Enter last name" name="lastName" id="lastName">
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label" for="email">Email</label>
            <p class="control has-icons-left">
                <input bind:value={email} class="input" type="text" placeholder="Enter email" name="email" id="email">
                <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <label class="label" for="password">Password</label>
            <p class="control has-icons-left">
                <input bind:value={password} class="input" type="password" placeholder="Enter Password" name="password" id="password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field is-grouped">
            <button class="button is-link">Submit</button>
        </div>
    </form>
</section>

{#if errorMessage}
    <div class="section">
        {errorMessage}
    </div>
{/if}
