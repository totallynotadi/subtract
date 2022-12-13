<script>
  import { Link } from "svelte-navigator";
  import { currentPath } from "../stores.js";

  export let itemTitle = "";
  export let linkTo = "";
  export let icon;
</script>

<Link to={linkTo} style="height:100%; width:100%; text-decoration:none;">
  <div
    class="row"
    style="color:{$currentPath.includes('/' + linkTo) ? 'white' : '#a7a7a7'};"
  >
    <svelte:component
      this={icon}
      size={"1.6rem"}
      viewBox={"0 1 24 24"}
      color={$currentPath.includes("/" + linkTo) ? "white" : "#a7a7a7"}
    />
    {itemTitle}
  </div>
</Link>

<style>
  .row {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-weight: 600;
    justify-content: flex-start;
  }
</style>
