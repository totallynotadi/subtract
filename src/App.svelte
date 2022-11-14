<script>
  import Home from "svelte-material-icons/Home.svelte";
  import User from "svelte-material-icons/Account.svelte";
  import Search from "svelte-material-icons/Magnify.svelte";

  import logo from "./assets/Subtract.png";
  import IconContainer from "./lib/IconContainer.svelte";
</script>

<div class="scaffold">
  <div class="column">
    <div class="h-top-bar w-100" style="">
      <div class="row">
        <img src={logo} alt="S U B T R A C T" style="width:3rem" />
        <div class="flex-container home-search-container">
          <IconContainer icon={Home} size="3rem" color="#aaaaaa" />
          <div
            class="search-bar-container icon-circle"
            style="border-radius:3rem;"
          >
            <Search size="1.6rem" color="#aaaaaa" />
            <input
              type="search"
              placeholder="What do you wan to listen to?"
              name="search-field"
              id="search-field"
            />
          </div>
        </div>
        <div>
          <IconContainer icon={User} size="3rem" color="#aaaaaa" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column box-1">
        <div class="container border-rad icon-box-circle" />
        <div class="container border-rad icon-box-circle" />
      </div>
      <div class="box-2 container border-rad icon-box-circle" />
      <div class="box-3 container border-rad icon-box-circle" />
    </div>
  </div>
</div>

<style>
  .scaffold {
    height: 100vh;
    width: 100vw;
    display: flex;
    padding: 1rem;
  }

  .column {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .row {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .container {
    width: 100%;
    height: 100%;
    /* outline: 2px solid grey; */
  }

  .h-top-bar {
    height: 3rem;
  }
  .w-100 {
    width: 100%;
  }
  .flex-container {
    display: flex;
    align-items: center;
  }
  .home-search-container {
    gap: 1rem;
    width: 30%;
    min-width: 30rem;
  }
  .search-bar-container {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    width: 100%;
    height: 3rem;
    border-radius: 1rem;
    padding: 1rem;
  }
  #search-field {
    width: 100%;
    appearance: none;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 1rem;
  }
  .border-rad {
    border-radius: 1rem;
  }
  .box-1 {
    flex-basis: 300px;
    flex-grow: 1;
    flex-shrink: 0;
  }
  .box-2 {
    flex-basis: 800px;
    flex-grow: 4;
    flex-shrink: 1;
    min-width: 460px;
  }
  .box-3 {
    /* max-width: 300px; */
    flex-basis: 270px;
    flex-grow: 1;
    flex-shrink: 2;
    min-width: 5rem;
  }
  @media (max-width: 900px) {
    .box-3 {
      display: none;
    }
  }
</style>
