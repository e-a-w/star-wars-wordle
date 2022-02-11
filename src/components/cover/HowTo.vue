<template>
  <div v-if="show" id="how-to-section" :class="darkMode && dark">
    <h3>How To Play</h3>

    <section class="example-block">
      <p>Guess the <strong>WORDLE</strong> in 6 tries.</p>
      <p>Each guess must be a valid  5 letter word. Hit the enter button to submit.</p>
      <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
    </section>

    <section class="example-block">
      <h6>Examples</h6>
      <div class="example">
        <div :class="['example-letter', 'success-letter', contrastClass]">W</div>
        <div class="example-letter">E</div>
        <div class="example-letter">A</div>
        <div class="example-letter">R</div>
        <div class="example-letter">Y</div>
      </div>

      <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>

      <div class="example">
        <div class="example-letter">P</div>
        <div :class="['example-letter', 'wrong-position-letter', contrastClass]">I</div>
        <div class="example-letter">L</div>
        <div class="example-letter">L</div>
        <div class="example-letter">S</div>
      </div>

      <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>

      <div class="example">
        <div class="example-letter">V</div>
        <div class="example-letter">A</div>
        <div class="example-letter">G</div>
        <div class="example-letter wrong-letter">U</div>
        <div class="example-letter">E</div>
      </div>

      <p>The letter <strong>U</strong> is not in the word in any spot.</p>
    </section>

    <section class="example-block">
      <h6>A new WORDLE will be available each day!</h6>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HowTo',
  computed: {
    show() {
      return this.$store.state.cover.view === 'howTo'
    },
    contrastClass() {
      return this.$store.state.contrastClass
    },
    darkMode() {
      return this.$store.state.darkMode
    }
  }
}
</script>

<style scoped>
  h3 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }

  #how-to-section p, h6 {
    text-transform: none;
  }

  #how-to-section p {
    font-size: 16px;
    margin: 0 0 10px;
  }

  .example-block {
    padding: 15px 0 5px;
    border-bottom: 1px solid var(--light-gray);
  }
  
  .dark .example-block {
    border-bottom-color: var(--darker-gray);
  }

  .example-block:last-child {
    border: none;
  }

  .example {
    display: flex;
    gap: 3px;
    padding: 10px 0;
  }

  .example-letter {
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 30px;
    border: 2px solid black;
  }

  .dark .example-letter {
    border-color: var(--darker-gray);
  }
</style>
