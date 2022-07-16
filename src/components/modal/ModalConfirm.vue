<template>
  <div class="content">

    <div class="text">
      <p>Are you sure you want to change the category?</p>
      <p>This will RESET your current game.</p>
    </div>

    <div class="buttons">
      <button :class="['cancel', contrastClass]" @click="closeModal" type="button">Cancel</button>
      <button :class="['confirm', contrastClass]" @click="confirm" type="button">Confirm</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ModalConfirm',
    computed: {
      ...mapState('styleConfig', ['darkMode', 'contrastClass']),
      ...mapState('modal', ['modalConfig'])
    },
    methods: {
      closeModal() {
        this.$store.commit('modal/TOGGLE_MODAL')
      },
      confirm() {
        this.$store.commit('modal/TOGGLE_MODAL', {
          action: this.modalConfig.action,
          value: this.modalConfig.value,
          confirmation: true
        })
      }
    }
  }
</script>

<style scoped>
  .content {
    padding: 1rem 1rem 0;
    font-size: .8rem;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  p {
    text-transform: none;
  }

  .buttons {
    margin-top: .75rem;
    display: flex;
    justify-content: center;
    gap: .25rem;
  }

  button {
    font-size: .8rem;
    padding: .25rem .5rem;
    border: none;
    outline: none;
    border-radius: 3px;
    cursor: pointer;
  }

  button.cancel {
    background: var(--dark-gray);
    color: white;
  }

  button.confirm {
    color: white;
    background: rgb(216, 17, 17);
  }

  button.confirm.contrast {
    background: var(--light-blue);
  }
</style>