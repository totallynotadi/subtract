<script>
  import Home from "svelte-material-icons/Home.svelte";
  import Favorite from "svelte-material-icons/Heart.svelte";
  import Next from "svelte-material-icons/SkipNext.svelte";
  import Previous from "svelte-material-icons/SkipPrevious.svelte";
  import Pause from "svelte-material-icons/PauseCircle.svelte";
  import Play from "svelte-material-icons/PlayCircle.svelte";
  import Search from "svelte-material-icons/Magnify.svelte";
  import User from "svelte-material-icons/Account.svelte";
  import logo from "./assets/Subtract.png";

  let playerState = false;
  let audio = null;

  let query;
  let searchResults = [];

  const searchCallback = (e) => {
    const searchBar = document.getElementById("search");
    console.log(query);
    // @ts-ignore
    if (!e.target.value) {
      searchResults = [];
    } else {
      searchAnime();
    }
  };

  const searchAnime = () => {
    const url = `https://api.jikan.moe/v4/anime?q=${query}`;
    searchResults.push("hello");
    console.log("searching");
  };

  const togglePlay = () => {
    playerState = !playerState;
    if (audio == null) {
      audio = new Audio(
        "https://rr3---sn-8vq54voxpo-pn3s.googlevideo.com/videoplayback?expire=1667673985&ei=IVtmY6W3DOihvdIP2p6e8AY&ip=106.66.29.230&id=o-AD_XaIu19nw0XCEZGGmEIPpI02ThHIbq1uf9KJl7LhHa&itag=251&source=youtube&requiressl=yes&mh=Lz&mm=31%2C29&mn=sn-8vq54voxpo-pn3s%2Csn-cvh7knsz&ms=au%2Crdu&mv=m&mvi=3&pl=27&gcr=in&initcwndbps=260000&vprv=1&mime=audio%2Fwebm&gir=yes&clen=4784914&dur=293.801&lmt=1582490143252844&mt=1667652049&fvip=2&keepalive=yes&fexp=24001373%2C24007246&c=ANDROID&txp=2311222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgfgFkTNd9vsefkqoZa6pkrV2v2CfzQVbxlXELtIlR24YCIQCmkrpyFZML5lZspENvZhx4vMh0D9c8PNj9SfeiutcSxQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgCAN9_08vJ4IhxskJo9rbOiN-STIHfhKuTUyj22Or33kCIQClgj9yR6Xqm1yBQJ__RkFScCVlSS-e3Wf6OVZVUGK6cA%3D%3D"
      );
      audio.play();
    } else {
      playerState ? audio.pause() : audio.play();
    }
  };
</script>

<div class="image-box" />
<div class="scaffold">
  <div class="column align-right">
    <div class="top-bar row" style="justify-content: space-between;">
      <div class="logo" style="margin-left:1rem; width: 8rem;">
        <img
          src={logo}
          alt="S U B T R A C T"
          style="height:3.2em;width:3.2rem;margin-top:2px;"
        />
      </div>
      <div class="home-search row">
        <!-- <div class="home-icon">◊</div> -->
        <Home size="1.6rem" color="#aaaaaa" />
        <div class="search-bar">
          <div class="row">
            <div style="pointer-events: none;">◯</div>
            <input
              type="text"
              id="search"
              placeholder="What do you want to listen to?"
              autocomplete="off"
              bind:value={query}
              on:input={searchCallback}
            />
          </div>
        </div>
      </div>
      <div class="logo" style="margin-right:1rem;">◊</div>
    </div>

    <div class="row">
      <div class="left-box container">
        {#if searchResults.length > 0}
          {searchResults[0]}
        {/if}
      </div>
      <div class="right-box container" />
    </div>

    <div class="row min-height">
      <div class="left-box container not-visible" />
      <div class="controls container">
        <div class="song-details">
          <div class="row" style="gap:2rem;">
            <div
              class="column track-details"
              style="font-family:sans-serif;align-items:start"
            >
              <div
                class="song-title"
                style="font-weight:bold;font-size:18px;color:grey"
              >
                Never Be Like You
              </div>
              <div
                class="artists-names"
                style="font-family:'FONTSPRING DEMO - Greycliff CF Demi Bold';16px;color:grey;"
              >
                Flume, Kai
              </div>
            </div>
            <Favorite size="1.6rem" color="rgb(255, 255, 0)" />
          </div>
        </div>
        <div class="player-controls">
          <div class="column" style="gap:1rem;">
            <div class="row" style="gap: 3rem;">
              <div id="prev">◊</div>
              <!-- <div id="play-pause">◊</div> -->
              {#if playerState}
                <button on:click={togglePlay}>
                  <Pause size="1.6rem" color="#aaaaaa" />
                </button>
              {:else}
                <button on:click={togglePlay}>
                  <Play size="1.6rem" color="#aaaaaa" />
                </button>
              {/if}
              <div id="next">◊</div>
            </div>
            <div class="divider" />
          </div>
        </div>
        <div class="misc-controls" style="margin-right:1rem;">◊</div>
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --min-left-box-width: 16rem;
    --max-left-box-width: 22rem;
  }

  * {
    box-sizing: border-box;
    font-family: "FONTSPRING DEMO - Greycliff CF";
    color: #cacaca;
  }

  .image-box {
    height: calc(30vw - 2rem);
    width: calc(30vw - 2rem);
    min-width: calc(var(--min-left-box-width) - 2rem);
    min-height: calc(var(--min-left-box-width) - 2rem);
    max-width: calc(var(--max-left-box-width) - 2rem);
    max-height: calc(var(--max-left-box-width) - 2rem);
    position: absolute;
    bottom: 1rem;
    left: 1.5rem;
    border-radius: 1rem;
    background-color: #1b1d1e;
  }

  .container {
    height: 100%;
    width: 100%;
    background-color: #0f0f0f;
    border-radius: 1rem;
  }

  .scaffold {
    height: calc(100vh - 1rem);
    width: calc(100vw - 1rem);
    min-width: 50rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .column {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
  }

  .row {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    align-content: flex-end;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
  }

  .controls {
    height: 6rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: transparent;
    align-self: center;
    justify-self: center;
  }

  .player-controls {
    margin-left: auto;
    margin-right: auto;
  }

  .align-right {
    align-items: end;
    justify-content: right;
  }

  .left-box {
    flex: 0 0 30vw;
    min-width: var(--min-left-box-width);
    max-width: var(--max-left-box-width);
  } /*sets right-box automaticall to size*/

  .min-height {
    height: min-content;
  }

  .not-visible {
    visibility: hidden;
  }

  .divider {
    width: 30vw;
    min-width: 16rem;
    background-color: grey;
    height: 4px;
    border-radius: 1rem;
  }

  .top-bar {
    margin-top: 2px;
    height: 4rem;
    width: 100%;
  }

  .search-bar {
    height: 92%;
    width: 34%;
    min-width: 24rem;

    margin-left: 2rem;
    border: 2px solid grey;
    color: #cacaca;
    border-radius: 4rem;
    padding: 0rem 1.4rem;
  }

  #search {
    height: 4rem;
    width: 100%;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    letter-spacing: 0.6px;
    font-size: 0.96rem;
    padding: 0px 8px;
    color: #cacaca;
  }

  .track-details {
    margin-right: 1rem;
  }
</style>
