<script>
  export let columnCount = 2;
  export let columnGap = 12;

  import { Router, Route, Link } from "svelte-navigator";
  import Section from "../components/Section.svelte";
  import SectionPage from "./SectionPage.svelte";
</script>

<Router>
  <Route>
    <div class="container">
      <!-- {#each new Array(2).fill("_") as section}
        <Section sectionId={"dinesh"} bind:columnCount bind:columnGap />
      {/each} -->
      <Section sectionId={"d-nesh"} bind:columnCount bind:columnGap />
      <Section sectionId={"ga-nesh"} bind:columnCount bind:columnGap />
      <Section sectionId={"ma-ngesh"} bind:columnCount bind:columnGap />
    </div>
  </Route>
  <!-- <Route path="section/*sectionId">
    <SectionPage bind:columnCount bind:columnGap />
  </Route> -->
  <Route path="section/*sectionId" let:params>
    <SectionPage bind:columnCount bind:columnGap sectionId={params.sectionId} />
  </Route>
</Router>

<style>
  .container {
    width: 100%;
    height: 100%;
    overflow: auto;
    scroll-behavior: smooth;
    scrollbar-color: transparent transparent;
  }
  .container::-webkit-scrollbar {
    display: none;
  }
</style>
