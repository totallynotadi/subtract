<script>
  export let icon;
  export let size = "1rem";
  export let color = "white";
</script>

<div class="icon-circle" style="--size: {size}; --color: {color}">
  <svelte:component this={icon} {size} {color} />
</div>

<style>
  .icon-circle {
    --b: 2px; /* border width*/
    color: var(--color);

    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--size);
    width: var(--size);
    padding: 0.6rem;
    background-color: rgba(179, 179, 179, 0.12);
    border-radius: 50%;

    aspect-ratio: 1;
    position: relative;
    z-index: 0;
  }

  .icon-circle:before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background: var(
      --c,
      linear-gradient(
        to bottom,
        rgba(179, 179, 179, 0.01),
        rgba(179, 179, 179, 0.12)
      )
    );
    padding: var(--b);
    border-radius: 50%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
</style>
