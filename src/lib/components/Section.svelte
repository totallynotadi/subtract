<script>
  import { Router, Route, Link } from "svelte-navigator";
  import SectionPage from "../pages/SectionPage.svelte";
  import Card from "./Card.svelte";

  export let sectionId = "";
  export let columnCount = 2;
  export let columnGap = 12;
</script>

<Router>
  <Route>
    <div class="section">
      <div class="row section-header">
        <div class="title">
          {sectionId}
        </div>
        <div class="section-expand">
          <Link
            to="section/{sectionId}"
            style="text-decoration:none;color:white">SEE MORE</Link
          >
        </div>
      </div>
      <div
        class="grid"
        style="--column-count:{columnCount};--column-gap:{columnGap}px"
      >
        {#each new Array(columnCount).fill("_") as card}
          <Card />
        {/each}
      </div>
    </div>
  </Route>

  <!-- <Route path="section/:id" let:params>
    <SectionPage sectionId={params.sectionId} />
  </Route> -->
</Router>

<style>
  .section {
    height: fit-content;
    width: 100%;
    margin-bottom: 2rem;
    padding: 0px 10px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .grid {
    display: grid;
    grid-gap: var(--column-gap);
    grid-template-columns: repeat(var(--column-count), minmax(0, 1fr));
    grid-auto-rows: 0;
    grid-template-rows: 1fr;
  }
  .section-header {
    padding: 0px 1rem;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.6rem;
    color: white;
    text-transform: capitalize;
    font-weight: bold;
  }
  .section-expand {
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--text-subdued);
    letter-spacing: 1px;
  }
</style>
