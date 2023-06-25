<script>
  export let columnCount = 2;
  export let columnGap = 12;
  export let columnWidth = 160;

  let sectionWidthLarge = columnWidth;
  $: sectionWidthLarge = columnWidth + 40;
  $: sectionDimensions = {
    columnCount: columnCount,
    columnGap: columnGap,
    columnWidth: columnWidth,
  };
  import { Router, Route, Link } from "svelte-navigator";
  import Section from "../components/Section.svelte";
  import PlaylistPage from "./PlaylistPage.svelte";
  import SectionPage from "./SectionPage.svelte";

  const getHomePage = (async () => {
    const data = await fetch(
      "https://spotify-endpoints.15adityagaikwad.repl.co/home"
    ).then((response) => response.json());
    console.log(data);
    console.log(data.sectionContainer.sections.items[3]);
    return data;
  })();
  const gotPlay = (event) => {
    console.log(event.detail.track);
  };
</script>

{#await getHomePage then data}
  <Router>
    <Route>
      <div class="container">
        <div class="home-page-welcome-text">
          {data.greeting.text}
        </div>
        <!-- {data.sectionContainer.sections.items.forEach((section) =>
          console.log(section)
        )} -->
        <!-- {console.log(data.sectionContainer.sections.items.slice(1))} -->
        <!-- {#each data.sectionContainer.sections.items.slice(1) as section} -->
        {#each data.sectionContainer.sections.items as section}
          {#if section.data.__typename !== "HomeShortsSectionData"}
            <Section bind:sectionData={section} {sectionDimensions} />
          {/if}
        {/each}
      </div>
    </Route>
    <Route path="section/*sectionId" let:params>
      <SectionPage
        bind:columnCount
        bind:columnGap
        sectionId={params.sectionId}
      />
    </Route>
    <Route path="playlist/*playlistId" let:params
      ><PlaylistPage playlistId={params.playlistId} on:play /></Route
    >
    <Route path="episode/*episodeId" let:params>episode</Route>
    <Route path="artist/*artistId" let:params>artist</Route>
    <Route path="album/*albumId" let:params>album</Route>
    <Route path="show/*showId" let:params>show</Route>
  </Router>
{/await}

<style>
  .container {
    width: 100%;
    height: 100.2%;
    overflow: scroll;
  }
  .home-page-welcome-text {
    width: 100%;
    padding: 0rem calc(1rem + 10px);
    text-align: left;

    font-size: 2rem;
    color: white;
    text-transform: capitalize;
    font-weight: bold;

    margin-top: 1rem;
    margin-bottom: 2rem;
  }
</style>
