<template>
  <div id="app" :class="darkMode && 'dark'">
    <NavBar/>
    <VToast/>
    <VCover/>
    <ModalBackdrop/>
    <VModal/>
    <HeaderSection v-if="!gameLoading"/>
    <GameBoard/>
    <KeyBoard/>
  </div>
</template>

<script>
  import NavBar from './components/nav/NavBar.vue'
  import GameBoard from './components/game/GameBoard.vue'
  import KeyBoard from './components/keyboard/KeyBoard.vue'
  import VCover from './components/cover/VCover.vue'
  import VModal from './components/modal/VModal.vue'
  import ModalBackdrop from './components/modal/ModalBackdrop.vue'
  import VToast from './components/toast/VToast.vue'
  import HeaderSection from './components/game/HeaderSection.vue'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'App',
    components: {
      NavBar, GameBoard, KeyBoard, VCover, VModal, ModalBackdrop, VToast, HeaderSection
    },
    computed: {
      ...mapState('styleConfig', ['darkMode']),
      ...mapGetters('gameState', ['gameLoading'])
    },
    created() {
      this.$store.dispatch('targetWord/fetchWord')
    },
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

  .success-letter {
    background: var(--green);
  }

  .success-letter.contrast {
    background: var(--orange);
  }

  .wrong-position-letter {
    background: var(--yellow);
  }

  .wrong-position-letter.contrast {
    background: var(--light-blue);
  }

  .wrong-letter {
    background: var(--dark-gray);
  }

  .blank_letter {
    color: black;
    background: white;
  }
</style>
