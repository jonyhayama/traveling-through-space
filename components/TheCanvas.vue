<script setup>
const positionRadiuses = ['unscaled', 'space', 'tunnel'];
const starStyles = ['square', 'circle', 'circleGradient'];
const presets = [{
  name: 'Floating',
  positionRadius: positionRadiuses[1],
  starStyle: starStyles[2],
  Z: 35,
  stars: 1500,
  vel: [0.05, 0.25],
  addAlpha: true
}, {
  name: 'Tunnel',
  positionRadius: positionRadiuses[2],
  starStyle: starStyles[0],
  Z: 140,
  stars: 1500,
  vel: [0.45, 0.95],
  addAlpha: false
}, {
  name: 'From Center',
  positionRadius: positionRadiuses[0],
  starStyle: starStyles[1],
  Z: 15,
  stars: 500,
  vel: [0.1, 0.15],
  addAlpha: true
}];

const positionRadius = ref(presets[0].positionRadius);
const starStyle = ref(presets[0].starStyle)
const Z = ref(presets[0].Z);
const stars = ref(presets[0].stars);
const vel = ref(presets[0].vel);
const addAlpha = ref(presets[0].addAlpha)

const canvas = ref(null);
const colors = [
  "#FF7900",
  "#F94E5D",
  "#CA4B8C",
  "#835698",
  "#445582",
  "#2F4858",
  "#845EC2",
  "#D65DB1",
  "#FF6F91",
  "#FF9671",
  "#FFC75F",
  "#F9F871",
  "#F24B8E",
  "#F6ACC2",
  "#FFE3F1",
  "#59BAB7",
  "#1FAAFE",
  "#00C6FF",
  "#00DCE4",
  "#10ECB8",
  "#A0F68B",
  "#F9F871",
];

const space = new Space();

const { pause, resume, isActive: isPlaying } = useRafFn(() => {
  if (!space) {
    return;
  }

  space.clear();
  space.run();
});

function setSpaceAttributes(){
  space.setAttributes({
    stars: stars.value,
    colors,
    Z: Z.value,
    positionRadius: positionRadius.value,
    starStyle: starStyle.value,
    vel: vel.value,
    addAlpha: addAlpha.value
  })
}

function handleSubmit() {
  setSpaceAttributes();
  resume();
}

function updatePreset(e) {
  const preset = presets[e.target.value];

  positionRadius.value = preset.positionRadius;
  starStyle.value = preset.starStyle;
  Z.value = preset.Z;
  stars.value = preset.stars;
  vel.value = preset.vel;
  addAlpha.value = preset.addAlpha;

  setSpaceAttributes();
}

onMounted(() => {
  const { clientWidth, clientHeight } = canvas.value;
  canvas.value.width = clientWidth;
  canvas.value.height = clientHeight;

  space.setCanvas(canvas.value);
  setSpaceAttributes();
})
</script>

<template>
  <div class="the-canvas">
    <button v-if="isPlaying" type="button" @click="pause" class="play-pause-button">⏸️ Pause</button>
    <button v-else type="button" @click="resume" class="play-pause-button">▶️ Play</button>
    
    <div class="controls">
      <details open>
        <summary>Presets</summary>
        <select @change="updatePreset">
          <option v-for="(preset, index) in presets" :key="index" :value="index">{{ preset.name }}</option>
        </select>
      </details>

      <details>
        <summary>Advanced Settings</summary>

        <form @submit.prevent="handleSubmit">
          <div>
            <label>Z:</label>
            <input type="number" v-model="Z" />
          </div>
          <div>
            <label>Stars:</label>
            <input type="number" v-model="stars" />
          </div>
          <div>
            <label>Position Radius:</label>
            <select v-model="positionRadius">
              <option v-for="(item, index) in positionRadiuses" :key="index" :value="item">{{ item }}</option>
            </select>
          </div>
          <div>
            <label>Star Style:</label>
            <select v-model="starStyle">
              <option v-for="(item, index) in starStyles" :key="index" :value="item">{{ item }}</option>
            </select>
          </div>
          <div>
            <label>Vel:</label>
            <div class="grid">
              <input type="number" v-model="vel[0]" step="0.01" min="0" max="1" />
              <input type="number" v-model="vel[1]" step="0.01" min="0" max="1" />
            </div>
          </div>

          <button type="submit">Update</button>
        </form>
      </details>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
$controls-width: 300px;
.the-canvas {
  display: flex;
  height: calc(100vh - var(--header-height));
  position: relative;
}
.controls {
  width: $controls-width;
  background: #333;
  height: 100%;
  padding: var(--spacing);
  overflow: auto;

  button {
    padding: 8px;
  }
}
canvas {
  width: calc(100% - #{$controls-width});
  height: 100%;
  background: #000;
}
.play-pause-button {
  background: rgba(255,255,255,0.2);
  text-align: left;
  border: none;
  width: auto;
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 8px;
}
</style>
