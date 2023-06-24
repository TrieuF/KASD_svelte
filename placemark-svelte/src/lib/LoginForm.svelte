<script lang="ts">
    import { goto } from "$app/navigation";
    import { placemarkService } from "../services/placemark-service.js";

    let email = "";
    let password = "";
    let errorMessage = "";

    async function login() {
        let success = await placemarkService.login(email, password);
        if (success) {
            goto("/dashboard");
        } else {
            email = "";
            password = "";
            errorMessage = "Invalid Credentials";
        }
    }
</script>


<section class="section">
    <form on:submit|preventDefault={login}>
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
            <button class="button is-success">Submit</button>
        </div>
    </form>
</section>

{#if errorMessage}
    <div class="section">
        {errorMessage}
    </div>
{/if}

