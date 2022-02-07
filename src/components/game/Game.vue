<template>
  <main>
    <section id="row-1" class="row">
      <div class="letter letter-1">A</div>
      <div class="letter letter-2">A</div>
      <div class="letter letter-3">A</div>
      <div class="letter letter-4">A</div>
      <div class="letter letter-5">A</div>
      <div class="letter letter-6">A</div>
    </section>
    <section id="row-2" class="row">
      <div class="letter letter-1">A</div>
      <div class="letter letter-2">A</div>
      <div class="letter letter-3">A</div>
      <div class="letter letter-4">A</div>
      <div class="letter letter-5">A</div>
      <div class="letter letter-6">A</div>
    </section>
    <section id="row-3" class="row">
      <div class="letter letter-1">A</div>
      <div class="letter letter-2">A</div>
      <div class="letter letter-3">A</div>
      <div class="letter letter-4">A</div>
      <div class="letter letter-5">A</div>
      <div class="letter letter-6">A</div>
    </section>
    <section id="row-4" class="row">
      <div class="letter letter-1">A</div>
      <div class="letter letter-2">A</div>
      <div class="letter letter-3">A</div>
      <div class="letter letter-4">A</div>
      <div class="letter letter-5">A</div>
      <div class="letter letter-6">A</div>
    </section>
    <section id="row-5" class="row">
      <div class="letter letter-1">A</div>
      <div class="letter letter-2">A</div>
      <div class="letter letter-3">A</div>
      <div class="letter letter-4">A</div>
      <div class="letter letter-5">A</div>
      <div class="letter letter-6">A</div>
    </section>
    <section id="row-6" class="row">
      <div class="letter letter-1">A</div>
      <div class="letter letter-2">A</div>
      <div class="letter letter-3">A</div>
      <div class="letter letter-4">A</div>
      <div class="letter letter-5">A</div>
      <div class="letter letter-6">A</div>
    </section>
  </main>
</template>

<script>
  export default {
    name: 'Game'
  }
</script>

<style scoped>
  .row {
    width: 95vw;
    max-width: 500px;
    display: flex;
    justify-content: center;
  }

  .letter {
    margin: 3px;
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    color: white;
    background: var(--green);
    border: 1px solid var(--light-gray);
  }
</style>
