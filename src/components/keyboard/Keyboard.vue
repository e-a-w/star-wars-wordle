<template>
  <footer>
    <section class="keyboard-row">
      <div class="keyboard-letter">Q</div>
      <div class="keyboard-letter">W</div>
      <div class="keyboard-letter">E</div>
      <div class="keyboard-letter">R</div>
      <div class="keyboard-letter">T</div>
      <div class="keyboard-letter">Y</div>
      <div class="keyboard-letter">U</div>
      <div class="keyboard-letter">I</div>
      <div class="keyboard-letter">O</div>
      <div class="keyboard-letter">P</div>
    </section>
    <section class="keyboard-row">
      <div class="keyboard-letter">A</div>
      <div class="keyboard-letter">S</div>
      <div class="keyboard-letter">D</div>
      <div class="keyboard-letter">F</div>
      <div class="keyboard-letter">G</div>
      <div class="keyboard-letter">H</div>
      <div class="keyboard-letter">J</div>
      <div class="keyboard-letter">K</div>
      <div class="keyboard-letter">L</div>
    </section>
    <section class="keyboard-row">
      <div class="keyboard-letter double-key">Enter</div>
      <div class="keyboard-letter">Z</div>
      <div class="keyboard-letter">X</div>
      <div class="keyboard-letter">C</div>
      <div class="keyboard-letter">V</div>
      <div class="keyboard-letter">B</div>
      <div class="keyboard-letter">N</div>
      <div class="keyboard-letter">M</div>
      <div class="keyboard-letter double-key">
        <font-awesome-icon :icon="['fas', 'backspace']"></font-awesome-icon>
      </div>
    </section>
  </footer>
</template>

<script>
  export default {
    name: 'Keyboard'
  }
</script>

<style scoped>
  footer {
    width: 95vw;
    max-width: 500px;
    display: flex;
    padding-bottom: 5px;
    flex-direction: column;
  }

  .keyboard-row {
    display: flex;
    justify-content: center;
  }

  .keyboard-letter {
    height: 60px;
    width: 40px;
    margin: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    background: var(--light-gray);
    border-radius: 4px;
    cursor: pointer;
  }

  .double-key {
    width: 65px;
  }

  .fa-backspace {
    font-size: 24px;
  }
</style>
