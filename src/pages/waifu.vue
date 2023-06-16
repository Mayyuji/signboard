<template>
	<Teleport to="body">
		<div :style="styleObject"><img class="who-am-i" :src="styleObject.src" alt="俺的图图呢" /></div>
		<!-- <div :style="styleObject"><img class="who-am-i" src="../assets/img/test.jpeg" alt="俺的图图呢" /></div> -->
	</Teleport>
</template>
<script setup>
	import _s from '../utils/storge'
	import { reactive } from 'vue'
	const styleObject = reactive({
		position: 'absolute',
	})
	const drawPic = async (options) => {
		styleObject.width = options.w + 'px'
		styleObject.height = options.h + 'px'
		styleObject.top = options.y + 'px'
		styleObject.left = options.x + 'px'
		styleObject.src = options.src
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
