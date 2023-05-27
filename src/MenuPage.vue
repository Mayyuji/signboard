<template>
	<!-- 菜单主体 -->
	<div class="wy-menu-box">
		88888
		<button @click="choosePic">Button</button>
		<button @click="openModel">Button</button>
	</div>
	<Panel ref="panelRef" />
</template>
<script setup>
	import Panel from './pages/Panel.vue'
	import { ref, reactive, toRaw, unref } from 'vue'

	const open = ref(false)
	const setting = reactive({
		rotatable: true, //旋转
		z: 0, //层级
		parent: false, //拖动出边界
		lockAspect: false, //锁定比例
	})
	const panelRef = ref(null)
	const picPath = ref('')

	const openModel = () => {
		// betterncm.app.openFileDialog('.webp .png .jpg\0', './') 获取文件路径
		// betterncm.fs.mountFile(this.ImageUrl); 获取图片代理地址

		panelRef.value.modelShow(toRaw(setting), unref(picPath))
	}
	const choosePic = async () => {
		const filePath = await betterncm.app.openFileDialog('.webp .png .jpg\0', './')
		console.log(filePath)
		const path = await betterncm.fs.mountFile(filePath)
		console.log(path)
		picPath.value = path
	}
	const modelClose = () => {
		console.log(12121)
	}
</script>
