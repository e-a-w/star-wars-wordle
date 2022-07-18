<template>
  <div v-if="show">
    <h3>Settings</h3>

    <section v-for="setting in settings" :key="setting.key" :class="['settings-block', darkMode && 'dark']">
      <div class="left-setting">
        <p>{{setting.name}}</p>
        <p :class="['sub', darkMode && 'dark']">
          {{setting.sub}}
        </p>
      </div>

      <div v-if="setting.toggle" class="settings-toggle">
        <label :class="['toggle', darkMode && 'dark']">
          <input @click="toggleSetting(setting.key)" type="checkbox" v-model="setting.checked"/>
          <span :class="['slider', contrastClass]"></span>
        </label>
      </div>

      <div v-else-if="setting.links" class="settings-toggle">
        <a href="https://github.com/e-a-w/star-wars-wordle" target="_blank" rel="noopener noreferrer">
          Github
        </a>
        <span class="link-style">|</span>
        <a href="https://swapi.dev/" target="_blank" rel="noopener noreferrer">
          Star Wars API
        </a>
      </div> 

      <div v-else class="settings-toggle">
        <select
          :class="['category-select', darkMode && 'dark']"
          v-model="selectedCategory"
          @change="handleChange"
        >
          <option v-for="category in categoryNames" :key="category">
            {{category}}
          </option> 
        </select>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'SettingsView',
  data() {
    return {
      selectedCategory: null,
      initialSettings: [
        {
          key: 'hard',
          name: 'Hard Mode',
          sub: 'Any revealed hints must be used in subsequent guesses.',
          toggle: true
        },
        {
          key: 'dark',
          name: 'Dark Theme',
          sub: '',
          toggle: true
        },
        {
          key: 'contrast',
          name: 'Color Blind Mode',
          sub: 'High contrast colors.',
          toggle: true
        },
        {
          key: 'category',
          name: 'Select Category',
          toggle: false,
          links: false
        },
        {
          key: 'links',
          name: 'About',
          sub: 'a star wars wordle clone using the swapi.dev api.',
          toggle: false,
          links: true
        }
      ]
    }
  },
  computed: {
    show() {
      return this.coverConfig.view === 'settings'
    },
    settings() {
      return this.initialSettings.map(setting => {
        if (setting.toggle) {
          if (setting.key === 'contrast') {
            setting.checked = this.contrastClass === 'contrast'
          } else if (setting.key === 'hard') {
            setting.checked = this.hardMode
          } else if (setting.key === 'dark') {
            setting.checked = this.darkMode
          }
        }

        return setting;
      })
    },
    ...mapState('categories', [ 'category']),
    ...mapState('modal', ['modalConfig']),
    ...mapState('cover', ['coverConfig']),
    ...mapState('styleConfig', ['contrastClass', 'darkMode']),
    ...mapState('hardMode', ['hardMode']),
    ...mapGetters('gameState', ['guessCount', 'gameOver']),
    ...mapGetters('categories', ['categoryNames'])
  },
  methods: {
    closeCover() {
      return this.$store.commit('cover/TOGGLE_COVER', true)
    },
    handleChange() {
      if (this.selectedCategory === this.category) return;

      if(this.guessCount === 1 || this.gameOver) {
        this.$store.dispatch('categories/setCategory', this.selectedCategory)
        return this.closeCover()
       }
      else {
       return this.openConfirmationModal()
      }
    },
    toggleSetting(key) {
      if (key === 'hard') {
        return this.$store.commit('hardMode/TOGGLE_HARD_MODE')
      } else if (key === 'contrast') {
       return this.$store.commit('styleConfig/TOGGLE_CONTRAST')
      } else if (key === 'dark') {
        return this.$store.commit('styleConfig/TOGGLE_DARK_MODE')
      }
    },
    openConfirmationModal() {
      if(!this.modalConfig.open) {
        this.$store.commit('modal/TOGGLE_MODAL', {
          view: 'confirmation',
          actions: [
            {
              action: 'categories/setCategory',
              value: this.selectedCategory 
            }
          ],
          mutations: [
            {
              mutation: 'cover/TOGGLE_COVER',
              value: true
            }
          ]
        })
      }
    },
  },
  created() {
    this.selectedCategory = this.category;
  }
}
</script>

<style scoped>
  h3 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }

  .link-style {
    padding: 0 5px;
  }

  .sub.dark {
    color: var(--dark-gray);
  }

  .settings-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    text-transform: none;
    font-size: 20px;
    border-bottom: 1px solid var(--light-gray);
  }

  .settings-block.dark {
    border-bottom-color: var(--darker-gray);
  }

  .settings-block .sub.dark {
    color: var(--mid-gray);
  }

  .settings-block .sub {
    font-size: 14px;
  }

  .toggle {
    position: relative;
    height: 20px;
    width: 30px;
    padding: 3px;
    display: inline-flex;
    background: var(--dark-gray);
    border-radius: 5px;
    cursor: pointer;
  }

  .toggle.dark {
    background: var(--darker-gray);
  }

  .toggle input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
    display: none;
  }

  .toggle .slider {
    position: relative;
    left: 0;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    position: relative;
    left: 100%;
    transform: translateX(-100%);
    background: var(--green);
  }

  input:checked + .slider.contrast {
    background: var(--orange);
  }

  .category-select {
    padding: 5px 7px;
    color: var(--darker-gray);
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    font-size: 18px;
    border: 1px solid var(--darker-gray);
    border-radius: 3px;
    cursor: pointer;
  }

  .category-select.dark {
    background: var(--light-gray);
    color: black;
    border-color: transparent;
  }
</style>
