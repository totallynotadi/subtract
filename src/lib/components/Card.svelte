<script>
  import IconContainer from "./IconContainer.svelte";
  import Play from "svelte-material-icons/Play.svelte";
  import DotsHorizontal from "svelte-material-icons/DotsHorizontal.svelte";

  export let prefferedWdith = null;
  export let cardData = {};
</script>

<div>
  <div
    class="stack stack-beneath"
    style="--preferred-width:{prefferedWdith ? prefferedWdith + 'px' : '100%'}"
  >
    <img
      src={cardData.content.__typename == "EpisodeOrChapterResponseWrapper"
        ? cardData.content.data.coverArt.sources[1].url
        : cardData.content.data.images.items[0].sources[0].url}
      width="100%"
      alt=""
      id="image-beneath"
      class="stack-item image-beneath"
      rel="prefetch"
    />
    <div
      class="card stack-item"
      on:mouseenter={function (e) {
        // e.target.firstChild.style.boxShadow = "none";
        e.target.firstChild.lastElementChild.style.opacity = "1";
        e.target.lastElementChild.style.color = "white";
        e.target.lastElementChild.style.fontWeight = "600";
        e.target.parentNode.firstChild.style.opacity = "1";
        e.target.style.backgroundColor = "rgb(40, 40, 40, 0.42)";
      }}
      on:mouseleave={async function (e) {
        e.target.parentNode.firstChild.style.opacity = "0";
        e.target.lastElementChild.style.color = "var(--text-subdued)";
        e.target.lastElementChild.style.fontWeight = "bold";
        e.target.firstChild.lastElementChild.style.opacity = "0";
        // e.target.firstChild.style.boxShadow = "0px 0px 38px 28px rgba(87, 87, 87, 0.6)";
        e.target.style.backgroundColor = "transparent";
      }}
    >
      <div class="stack no-transform">
        <img
          src={cardData.content.__typename == "EpisodeOrChapterResponseWrapper"
            ? cardData.content.data.coverArt.sources[1].url
            : cardData.content.data.images.items[0].sources[0].url}
          width="100%"
          alt=""
          class="stack-item"
          rel="prefetch"
        />
        <div class="stack-item card-overlay" style="">
          <div class="fluid-container" />
          <div class="row">
            <div class="fluid-container" />
            <IconContainer
              icon={Play}
              containerSize="2.6rem"
              iconSize="22.4px"
              blur={true}
              containerColor={"rgba(40, 40, 40, 0.7)"}
            />
            <!-- <IconContainer
              icon={DotsHorizontal}
              containerSize="2.6rem"
              iconSize="22.4px"
              blur={true}
            /> -->
          </div>
        </div>
      </div>

      <!-- {console.log(cardData.content)} -->
      {#if !!cardData.content.data}
        <div class="title">{cardData.content.data.name}</div>
        <!-- {#if cardData.content.data.description != "undefined"}
          <div class="description">{cardData.content.data.description}</div>
        {:else if cardData.content.data.description == "undefined" || cardData.content.data.description == null}
          <div class="description">
            by
            {cardData.content.data.name}
          </div>
        {/if} -->
        {#if cardData.content.__typename == "PlaylistResponseWrapper"}
          {#if cardData.content.data.description !== ""}
            <div class="description">
              {@html cardData.content.data.description}
            </div>
          {:else}
            <div class="description">
              by
              {cardData.content.data.ownerV2.data.name
                .padStart(18, " ")
                .padEnd(18, " ")}
            </div>
          {/if}
        {:else if cardData.content.__typename == "EpisodeOrChapterResponseWrapper"}
          <div class="description">
            {@html cardData.content.data.description}
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .stack {
    display: grid;
    overflow: hidden;
    border-radius: 8px;
  }
  .image-beneath {
    filter: blur(60px) brightness(1.125) saturate(200%);

    transform: scale(1.3);
    transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);
    opacity: 0;
  }
  .card {
    width: var(--preferred-width);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1px;

    /* aspect-ratio: 230 / 320; */
    /* z-index: 0; */
    padding: 14px;
    border-radius: 8px;
    /* background-color: rgb(40, 40, 40, 0.6); */
    background-color: transparent;

    overflow: hidden;
    transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .stack:hover {
    /* color: white; */
    /* outline: 2px solid rgba(184, 184, 184, 0.4); */
    transform: scale(1.02) translateZ(0);
    /* backface-visibility: hidden; */
  }
  .no-transform:hover {
    transform: none;
  }

  .stack.no-transform {
    /* aspect-ratio: 1; */
    /* object-fit: fill; */
    /* object-position: center; */
    border-radius: 6px;
    /* box-shadow: rgb(74, 74, 74) 0px 7px 29px 0px; */
    box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.4);
  }

  .title {
    width: 100%;
    text-align: center;
    font-weight: bold;
    color: white;
    font-size: 1.1rem;
    margin-top: 1rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical; */
  }

  .description {
    width: 100%;
    margin-top: 0.3rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text-subdued);

    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4rem;
    text-align: center;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  .fluid-container {
    width: 100%;
    height: 100%;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .card-overlay {
    opacity: 0;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }
  .stack-beneath {
    width: var(--preferred-width);
    height: 100%;
  }
</style>
