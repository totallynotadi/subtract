<script>
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

  import { Slider } from "fluent-svelte";
  import "fluent-svelte/theme.css";

  import logo from "./assets/Subtract.png";
  import IconContainer from "./lib/IconContainer.svelte";

  let seekBarTrackColorNeedsSet = true;
  let seekBarThumbColorNeedsSet = true;

  let seekBarTrackElement = null;
  let seekBarInputElement = null;
  let seekBarThumbElement = null;
  let seekBarContainerElement = null;

  let seekBarValue = 0;

  let playerState = true;

  $: {
    console.log(seekBarValue);

    if (seekBarTrackColorNeedsSet && seekBarTrackElement != null) {
      seekBarTrackElement.style.backgroundColor = "#cacaca";
      seekBarTrackColorNeedsSet = !seekBarTrackColorNeedsSet;
    }
    if (seekBarThumbColorNeedsSet && seekBarThumbElement != null) {
      seekBarThumbElement.style.backgroundColor = "#cacaca";
      seekBarThumbElement.style.blockSize = "12px";
      seekBarThumbElement.style.inlineSize = "12px";

      seekBarThumbElement.style.opacity = "0";
      seekBarThumbElement.style.transition = "opacity 0.2s ease-in-out";

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
  const wait = () => new Promise((res) => setTimeout(res, 2 * 1000));
</script>

{#await wait()}
  <div class="scaffold">d</div>
{:then data}
  <div class="scaffold">
    <div class="column">
      <div class="h-top-bar w-100">
        <div class="row">
          <img src={logo} alt="S U B T R A C T" style="width:3rem" />
          <div class="flex-container home-search-container">
            <IconContainer icon={Home} size="3rem" color="#aaaaaa" />
            <div
              class="search-bar-container icon-circle"
              style="border-radius:3rem;"
            >
              <Search size="1.6rem" color="#aaaaaa" />
              <input
                type="search"
                placeholder="What do you wan to listen to?"
                name="search-field"
                id="search-field"
              />
            </div>
          </div>
          <div>
            <IconContainer icon={User} size="3rem" color="#aaaaaa" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column box-1">
          <div class="container border-rad icon-box-circle" />
          <div
            class="container border-rad icon-box-circle"
            style="background-color: #181a1b; background-image: none"
          >
            <div class="column player-card">
              <img
                src="https://i.scdn.co/image/ab67616d0000b2739db23262359f6744c28e9615"
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
        <div class="box-2 container border-rad icon-box-circle" />
        <div class="box-3 container border-rad icon-box-circle" />
      </div>
    </div>
  </div>
{/await}

<style>
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
    height: 3rem;
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
    min-width: 240px;
  }
  .box-2 {
    flex-basis: 800px;
    flex-grow: 4;
    flex-shrink: 1;
    min-width: 460px;
  }
  .box-3 {
    /* max-width: 300px; */
    flex-basis: 270px;
    flex-grow: 0;
    flex-shrink: 4;
    min-width: 5rem; /* aka 75px */
  }
  @media (max-width: 900px) {
    .box-3 {
      opacity: 0;
      display: none;
    }
  }
  .player-card {
    /* justify-content: space-between; */
    padding: 1.2rem;
    border-radius: 1rem;
    /* background-image: linear-gradient(135deg, #b75fae, 40%, rgb(20, 20, 20)); */
    background-image: linear-gradient(135deg, #b75fae, 48%, transparent);
    /* gap: 6rem; */
  }
  .player-card .img {
    height: 210px;
    width: 210px;
  }
  .cover-art {
    min-width: 210px;
    width: 70%;
    border-radius: 0.4rem;
    animation: fade-in 2s ease-in-out;
    box-shadow: 0px 4px 20px 4px rgba(0, 0, 0, 0.25);
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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
  }
  .slider-thumb {
    opacity: 0;
    animation: opacity 1s ease-in-out;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .seek-bar-container:hover + .slider-thumb {
    opacity: 1;
  }
  .timestamp-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .timestamp {
    font-size: 14px;
    font-weight: bold;
    color: #909090;
  }
  .controls-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>
