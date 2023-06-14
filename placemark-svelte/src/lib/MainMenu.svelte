<script>
    import { user } from "../store";
</script>

<nav class="navbar" aria-label="dropdown navigation">
    <div class="navbar-menu">
        <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
                <div class="navbar-item">
                    <a id="dashboard" class="button navbar-link" href="/dashboard"> Dashboard </a>
                </div>

                <div class="navbar-dropdown">
                    <div class="navbar-item">
                        <a class="button is-fullwidth" id="overview" href="/maps">Maps</a>
                    </div>
                    <div class="navbar-item">
                        <a class="button is-fullwidth" id="analytic" href="/analytics">Analytics</a>
                    </div>
                    <div class="navbar-item">
                        <a id="logout" class="button is-link" href="/logout">Logout</a>
                    </div>
                    <hr class="narbar-divider">
                    <div class="navbar-item">
                        {#if $user.email}
                            <div class="is-size-7">{$user.email}</div>
                        {:else}
                            <div class="is-size-7">KASD_Svelte</div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>