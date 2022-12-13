<script>
  import PlaylistOwner from "../components/PlaylistOwner.svelte";
  import ActionButton from "./ActionButton.svelte";

  import Play from "svelte-material-icons/Play.svelte";
  import Shuffle from "svelte-material-icons/Shuffle.svelte";
  import Favorite from "svelte-material-icons/Heart.svelte";
  import Search from "svelte-material-icons/Magnify.svelte";
  import DotsHorizontal from "svelte-material-icons/DotsHorizontal.svelte";

  import IconContainer from "../components/IconContainer.svelte";
  import PlaylistTrackItem from "../components/PlaylistTrackItem.svelte";

  export let playlistId = "";

  let playlistImage;
  const getPlaylistPage = (async () => {
    const data = await fetch(
      `https://spotify-endpoints.15adityagaikwad.repl.co/playlist/${playlistId}`
    ).then((response) => response.json());
    console.log(data);
    return data;
  })();

  const extractedColor = async (imageURL) => {
    const data = await fetch(
      `https://spotify-endpoints.15adityagaikwad.repl.co/get-color?url=${imageURL}`
    ).then((response) => response.json());
    console.log(data);
    return data;
  };
</script>

{#await getPlaylistPage}
  loading
{:then data}
  {#await extractedColor(data.images[0].url) then playlistColors}
    <div class="container">
      <div class="column" style="gap:1rem;height:100%;width:100%;">
        <div
          class="data-container"
          on:mouseover={(e) => {
            if (e.target.parentElement.clientWidth > 500) {
              // e.target.firstChild.style.height = "240px";
              playlistImage.style.height = "240px";
              // e.target.firstChild.style.width = "240px";
              playlistImage.style.width = "240px";
            }
          }}
          on:mouseleave={(e) => {
            // e.target.firstChild.style.height = "160px";
            playlistImage.style.height = "160px";
            // e.target.firstChild.style.width = "160px";
            playlistImage.style.width = "160px";
          }}
          on:focus={() => {}}
        >
          <div class="stack">
            <div
              class="stack-item image-beneath"
              style="--image-url:url('{data.images[0].url}')"
            />
            <div class="top-overlay stack-item row gap">
              <div
                class="image-container"
                bind:this={playlistImage}
                style="--image-url:url('{data.images[0].url}')"
              />
              <div class="details-column column bottom-content-column gap">
                <div class="playlist-type-title">{data.type}</div>
                <div class="title">{data.name}</div>
                <div class="description">{@html data.description}</div>
                <!-- <div class="username">{data.owner.display_name}</div> -->
                <div class="metadata-line">
                  <PlaylistOwner
                    username={data.owner.display_name}
                    userId={data.owner.id}
                  />
                  {#if data.followers.total > 0}
                    &nbsp;•&nbsp; {data.followers.total}
                    {data.followers.total > 1 ? "likes" : "like"}
                  {/if}
                  &nbsp;•&nbsp; {data.tracks.total}
                  {data.tracks.total > 1 ? "tracks" : "track"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="actions-container">
          <div class="left-icons">
            <ActionButton
              buttonIcon={Play}
              buttonTitle="Play"
              backgroundColor={playlistColors.extractedColors[0].colorDark.hex}
            />
            <ActionButton
              buttonIcon={Shuffle}
              buttonTitle="Shuffle"
              backgroundColor={playlistColors.extractedColors[0].colorDark.hex}
            />
            <Favorite size="24px" />
          </div>
          <div class="right-icons">
            <IconContainer
              icon={Search}
              containerSize="2.8rem"
              iconSize="22px"
              blur={false}
              containerColor={"rgba(40, 40, 40, 0.7)"}
            />
            <IconContainer
              icon={DotsHorizontal}
              containerSize="2.8rem"
              iconSize="22px"
              blur={false}
              containerColor={"rgba(40, 40, 40, 0.7)"}
            />
          </div>
        </div>

        <div class="track-list column">
          {#each data.tracks.items as item, idx}
            <PlaylistTrackItem trackData={item} index={idx + 1} />
          {/each}
        </div>
      </div>
    </div>
  {/await}
{/await}

<style>
  .container {
    height: 100%;
    width: 100%;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .data-container {
    /* padding: 1rem; */
    width: 100%;
    box-shadow: 0px 0px 15px rgba(128, 128, 128, 0.1);
  }
  .gap {
    gap: 1rem;
  }
  .bottom-content-column {
    width: 100%;
    justify-content: end;
    align-items: flex-start;
    margin-bottom: 2px;
  }
  .image-container {
    /* display: inline-block; */
    width: 240px;
    height: 240px;
    aspect-ratio: 1 / 1;
    background-image: var(--image-url);
    background-position: center center;
    background-size: cover;
    border-radius: 8px;
  }
  .image-beneath {
    width: 200%;
    /* height: 100%; */
    background-image: var(--image-url);
    /* background-position: right top; */
    /* background-position: -1000px 2%; */
    /* background-repeat: no-repeat; */
    background-size: cover;
    transform: scale(1) translateX(-40%);
    filter: blur(60px) saturate(200%) brightness(1.125);
  }

  @media (max-width: 950px) {
    .image-container {
      display: inline-block;
      width: 200px;
      height: 200px;
      /* margin: 5px; */
      /* border: 3px solid #c99; */
      background-position: center center;
      background-size: cover;
    }
  }
  /* .flex-center {
    justify-content: center;
    align-items: center;
  } */
  .title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    font-size: 30px;
    font-weight: bold;
    overflow: hidden;
  }
  .description {
    /* color: var(--text-subdued); */
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    text-decoration: none;
    overflow: hidden;
    word-wrap: break-word;
  }
  .metadata-line {
    width: 100%;
    display: flex;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .playlist-type-title {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 500;
  }
  .top-overlay {
    padding: 1.4rem 1.4rem;
    background-color: rgba(30, 30, 30, 0.6);
    backdrop-filter: blur(60px) contrast(0.9) opacity(0.9);
  }
  .data-container .stack {
    overflow: hidden;
    border-radius: 1rem;
  }
  .left-icons,
  .right-icons {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .actions-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.2rem;
    padding: 0rem 18px;
  }
  .track-list {
    width: 100%;
    height: 100%;
    gap: 1.4rem;
    padding: 1rem 1.6rem;
    /* margin-top: 2rem; */
    overflow: scroll;
    -webkit-mask-image: linear-gradient(to top, black 96%, transparent);
    mask-image: linear-gradient(to top, rgb(0, 0, 0) 96%, transparent);
  }
  @media (max-width: 822px) {
    .actions-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.2rem;
      padding: 0rem 0px;
    }
    .track-list {
      width: 100%;
      height: 100%;
      gap: 1.4rem;
      padding: 1rem 0.4rem 1rem 0.8rem;
      /* margin-top: 2rem; */
      overflow: scroll;
      -webkit-mask-image: linear-gradient(to top, black 96%, transparent);
      mask-image: linear-gradient(to top, rgb(0, 0, 0) 96%, transparent);
    }
  }
</style>
