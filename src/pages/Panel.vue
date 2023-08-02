<template>
  <!-- 弹窗遮罩 -->
  <Teleport to="body">
    <!-- v-if="show && setting" -->
    <div class="modal">
      <VueDragResizeRotate
        :z="setting.data.z || 0"
        :rotatable="setting.data.rotatable"
        :parent="setting.data.parent"
        :lock-aspect-ratio="setting.data.lockAspect"
        :enable-native-drag="false"
        :prevent-deactivation="true"
        :active="true"
        :x="setting.data.x"
        :y="setting.data.y"
        :w="setting.data.w"
        :h="setting.data.h"
        :min-width="100"
        :min-height="100"
        @resizestop="onResizeStop"
        @dragstop="onDragStop">
        <img class="vertical-painting" :src="setting.data.src" alt="" />
      </VueDragResizeRotate>
      <div class="menu">
        <div class="menu-btn-box">
          <div class="menu-btn cont-c cursor" @click="menuShow = !menuShow">
            <svg
              style="filter: brightness(1)"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="currentColor"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"></path>
            </svg>
          </div>
          <div v-show="menuShow" class="option-box">
            <button class="btn close cursor" @click="closeMask">
              关闭遮罩
            </button>
            <button class="btn cursor" @click="saveSetting">保存</button>
          </div>
        </div>
        <Transition name="qeqweaq">
          <div class="menu-item" v-if="menuShow">
            <div class="fake-form-item">
              <div class="fake-form-label cont-c">是否固定宽高比例♾️：</div>
              <Switch v-model="setting.data.lockAspect" />
            </div>
            <div class="fake-form-item">
              <div class="fake-form-label cont-c">
                允许图片拖动超出页面边界📏：
              </div>
              <Switch v-model="setting.data.parent" />
            </div>
            <div class="fake-form-item">
              <div class="fake-form-label cont-c">允许图片旋转🔄️：</div>
              <Switch v-model="setting.data.rotatable" />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
  import _s from '../utils/storge'
  import { ref, reactive, toRaw } from 'vue'

  import Switch from '../components/switch.vue'
  import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate'

  const emit = defineEmits(['setObj'])

  const show = ref(false)
  const menuShow = ref(false)
  const setting = reactive({ data: {}, current: {} })
  /**
   * @rotatable 旋转
   * @z 层级
   * @parent 超越边界
   * @lockAspect 锁定比例
   * :enable-native-drag 禁止内部元素拖动
   * :prevent-deactivation 阻止失活
   */

  const modelShow = (options) => {
    setting.data = options
    setting.current = {
      filePath: options.filePath,
      w: options.w,
      h: options.h,
      x: options.x,
      y: options.y,
      show: options.show,
    }
    show.value = true
  }
  const onDragStop = (x, y) => {
    setting.current.x = x
    setting.current.y = y
  }
  const onResizeStop = (x, y, width, height) => {
    setting.current.x = x
    setting.current.y = y
    setting.current.w = width
    setting.current.h = height
  }
  const saveSetting = () => {
    setting.current.show = true
    _s.setItem('PIC_OBJ', setting.current)
    emit('setObj', { ...toRaw(setting.current), src: setting.data.src })
    show.value = false
    menuShow.value = false
  }
  const closeMask = () => {
    emit('setObj', false)
    show.value = false
    menuShow.value = false
  }
  defineExpose({
    modelShow,
  })
</script>

<style lang="scss" scoped>
  .qeqweaq-enter-active {
    animation: qeqweaq-in 0.3s;
  }
  .qeqweaq-leave-active {
    animation: qeqweaq-in 0.3s reverse;
  }
  @keyframes qeqweaq-in {
    0% {
      width: 56px;
      height: 56px;
    }
    100% {
      width: 360px;
      height: 182px;
    }
  }
  .modal {
    position: absolute;
    background: rgba(112, 112, 112, 0.5);
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .vertical-painting {
      width: 100%;
      height: 100%;
      object-fit: contain; //长
    }
    .menu {
      position: absolute;
      background: #b2e0df;
      color: #333 !important;
      top: 0;
      left: 0;
      z-index: 1000;
      margin: 14px;
      background-color: #f2f2f2;
      display: inline-block;
      box-sizing: border-box;
      padding: 12px;
      border-radius: 16px;
      .menu-btn-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .option-box {
          .btn {
            box-sizing: border-box;
            border: none;
            min-width: 80px;
            background-color: #86a0ff;
            margin-left: 10px;
            border-radius: 8px;
            padding: 6px;
          }
          .close {
            background-color: #f87272;
          }
        }
        .menu-btn {
          width: 32px;
          // overflow: hidden;
          height: 32px;
        }
      }
      .menu-item {
        overflow: hidden;
        .fake-form-item {
          display: flex;
          align-items: center;
          padding: 10px;
          .fake-form-label {
            font-size: 18px;
            width: 280px;
          }
        }
      }
    }
  }
</style>
