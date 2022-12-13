<script>
  export let buttonTitle = "";
  export let backgroundColor;
  export let buttonIcon;
</script>

<div
  class="button-container"
  style="--background-color:{backgroundColor !== ''
    ? backgroundColor
    : '#273441'}"
>
  <svelte:component
    this={buttonIcon}
    size="22px"
    viewBox={"0 0 24 24"}
    color="white"
  />
  <div class="button-title">
    {buttonTitle}
  </div>
</div>

<style>
  .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    height: 1.5rem;
    width: max-content;
    padding: 20px 18px;
    background-color: var(--background-color);
    border-radius: 0.5rem;
    box-shadow: 0px 0px 15px rgba(128, 128, 128, 0.1);
  }
  .button-title {
    color: white;
    font-size: 15px;
    margin-right: 4px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
</style>
