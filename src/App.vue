<template>
  <div id="app" :class="darkMode && 'dark'">
    <Nav/>
    <Toast/>
    <Cover/>
    <ModalBackdrop/>
    <Modal/>
    <Game/>
    <Keyboard/>
  </div>
</template>

<script>
  import Nav from './components/nav/Nav.vue'
  import Game from './components/game/Game.vue'
  import Keyboard from './components/keyboard/Keyboard.vue'
  import Cover from './components/cover/Cover.vue'
  import Modal from './components/modal/Modal.vue'
  import ModalBackdrop from './components/modal/ModalBackdrop.vue'
  import Toast from './components/toast/Toast.vue'

  export default {
    name: 'App',
    components: {
      Nav, Game, Keyboard, Cover, Modal, ModalBackdrop, Toast
    },
    computed: {
      darkMode() {
        return this.$store.state.darkMode
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700;900&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: content-box;
  }

  :root {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    font-size: 24px;
    --light-gray: lightgray;
    --mid-gray: rgb(163, 161, 161);
    --dark-gray: rgb(116, 116, 116);
    --darker-gray: rgb(83, 83, 83);
    --green: rgb(90, 175, 90);
    --yellow: rgb(201, 201, 119);
    --orange: rgb(235, 162, 27);
    --light-blue: rgb(142, 205, 226);
    --dark-bg: rgb(19, 19, 19);
  }

  #app {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
  }

  #app.dark {
    color: white;
    background: var(--dark-bg);
  }

  a, a:active, a:visited, a:focus, a:hover, .link-style {
    color: var(--dark-gray);
    font-size: .9em;
  }

  .success-letter, .wrong-position-letter, .wrong-letter {
    color: white;
  }

  .success-letter.normal {
    background: var(--green);
  }

  .success-letter.contrast {
    background: var(--orange);
  }

  .wrong-position-letter.normal {
    background: var(--yellow);
  }

  .wrong-position-letter.contrast {
    background: var(--light-blue);
  }

  .wrong-letter.normal {
    background: var(--dark-gray);
  }

  .blank_letter {
    color: black;
    background: white;
  }
</style>
