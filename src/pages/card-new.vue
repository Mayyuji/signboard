<template>
  <Teleport to="body">
    <div v-show="control">
      <div v-show="picObject.src" :style="picObject">
        <img class="who-am-i" :src="picObject.src" alt="俺的图图呢" />
      </div>
    </div>
    <!-- <div :style="picObject"><img class="who-am-i" src="../assets/img/test.jpeg" alt="俺的图图呢" /></div> -->
  </Teleport>
</template>
<script setup>
  import { reactive } from 'vue'
  const props = defineProps({
    control: Boolean,
  })
  const picObject = reactive({
    position: 'absolute',
    zIndex: -1
  })
  const drawPic = async (options) => {
    console.log('options', options)
    picObject.width = options.w + 'px'
    picObject.height = options.h + 'px'
    picObject.top = options.y + 'px'
    picObject.left = options.x + 'px'
    picObject.src = options.src
  }
  defineExpose({
    drawPic,
  })
</script>
<style lang="scss" scoped>
  .who-am-i {
    width: 100%;
    height: 100%;
  }
</style>
