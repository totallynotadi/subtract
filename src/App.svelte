<script>
  // @ts-nocheck

  import Home from "svelte-material-icons/Home.svelte";
  import User from "svelte-material-icons/Account.svelte";
  import Search from "svelte-material-icons/Magnify.svelte";
  import Favorite from "svelte-material-icons/Heart.svelte";
  import Previous from "svelte-material-icons/SkipPrevious.svelte";
  import Play from "svelte-material-icons/PlayCircle.svelte";
  import Pause from "svelte-material-icons/PauseCircle.svelte";
  import Next from "svelte-material-icons/SkipNext.svelte";
  import Shuffle from "svelte-material-icons/Shuffle.svelte";
  import Repeat from "svelte-material-icons/Repeat.svelte";

  import MusicBoxMultiple from "svelte-material-icons/MusicBoxMultiple.svelte";
  import Bookshelf from "svelte-material-icons/Bookshelf.svelte";
  import Compass from "svelte-material-icons/Compass.svelte";
  import AccessPoint from "svelte-material-icons/AccessPoint.svelte";
  import PlusBoxMultiple from "svelte-material-icons/PlusBoxMultiple.svelte";

  // import { Slider } from "fluent-svelte";
  import Slider from "./lib/components/Slider/Slider.svelte";
  import "fluent-svelte/theme.css";

  import logo from "./assets/Subtract.png";
  import IconContainer from "./lib/components/IconContainer.svelte";
  import SidebarMenuItem from "./lib/components/SidebarMenuItem.svelte";

  import { Router, Route, Link } from "svelte-navigator";

  import HomeScreen from "./lib/pages/HomeScreen.svelte";
  import LibraryScreen from "./lib/pages/LibraryScreen.svelte";
  import DiscoverPage from "./lib/pages/DiscoverPage.svelte";
  import CreatePlaylistPage from "./lib/pages/CreatePlaylistPage.svelte";

  import { currentPath } from "./lib/stores.js";
  import { onDestroy, onMount } from "svelte";
  import { globalHistory } from "svelte-navigator/src/history";

  let unsub;

  onMount(() => {
    unsub = globalHistory.listen(({ location, action }) => {
      console.log(location, action);
      $currentPath = location.pathname;
    });
  });

  onDestroy(() => {
    unsub();
  });

  let seekBarTrackColorNeedsSet = true;
  let seekBarThumbColorNeedsSet = true;

  let seekBarTrackElement = null;
  let seekBarInputElement = null;
  let seekBarThumbElement = null;
  let seekBarContainerElement = null;

  let seekBarValue = 20;

  let playerState = true;

  $: {
    console.log(seekBarValue);

    if (seekBarTrackColorNeedsSet && seekBarTrackElement != null) {
      seekBarTrackElement.style.backgroundColor = "#cacaca";
      seekBarTrackColorNeedsSet = !seekBarTrackColorNeedsSet;
    }
    if (seekBarThumbColorNeedsSet && seekBarThumbElement != null) {
      seekBarThumbElement.style.backgroundColor = "#cacaca";
      seekBarThumbElement.style.blockSize = "10px";
      seekBarThumbElement.style.inlineSize = "10px";

      seekBarThumbElement.style.opacity = "0";
      seekBarThumbElement.style.transition =
        "opacity 0.1s cubic-bezier(0.42, 0, 0.58, 1)";

      seekBarContainerElement.onmouseover = function (e) {
        seekBarThumbElement.style.opacity = "1";
      };
      seekBarContainerElement.onmouseleave = function (e) {
        seekBarThumbElement.style.opacity = "0";
      };

      console.log(seekBarThumbElement);
      seekBarThumbColorNeedsSet = !seekBarThumbColorNeedsSet;
    }
  }
  const wait = () => new Promise((res) => setTimeout(res, 0 * 1000));

  let boxWidth = window.innerWidth - 32;
  $: boxWidth = boxWidth - 32;
  $: boxWidth = boxWidth - 20;
  let columnGap = 20;
  $: columnCount = Math.round(boxWidth / 220);
  $: gapBlocks = columnGap * (columnCount - 1);
  $: columnWidth = Math.round((boxWidth - gapBlocks) / columnCount) - 1;
</script>

