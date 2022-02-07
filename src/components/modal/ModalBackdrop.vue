<template>
    <div id="modal-backdrop"></div>
</template>

<script>
  export default {
    name: 'ModalBackdrop'
  }
</script>

<style scoped>
  #modal-backdrop {
    position: fixed;
    display: none;
    background: white;
    height: 100vh;
    width: 100vw;
  }
</style>
