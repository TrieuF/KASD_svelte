<script>
    import Header from "$lib/Header.svelte";
    import MainMenu from "$lib/MainMenu.svelte";
    import {charttype} from "../../store.js";
    import {goto} from "$app/navigation";

    let charttypes = [{name: "Bar", value: "bar"}, {name: "Pie", value: "pie"}, {name:"Line", value:"line"}, {name:"Percentage", value:"percentage"}];
    let selectedchart = "";

    async function selecttype() {
        $charttype = selectedchart;
        goto("/charts");
    }
</script>

<Header>
    <MainMenu/>
</Header>


<form on:submit|preventDefault={selecttype}>
    <div class="columns">
        <div class="column has-text-centered">
            <label for="charttype" class="title is-5">Charttype:</label>
            <div class="select">
                <select bind:value={selectedchart} id="charttype">
                    {#each charttypes as chart}
                        <option value={chart.value}>{chart.name}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="column">
            <div class="field">
                <div class="control">
                    <button class="button is-link is-light">Select this type</button>
                </div>
            </div>
        </div>
    </div>
</form>