<template>
  <div id="app">
    <Nav/>
    <Cover/>
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

  export default {
    name: 'App',
    components: {
      Nav, Game, Keyboard, Cover, Modal
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
    --dark-gray: rgb(116, 116, 116);
    --green: rgb(90, 175, 90);
    --yellow: rgb(201, 201, 119);
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

  a, a:active, a:visited, a:focus, a:hover, .link-style {
    color: var(--dark-gray);
    font-size: .9em;
  }

  .green-letter {
    color: white;
    background: var(--green);
  }

  .yellow-letter {
    color: white;
    background: var(--yellow);
  }

  .gray-letter {
    color: white;
    background: var(--dark-gray);
  }
</style>
