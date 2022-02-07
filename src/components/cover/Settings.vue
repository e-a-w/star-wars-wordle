<template>
  <div id="settings-section">
    <h3>Settings</h3>

    <section class="settings-block">
      <div class="left-setting">
        <p>Hard Mode</p>
        <p class="sub">Any revealed hints must be used in subsequent guesses</p>
      </div>
      <div class="settings-toggle">
        <label class="toggle">
          <input type="checkbox"/>
          <span class="slider"></span>
        </label>
      </div>
    </section>

    <section class="settings-block">
      <div class="left-setting">
        <p>Dark Theme</p>
      </div>
      <div class="settings-toggle">
        <label class="toggle">
          <input type="checkbox"/>
          <span class="slider"></span>
        </label>
      </div>
    </section>

    <section class="settings-block">
      <div class="left-setting">
        <p>Color Blind Mode</p>
        <p class="sub">High contrast colors</p>
      </div>
      <div class="settings-toggle">
        <label class="toggle">
          <input type="checkbox"/>
          <span class="slider"></span>
        </label>
      </div>
    </section>

    <section class="settings-block">
      <div class="left-setting">
        <p>Feedback</p>
        <p class="sub">High contrast colors</p>
      </div>
      <div class="settings-toggle">
        <a href="#">Email</a>
        <span class="link-style">|</span>
        <a href="#">Twitter</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Settings'
}
</script>

<style scoped>
  #settings-section {
    display: none;
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

  .settings-block .sub {
    font-size: 14px;
  }

  .toggle {
    position: relative;
    height: 20px;
    width: 45px;
    padding: 3px;
    display: inline-flex;
    background: var(--dark-gray);
    border-radius: 5px;
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
    cursor: pointer;
  }

  input:checked + .slider {
    position: relative;
    left: 100%;
    transform: translateX(-100%);
    background-color: var(--green);
  }
</style>