{#await wait()}
  <div class="scaffold">loading...</div>
{:then data}
  <Router primary={false}>
    <div class="scaffold">
      <div class="column">
        <div class="h-top-bar w-100">
          <div class="row" style="max-height:calc(100vh - 5rem);">
            <img
              src={logo}
              alt="S U B T R A C T"
              style="width:2.8rem; filter: drop-shadow(0 0 0.6rem grey);"
            />
            <div class="flex-container home-search-container">
              <Link to="/">
                <IconContainer
                  icon={Home}
                  containerSize="3.2rem"
                  iconSize="1.6rem"
                  color="#aaaaaa"
                />
              </Link>
              <div
                class="search-bar-container icon-circle"
                style="border-radius:3rem;"
              >
                <Search size="1.6rem" color="#aaaaaa" />
                <input
                  type="search"
                  placeholder="What would you listen to today?"
                  name="search-field"
                  id="search-field"
                />
              </div>
            </div>
            <div>
              <IconContainer
                icon={User}
                containerSize="3.2rem"
                iconSize="1.6rem"
                color="#aaaaaa"
              />
            </div>
          </div>
        </div>
        <div class="row" style="max-height:calc(100vh - 5.2rem);">
          <div class="column box-1">
            <div
              class="container border-rad icon-box-circle"
              style="min-height:170px"
            >
              <ul class="sidebar-options">
                <li>
                  <SidebarMenuItem
                    itemTitle={"Library"}
                    linkTo={"library"}
                    icon={MusicBoxMultiple}
                  />
                </li>
                <li>
                  <SidebarMenuItem
                    itemTitle={"Discover"}
                    linkTo={"discover"}
                    icon={AccessPoint}
                  />
                </li>
                <li>
                  <SidebarMenuItem
                    itemTitle={"Create Playlist"}
                    linkTo={"create-playlist"}
                    icon={PlusBoxMultiple}
                  />
                </li>
              </ul>
            </div>
            <div
              class="container border-rad icon-box-circle stack"
              style="overflow: hidden; height:fit-content; flex: 0 0 fit-content"
            >
              <img
                src="https://i.scdn.co/image/ab67616d0000b273f6ace12946d9796dc0cdd533"
                width="210"
                height="210"
                alt="L M A O"
                class="cover-art stack-item image-beneath"
                defer
              />
              <div class="stack-item column player-card">
                <img
                  src="https://i.scdn.co/image/ab67616d0000b273f6ace12946d9796dc0cdd533"
                  width="210"
                  height="210"
                  alt="L M A O"
                  class="cover-art"
                  defer
                />
                <div class="track-details">
                  <div class="track-artist-title">
                    <div class="track-title">Sacrifice</div>
                    <div class="track-artists">Alex, Tokyo Rose, The Akuma</div>
                  </div>
                  <div style="height: 1.2rem; width: 1.2rem;">
                    <Favorite size="1.2rem" color="rgb(255, 255, 0)" />
                  </div>
                </div>
                <div
                  class="seek-bar-container"
                  bind:this={seekBarContainerElement}
                >
                  <div class="controls-container">
                    <Shuffle size="1.4rem" color="#aaaaaa" />
                    <Previous size="1.8rem" color="#aaaaaa" />
                    {#if playerState}
                      <Play size="2.4rem" color="#aaaaaa" />
                    {:else}
                      <Pause size="2.4rem" color="#aaaaaa" />;
                    {/if}
                    <Next size="1.8rem" color="#aaaaaa" />
                    <Repeat size="1.4rem" color="#aaaaaa" />
                  </div>
                  <Slider
                    tooltip={false}
                    bind:trackElement={seekBarTrackElement}
                    bind:inputElement={seekBarInputElement}
                    bind:thumbElement={seekBarThumbElement}
                    bind:value={seekBarValue}
                  />
                  <div class="timestamp-container">
                    <div class="timestamp">1:34</div>
                    <div class="timestamp">4:25</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="box-2 container border-rad icon-box-circle"
            bind:clientWidth={boxWidth}
          >
            <Route>
              <HomeScreen bind:columnCount bind:columnGap bind:columnWidth />
            </Route>
            <Route path="library">
              <LibraryScreen />
            </Route>
            <Route path="discover">
              <DiscoverPage />
            </Route>
            <Route path="create-playlist">
              <CreatePlaylistPage />
            </Route>
          </div>
          <div id="box-3" class="box-3 container border-rad icon-box-circle">
            <button
              style="border:none; background-color:rgba(50, 50, 50, 0.5); border-radius:50%; width:2rem; height:2rem;"
              on:click={function () {
                let sidebar = document.getElementById("box-3");
                sidebar.style.flexBasis =
                  sidebar.style.flexBasis == "70px" ? "240px" : "70px";
              }}
            >
              ←
            </button>
          </div>
        </div>
      </div>
    </div>
  </Router>
{/await}

<style>
  ul,
  li {
    padding: 0px;
    margin: 0px;
    list-style: none;
  }

  .scaffold {
    height: 100vh;
    width: 100vw;
    display: flex;
    padding: 0.7rem;
  }

  .column {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 0.7rem;
  }

  .row {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.7rem;
  }

  .container {
    width: 100%;
    height: 100%;
    /* outline: 2px solid grey; */
  }

  .h-top-bar {
    margin-top: 1px;
    height: 3rem;
  }
  .w-100 {
    width: 100%;
  }
  .flex-container {
    display: flex;
    align-items: center;
  }
  .home-search-container {
    gap: 1rem;
    width: 30%;
    min-width: 30rem;
  }
  .search-bar-container {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    width: 100%;
    height: 3.2rem;
    border-radius: 1rem;
    padding: 1rem;
  }
  #search-field {
    width: 100%;
    appearance: none;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 1rem;
  }
  .border-rad {
    border-radius: 1rem;
  }
  .box-1 {
    flex-basis: 300px;
    flex-grow: 0.4;
    flex-shrink: 0.5;
    min-width: 264px;
    /* min-width: 16vw; */
    max-width: 14vw;
  }
  .box-2 {
    flex-basis: 800px;
    flex-grow: 4;
    flex-shrink: 1;
    width: 100%;
    min-width: 400px;
    padding: 16px;
  }
  .box-3 {
    /* max-width: 300px; */
    /* flex-basis: 270px; */
    flex-basis: 70px;
    /* flex-grow: 4; */
    flex-shrink: 0;
    min-width: 5rem; /* aka 75px */
    height: 100%;
    transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);
  }
  .player-card {
    /* justify-content: space-between; */
    padding: 1rem 1rem;
    border-radius: 1rem;
    /* background-image: linear-gradient(135deg, #b75fae, 40%, rgb(20, 20, 20)); */
    /* background-image: linear-gradient(135deg, #884882, 48%, transparent); */
    background-color: rgba(40, 40, 40, 0.6);
    /* background-color: transparent; */
    backdrop-filter: blur(60px) saturate(200%);
    gap: 1.4rem;
  }
  .cover-art {
    min-width: 210px;
    width: 100%;
    height: 100%;
    /* min-height: 210px; */
    /* width: 70%; */
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    animation: fade-in 2s cubic-bezier(0.42, 0, 0.58, 1);
    box-shadow: 0px 4px 20px 4px rgba(0, 0, 0, 0.25);
  }
  .track-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 96%;
    flex-shrink: 2;
    /* margin-top: -4rem; */
  }
  .track-artist-title {
    width: calc(100% - 2rem);
    gap: 0.4rem;
    flex-flow: column;
    display: flex;
  }
  .track-title {
    font-weight: bold;
    letter-spacing: 0.4px;
    font-size: 18px;
    width: 100%;
    overflow: hidden;

    -webkit-mask-image: linear-gradient(to right, black, transparent);
    mask-image: linear-gradient(to right, black 80%, transparent);
  }
  .track-artists {
    letter-spacing: 0.4px;
    color: #a6a6a6;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;

    -webkit-mask-image: linear-gradient(to right, black, transparent);
    mask-image: linear-gradient(to right, black 80%, transparent);
  }
  .seek-bar-container {
    width: 100%;
    padding: 0px 0px;
    margin-top: -4px;
  }
  .timestamp-container {
    display: flex;
    justify-content: space-between;
    margin-top: -6px;
    margin-bottom: 2px;
  }
  .timestamp {
    font-size: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    /* color: #909090; */
    color: rgb(153, 153, 153);
  }
  .controls-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .sidebar-options {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    margin-top: -9px;
  }
  .sidebar-options > li {
    padding: 0.6rem 0rem;
  }
  .image-beneath {
    height: 70%;
    width: 88%;
    filter: blur(260px) saturate(200%) brightness(1.5);
    /* transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1); */
    left: 4rem;
  }
</style>
