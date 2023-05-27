<template>
	<button @click="open = true">Open Modal</button>
	<div class="p-3 bg-green-500 text-white">Hello Tailwind CSS</div>
	<Teleport to="body">
		<div v-if="open" class="modal">
			<VueDragResizeRotate :x="0" :y="0" :w="200" :h="200">
				<h1 class="text-3xl font-bold underline">Hello world!</h1>
			</VueDragResizeRotate>
			<button @click="open = false">Close</button>
		</div>
	</Teleport>
</template>
<script setup>
	import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate'
	import { ref } from 'vue'

	const open = ref(true)
	const modelClose = () => {
		console.log(12121)
	}
</script>

<style scoped>
	.modal {
		position: absolute;
		background: #fff;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
	}
</style>
