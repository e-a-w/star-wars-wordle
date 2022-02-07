<template>
  <section id="modal-footer">
    <div id="next-game">
      <h3>Next Wordle</h3>
      <div id="countdown">
        03:32:48
      </div>
    </div>
    <div id="share">
      <div id="share-btn">
        <span>Share</span>
        <i class="fas fa-share-alt"></i>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ModalFooter'
  }
</script>

<style scoped>
  #modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  #next-game {
    flex-basis: 50%;
    border-right: 1px solid black;
  }

  #countdown {
    font-size: 40px;
  }

  #share {
    flex-basis: 50%;
    display: flex;
    justify-content: center;
  }

  #share-btn {
    padding: 15px 20px;
    font-weight: 700;
    color: white;
    background: var(--green);
    border-radius: 5px;
    cursor: pointer;
  }
</style>
