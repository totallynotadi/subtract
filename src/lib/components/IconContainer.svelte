<script>
  export let icon;
  export let iconSize = null;
  export let containerSize = null;
  export let color = "white";
  export let blur = false;
</script>

<div
  class="icon-circle {blur ? 'blur' : 'noblur'}"
  style="--size: {containerSize ?? iconSize ?? '3.2rem'}; --color: {color}"
>
  <svelte:component
    this={icon}
    size={iconSize ?? "6rem"}
    viewBox={"0 0.5 24 24"}
    {color}
  />
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
    background-color: rgba(40, 40, 40, 0.7);
    /* background-color: #171a1a; */
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
        rgba(50, 50, 50, 0.12)
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

  .blur {
    background-color: rgba(37, 37, 37, 0.7);
    backdrop-filter: blur(60px) saturate(200%);
  }
</style>
