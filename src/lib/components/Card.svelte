<script>
  import IconContainer from "./IconContainer.svelte";
  import Play from "svelte-material-icons/Play.svelte";
  import DotsHorizontal from "svelte-material-icons/DotsHorizontal.svelte";

  let imageBeneat = document.getElementById("image-beneath");
  let card = document.getElementById("card");
</script>

<div class="stack">
  <img
    src="https://i.scdn.co/image/ab67616d0000b273520590094d8a4d45933cdd78"
    width="100%"
    alt=""
    id="image-beneath"
    class="stack-item image-beneath"
    rel="prefetch"
  />
  <div
    id="card"
    class="card stack-item"
    on:mouseenter={function (e) {
      console.log(e.target);
      e.target.parentNode.firstChild.style.opacity = "1";
      e.target.lastElementChild.style.color = "white";
      e.target.lastElementChild.style.fontWeight = "600";
      e.target.firstChild.lastElementChild.style.opacity = "1";
    }}
    on:mouseleave={function (e) {
      e.target.parentNode.firstChild.style.opacity = "0";
      e.target.lastElementChild.style.color = "var(--text-subdued)";
      e.target.lastElementChild.style.fontWeight = "bold";
      e.target.firstChild.lastElementChild.style.opacity = "0";
    }}
  >
    <!-- <div class="image" /> -->
    <div class="stack">
      <img
        src="https://i.scdn.co/image/ab67616d0000b273520590094d8a4d45933cdd78"
        width="100%"
        alt=""
        class="stack-item"
        rel="prefetch"
      />
      <div class="stack-item card-overlay" style="">
        <div class="fluid-container" />
        <div class="row">
          <IconContainer
            icon={Play}
            containerSize="2.6rem"
            iconSize="1.6rem"
            blur={true}
          />
          <IconContainer
            icon={DotsHorizontal}
            containerSize="2.6rem"
            iconSize="1.6rem"
            blur={true}
          />
        </div>
      </div>
    </div>

    <div class="title">Chill Mix</div>
    <!-- <div class="description">Mag.Lo, O Super, Home and more</div> -->
    <div class="description">
      Gesaffelstein, The Toxic Avenger, Unholy and more
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
    filter: blur(60px) saturate(160%);

    transform: scale(1.2);
    transition: all 0.2s ease-in-out;
    opacity: 0;
  }
  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    /* aspect-ratio: 230 / 320; */
    /* z-index: 0; */
    padding: 14px;
    border-radius: 8px;
    /* background-color: rgb(52, 52, 52); */
    background-color: transparent;
    /* backdrop-filter: blur(60px) saturate(200%); */
    overflow: hidden;
    transition: all 0.2s ease-in-out 0.1s;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .stack:hover {
    /* color: white; */
    /* outline: 2px solid rgba(184, 184, 184, 0.4); */
    transform: scale(1.02) translateZ(0);
    backface-visibility: hidden;
  }

  img {
    /* aspect-ratio: 1; */
    /* object-fit: fill; */
    /* object-position: center; */
    border-radius: 6px;
    /* box-shadow: rgb(74, 74, 74) 0px 7px 29px 0px; */
    box-shadow: 0px 0px 14px 3px rgba(0, 0, 0, 0.4);
  }

  .title {
    font-weight: bold;
    color: white;
    font-size: 1.1rem;
    margin-top: 1rem;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  .description {
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
</style>
