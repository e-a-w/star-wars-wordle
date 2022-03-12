<template>
  <section v-if="gameOver" id="modal-footer">
    <div id="next-game">
      <h3>Next Wordle</h3>
      <div id="countdown">
        {{this.countdown}}
      </div>
    </div>
    <div id="share">
      <div id="share-btn">
        <span>Share</span>
        <font-awesome-icon :icon="['fas', 'share-alt']"></font-awesome-icon>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ModalFooter',
    data() {
      return {
        countdown: null
      }
    },
    computed: {
      gameOver() {
        return this.game.over
      },
      ...mapState('gameState', ['game'])
    },
    methods: {
      startTimer() {
        setInterval(() => {
          this.findTime()
        }, 1000)
      },
      findTime() {
        const tomorrow = new Date()
        tomorrow.setHours(0, 0, 0, 0)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const today = new Date().getTime()
        const timeUntil = tomorrow - today

        let min = Math.floor((timeUntil / 1000 / 60) % 60);
        let hour = Math.floor((timeUntil / (1000 * 60 * 60)) % 24);
        let sec = Math.floor((timeUntil / 1000) % 60)

        const times = [hour, min, sec].map(time => {
          return time < 10 ? `0${time}` : time
        })

        return this.countdown = `${times[0]}:${times[1]}:${times[2]}`
      }
    },
    created() {
      this.findTime()
      this.startTimer()
    },
    beforeDestroy() {
      clearInterval(this.countdown)
    }
  }
</script>

<style scoped>
  h3 {
      font-size: 20px;
    }

  #modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0 10px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    color: white;
    background: var(--green);
    border-radius: 5px;
    cursor: pointer;
  }
</style>
