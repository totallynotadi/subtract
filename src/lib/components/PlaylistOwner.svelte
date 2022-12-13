<script>
  export let username = "";
  export let userId = "";

  const getUserData = (async () => {
    if (userId !== "spotify") {
      const data = await fetch(
        `https://spotify-endpoints.15adityagaikwad.repl.co/user/${userId}`
      ).then((response) => response.json());
      console.log(data);
      return data;
    } else {
      return null;
    }
  })();
</script>

{#await getUserData}
  loading
{:then data}
  <div class="card-container">
    {#if data && data.images.length > 0}
      <div class="user-image" style="url({data.images[0].url})" />
    {/if}
    {username}
  </div>
{/await}

<style>
  .card-container {
    display: inline-flex;
    flex-direction: row;
    gap: 0.5rem;
  }
  .user-image {
    /* display: inline-block; */
    width: 1.6rem;
    height: 1.6rem;
    background-image: var(--image-url);
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
  }
</style>
