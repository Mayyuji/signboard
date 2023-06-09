<template>
	<!-- 弹窗遮罩 -->
	<Teleport to="body">
		<div v-if="show && setting" class="modal">
			<VueDragResizeRotate
				:z="setting.options.z || 0"
				:rotatable="setting.options.rotatable"
				:parent="setting.options.parent"
				:lock-aspect-ratio="setting.options.lockAspect"
				:enable-native-drag="false"
				:prevent-deactivation="true"
				:active="true"
				:x="setting.options.x"
				:y="setting.options.y"
				:w="setting.options.w"
				:h="setting.options.h"
				:min-width="100"
				:min-height="100"
				@resizestop="onResizeStop"
				@dragstop="onDragStop">
				<!-- <img class="vertical-painting" :src="srcprox" alt="" /> -->
				<!-- <img class="vertical-painting" src="../assets/img/立绘_缪尔赛思_1.png" /> -->
			</VueDragResizeRotate>
			<button @click="saveSetting">保存</button>
			{{ setting.lockAspect }}
		</div>
	</Teleport>
</template>
<script setup>
	import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate'
	import { ref, reactive } from 'vue'

	const show = ref(false)
	const setting = reactive({ data: {} })
	/**
	 * @rotatable 旋转
	 * @z 层级
	 * @parent 超越边界
	 * @lockAspect 锁定比例
	 * :enable-native-drag 禁止内部元素拖动
	 * :prevent-deactivation 阻止失活
	 */
	const srcprox = ref('')

	const modelShow = (options) => {
		setting.data = options
		console.log('setting.data', setting.data)
		// show.value = true
	}
	const onDragStop = (x, y) => {
		setting.options.x = x
		setting.options.y = y
	}
	const onResizeStop = (x, y, width, height) => {
		setting.options.x = x
		setting.options.y = y
		setting.options.w = width
		setting.options.h = height
	}
	const saveSetting = () => {
		console.log(setting.options)
		show.value = false
	}
	defineExpose({
		modelShow,
	})
</script>

<style lang="scss" scoped>
	.modal {
		position: absolute;
		background: #b2e0df;
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
	}
</style>
