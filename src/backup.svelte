<script>
</script>

<body>
  <div class="image-box" />
  <div class="scaffold">
    <div class="column align-right">
      <div class="row">
        <div class="left-box container" />
        <div class="right-box container" />
      </div>

      <div class="row min-height">
        <div class="left-box container not-visible" />
        <div class="controls container">
          <div class="song-details">
            <div class="row">
              <div class="column">
                <div class="song-title">◊</div>
                <div class="artists-names">◊</div>
              </div>
              ◊
            </div>
          </div>
          <div class="player-controls">
            <div class="column" style="gap:1rem;k">
              <div class="row" style="gap: 3rem;">
                <div id="prev">◊</div>
                <div id="play-pause">◊</div>
                <div id="next">◊</div>
              </div>
              <div class="divider" />
            </div>
          </div>
          <div class="misc-controls">◊</div>
        </div>
      </div>
    </div>
  </div>
</body>

<style>
  :root {
    --min-left-box-width: 16rem;
    --max-left-box-width: 22rem;
  }

  .image-box {
    height: calc(30vw - 2rem);
    width: calc(30vw - 2rem);
    min-width: calc(var(--min-left-box-width) - 2rem);
    min-height: calc(var(--min-left-box-width) - 2rem);
    max-width: calc(var(--max-left-box-width) - 2rem);
    max-height: calc(var(--max-left-box-width) - 2rem);
    position: absolute;
    bottom: 0.6rem;
    left: 1.5rem;
    border-radius: 1rem;
    background-color: #1b1d1e;
  }

  .container {
    height: 100%;
    width: 100%;
    background-color: #cacaca;
    border-radius: 1rem;
  }

  .scaffold {
    height: calc(100vh - 1.7rem);
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .column {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    margin-right: 1.6rem;
  }

  .row {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    z-index: -1;
  }

  .controls {
    height: 6rem;
    min-width: 38rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    margin-right: 1rem;
  }

  .align-right {
    align-items: end;
    justify-content: right;
  }

  .left-box {
    flex: 0 0 30vw;
    min-width: var(--min-left-box-width);
    max-width: var(--max-left-box-width);
  } /*sets right-box automaticall to size*/

  .right-box {
    min-width: 38rem;
  }

  .min-height {
    height: min-content;
  }

  .not-visible {
    visibility: hidden;
  }

  .divider {
    width: 36vw;
    background-color: grey;
    height: 2px;
  }
</style>
