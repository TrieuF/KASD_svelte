<script>
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
</script>

<div class="columns">
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map" layer=""/>
        </div>
    </div>
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map2" layer="Satellite"/>
        </div>
    </div>
</div>
<div class="columns">
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map3" layer="Temperature"/>
        </div>
    </div>
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map4" layer="Rain"/>
        </div>
    </div>
</div>


