<script lang="ts">
    // @ts-ignore
    import {placemarkService} from "../services/placemark-service.ts";
    import Chart from 'svelte-frappe-charts';
    import {onMount} from "svelte";
    import {charttype} from "../store.ts";

    let analyticsdata = {};
    onMount(async () => {
        analyticsdata = await placemarkService.getAnalytics();
        data2.datasets[0].values[0] = analyticsdata.userlength;
        data2.datasets[0].values[1] = analyticsdata.placemarklength;
        data.datasets[0].values[0] = analyticsdata.landscapelength;
        data.datasets[0].values[1] = analyticsdata.nationallength;
        data.datasets[0].values[2] = analyticsdata.islandlength;
        data.datasets[0].values[3] = analyticsdata.townlength;
        data.datasets[0].values[4] = analyticsdata.citylength;
        data.datasets[0].values[5] = analyticsdata.forestlength;
        data.datasets[0].values[6] = analyticsdata.riverlength;
        data.datasets[0].values[7] = analyticsdata.bridgelength;
        data.datasets[0].values[8] = analyticsdata.entertainmentlength;
        data.datasets[0].values[9] = analyticsdata.archaeologicallength;
        data.datasets[0].values[10] = analyticsdata.worldwonderlength;
        data.datasets[0].values[11] = analyticsdata.otherslength;
    });

    let data2 = {
        labels: ['Users','Placemarks'],
        datasets: [
            {
                values: [0, 0]
            }
        ]
    }

    let data = {
        labels: ["Landscape-Feature", "National-monument", "Island", "Town", "City",
            "Forest", "River", "Bridge", "Entertainment-Venue", "Archaeological-Feature", "Wonder-of-the-World", "Others"],
        datasets: [
            {
                values: [0,0,0,0,0,0,0,0,0,0,0,0]
            }
        ]
    };
</script>

<h1 class="title is-4">Total:</h1>
<Chart type={$charttype.selected} data={data2}/>
<h1 class="title is-4">Placemark distribution:</h1>
<Chart type={$charttype.selected} data={data}/>