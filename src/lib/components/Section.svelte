<script>
  import { Router, Route, Link } from "svelte-navigator";
  import SectionPage from "../pages/SectionPage.svelte";
  import Card from "./Card.svelte";

  // export let sectionId = "";
  export let sectionData = {};
  export let sectionDimensions = {};
  // $: sectionData = () => {return {}}()

  // export let columnCount = 2;
  // export let columnGap = 12;
  // export let columnWidth = 195;
</script>

<Router>
  <Route>
    <div class="section">
      <div class="row section-header">
        <div class="title">
          {sectionData.data.title.text}
        </div>
        <div class="section-expand">
          <Link
            to="section/{sectionData.uri.split(':')[2]}"
            style="text-decoration:none;color:white">SEE ALL</Link
          >
        </div>
      </div>
      <!-- <div
        class="grid"
        style="--column-count:{columnCount};--column-gap:{columnGap}px"
      >
        {#each new Array(columnCount).fill("_") as card}
          <Card />
        {/each}
      </div> -->
      <div
        class="row-container"
        style="--column-gap:{sectionDimensions.columnGap}px"
      >
        <div class="row-itself">
          <!-- {#each sectionData.sectionItems.items.slice(0, sectionDimensions.columnCount) as card, cardIndex} -->
          {#each sectionData.sectionItems.items as card}
            <!-- <Card /> -->
            <!-- <Card bind:prefferedWdith={columnWidth} />
            <Card bind:prefferedWdith={columnWidth} />
            <Card bind:prefferedWdith={columnWidth} />
            <Card bind:prefferedWdith={columnWidth} />
            <Card bind:prefferedWdith={columnWidth} /> -->
            {#if card.content.__typename !== "UnknownType"}
              <Card
                cardData={card}
                bind:prefferedWdith={sectionDimensions.columnWidth}
              />
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </Route>
  <Route path="playlist/*playlistId" let:params>dinesh</Route>
  <!-- <Route path="section/:id" let:params>
    <SectionPage sectionId={params.sectionId} />
  </Route> -->
</Router>

<style>
  .section {
    height: fit-content;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0px 10px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  /* .grid {
    display: grid;
    grid-gap: var(--column-gap);
    grid-template-columns: repeat(var(--column-count), minmax(0, 1fr));
    grid-auto-rows: 0;
    grid-template-rows: 1fr;
  } */
  .section-header {
    padding: 0px 1rem;
    margin-bottom: 0.4rem;
  }
  .title {
    font-size: 1.6rem;
    color: white;
    text-transform: capitalize;
    font-weight: bold;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .section-expand {
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--text-subdued);
    letter-spacing: 1px;
    white-space: nowrap;
  }
  .row-container {
    width: 100%;
    height: max-content;
    overflow: auto;
    padding: 1rem 2px;
  }
  .row-itself {
    display: flex;
    gap: 18px;
    overflow: visible;
  }
</style>
