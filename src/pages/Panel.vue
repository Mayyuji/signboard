<template>
	<!-- 弹窗遮罩 -->
	<Teleport to="body">
		<div v-if="show && setting" class="modal">
			<VueDragResizeRotate
				:z="setting.z || 0"
				:rotatable="setting.rotatable"
				:parent="setting.parent"
				:lock-aspect-ratio="setting.lockAspect"
				:w="350"
				:h="350"
				@dragstop="onDragStop">
				<img class="vertical-painting" :src="srcprox" />
			</VueDragResizeRotate>
			<button @click="saveSetting">Close</button>
		</div>
	</Teleport>
</template>
<script setup>
	import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate'
	import { ref, reactive } from 'vue'

	const show = ref(false)
	const offectX = ref(0)
	const offectY = ref(0)
	const setting = reactive({})
	/**
	 * @rotatable 旋转
	 * @z 层级
	 * @parent 超越边界
	 * @lockAspect 锁定比例
	 */
	const srcprox = ref('')

	const modelShow = (options, pic) => {
		srcprox.value = pic
		setting.value = options
		show.value = true
	}
	const onDragStop = (x, y) => {
		offectX.value = x
		offectY.value = y
	}
	const saveSetting = () => {}
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
		}
	}
</style>
