<script>
  export let sectionId = "";
  export let columnCount = 2;
  export let columnGap = 12;
  import Card from "../components/Card.svelte";
</script>

<div class="section-page-container">
  <div class="section-page-title section-page-header">
    {sectionId}
  </div>
  <div
    class="section-content-grid"
    style="--column-count:{columnCount}; --column-gap:{columnGap}px; row-gap:{columnGap}px"
  >
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</div>

<style>
  .section-page-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    scroll-behavior: smooth;
    scrollbar-color: transparent transparent;
    padding: 0px 10px;
  }
  .section-page-container::-webkit-scrollbar {
    display: none;
  }
  .section-content-grid {
    display: grid;
    grid-gap: var(--column-gap);
    row-gap: var(--column-gap);
    grid-template-columns: repeat(var(--column-count), minmax(0, 1fr));
    /* grid-auto-rows: 0; */
    /* grid-template-rows: 1fr; */
  }
  .section-page-title {
    font-size: 1.6rem;
    color: white;
    text-transform: capitalize;
    font-weight: bold;
  }
  .section-page-header {
    padding: 0px 1rem;
    margin-bottom: 1rem;
  }
</style>
