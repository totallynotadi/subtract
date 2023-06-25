<script>
  import Favorite from "svelte-material-icons/Heart.svelte";
  import DotsHorizontal from "svelte-material-icons/DotsHorizontal.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let trackData = {};
  export let index = 0;

  const formatDuration = (durationSeconds) => {
    let minutes = Math.floor(durationSeconds / 60);
    let seconds = durationSeconds - minutes * 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const dispatchPlayEvent = () => {
    dispatch("play", {
      track: trackData,
    });
  };
</script>

<div
  class="item-container row"
  on:click={dispatchPlayEvent}
  on:keydown={() => {}}
  on:keyup={() => {}}
>
  <div class="left-align-data row">
    <div class="track-number">{index}</div>
    <div
      class="image-container"
      style="--image-url:url('{trackData.track.album.images[1].url}')"
    />
    <div class="track-details column">
      <div class="track-title">{trackData.track.name}</div>
      <div class="track-artists">{trackData.track.artists[0].name}</div>
    </div>
  </div>
  <div class="right-align-data row">
    <div class="icon">
      <Favorite size="24px" />
    </div>
    <div class="track-duration">
      {formatDuration(Math.round(trackData.track.duration_ms / 1000))}
    </div>
    <div class="icon">
      <DotsHorizontal size="24px" />
    </div>
  </div>
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .image-container {
    width: 3.8rem;
    height: 3.8rem;
    aspect-ratio: 1 / 1;
    background-image: var(--image-url);
    background-position: center center;
    background-size: cover;
    border-radius: 4px;
  }
  .item-container {
    width: 100%;
    height: max-content;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1.4rem 0.8rem 1.4rem;
    gap: 2rem;
    border-radius: 12px;
    transition: background-color 0.1s ease-in-out;
  }
  @media (max-width: 824px) {
    .item-container {
      width: 100%;
      height: max-content;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 0.4rem 0.8rem 0.8rem;
      gap: 2rem;
      border-radius: 12px;
      transition: all 0.1s ease-in-out;
    }
  }
  .left-align-data,
  .right-align-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
  }
  /* .left-align-data {
    width: 100%;
    justify-content: flex-start;
  } */
  .right-align-data {
    min-width: 8.4rem;
  }
  .track-details {
    gap: 6px;
  }
  .track-title,
  .track-artists {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    text-decoration: none;
    overflow: hidden;
  }
  .track-title {
    font-size: 15px;
    font-weight: bold;
    color: white;
  }
  .track-artists {
    font-size: 13px;
  }
  .track-number,
  .track-duration {
    font-size: 14px;
    /* color: white; */
    font-weight: 500;
  }
  .track-number {
    min-width: 2rem;
  }
  .icon {
    opacity: 0;
  }
  .item-container:hover .icon {
    opacity: 1;
  }
  .item-container:hover {
    background-color: #2a2a2a;
    outline: 2px solid #373737;
  }
</style>
