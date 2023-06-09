<template>
	<!-- 弹窗遮罩 -->
	<Teleport to="body">
		<div v-if="show && setting" class="modal">
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
				<!-- <img class="vertical-painting" src="/src/assets/img/test.jpeg" /> -->
			</VueDragResizeRotate>
			<button @click="saveSetting">保存</button>
			{{ setting.lockAspect }}
		</div>
	</Teleport>
</template>
<script setup>
	import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate'
	import { ref, reactive, onMounted } from 'vue'
	import _s from '../utils/storge'

	const show = ref(false)
	const setting = reactive({ data: {} })
	const cuttentVal = reactive({ data: {} })
	let cVal = cuttentVal.data
	/**
	 * @rotatable 旋转
	 * @z 层级
	 * @parent 超越边界
	 * @lockAspect 锁定比例
	 * :enable-native-drag 禁止内部元素拖动
	 * :prevent-deactivation 阻止失活
	 */

	const modelShow = (options) => {
		// setting.data = options
		setting.data = {
			filePath: 'xxxxxxxxxxxxxxxxxxxxx',
			h: 300,
			lockAspect: true,
			parent: true,
			rotatable: false,
			src: '/src/assets/img/test.jpeg',
			w: 300,
			x: 50,
			y: 50,
			z: 0,
		}
		console.log('setting.data', setting.data)
		show.value = true
	}
	const onDragStop = (x, y) => {
		cVal.x = x
		cVal.y = y
	}
	const onResizeStop = (x, y, width, height) => {
		console.log(x, y, width, height)
		cVal.x = x
		cVal.y = y
		cVal.w = width
		cVal.h = height
	}
	const saveSetting = () => {
		console.log('cVal', cVal)
		// _s.setItem('PIC_OBJ', obj)
		// show.value = false
	}
	defineExpose({
		modelShow,
	})
	onMounted(() => {
		modelShow()
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
