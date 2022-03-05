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
        <a href="#">Email</a>
        <span class="link-style">|</span>
        <a href="#">Twitter</a>
      </div> 

      <div v-else class="settings-toggle">
        <select v-model="selectedCategory" @change="openConfirmationModal">
          <option v-for="category in categories" :key="category">
            {{category}}
          </option> 
        </select>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Settings',
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
          key: 'feedback',
          name: 'Feedback',
          sub: '',
          toggle: false,
          links: true
        }
      ]
    }
  },
  computed: {
    show() {
      return this.$store.state.cover.view === 'settings'
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
    ...mapState([
      'contrastClass',
      'hardMode',
      'darkMode',
      'category',
      'categories',
      'modal'
    ])
  },
  methods: {
    toggleSetting(key) {
      if (key === 'hard') {
        return this.$store.commit('TOGGLE_HARD_MODE')
      } else if (key === 'contrast') {
       return this.$store.commit('TOGGLE_CONTRAST')
      } else if (key === 'dark') {
        return this.$store.commit('TOGGLE_DARK_MODE')
      }
    },
    openConfirmationModal() {
      if(!this.modal.open) {
        this.$store.commit('TOGGLE_MODAL', {
          view: 'confirmation',
          action: 'setCategory',
          value: this.selectedCategory
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
  }

  .toggle.dark {
    background: var(--darker-gray);
  }

  .toggle input {
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
</style>
