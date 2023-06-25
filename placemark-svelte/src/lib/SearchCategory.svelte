<script lang="ts">
    let categoryList = ["Landscape-Feature", "National-monument", "Island", "Town", "City",
        "Forest", "River", "Bridge", "Entertainment-Venue", "Archaeological-Feature", "Wonder-of-the-World","Others"];
</script>

<div class="dropdown is-hoverable">
    <div class="dropdown-trigger">
        <button class="button is-small" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Select</span>
            <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
        </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
            {#each categoryList as category}
                <a class="dropdown-item" href="/category/{category}">{category}</a>
            {/each}
        </div>
    </div>
</div>
