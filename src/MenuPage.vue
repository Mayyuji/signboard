<template>
	<!-- 菜单主体 -->
	<div class="wy-menu-box">
		<div class="card">
			<div class="cont-c pic-title">选择一张图片作为你的看板:</div>
			<div class="tip">🤔<span class="tip-txt">墙裂推荐使用透明背景的图片</span></div>
			<div v-if="picObj.data.src" class="pic-list">
				<div class="pic-item">
					<img class="full-img" :src="picObj.data.src" />
				</div>
			</div>
			<button class="btn" @click="choosePic">选择图片</button>
		</div>
		<div class="card">
			<div class="cont-c pic-title">弹窗操作配置项:</div>
			<div class="tip">🤔<span class="tip-txt">弹窗开启时操作功能在左上角</span></div>
			<div class="fake-form-item">
				<div class="cont-c fake-form-label">是否固定宽高比例♾️(☢️强烈不建议关闭☣️)：</div>
				<Switch v-model="setting.lockAspect" />
			</div>
			<div class="fake-form-item">
				<div class="cont-c fake-form-label">允许图片拖动超出页面边界🔲：</div>
				<Switch v-model="setting.parent" />
			</div>
			<div class="fake-form-item">
				<div class="cont-c fake-form-label">允许图片旋转🔄️：</div>
				<Switch v-model="setting.rotatable" />
			</div>
			<button class="btn" @click="openModel">Go 开始调整</button>
		</div>
	</div>
	<Panel ref="panelRef" @setObj="putPic" />
	<Waifu ref="waifuRef"></Waifu>
</template>
<script setup>
	import Panel from './pages/panel.vue'
	import Waifu from './pages/waifu.vue'
	import Switch from './components/switch.vue'
	import { getImageSize } from './utils/utrl'
	import _s from './utils/storge'

	import { ref, reactive, toRaw, unref, onMounted } from 'vue'

	const setting = reactive({
		rotatable: false, //旋转
		z: 0, //层级
		parent: true, //拖动出边界
		lockAspect: true, //锁定比例
	})
	const panelRef = ref(null)
	const waifuRef = ref(null)
	const picObj = reactive({ data: {} })

	const openModel = async () => {
		panelRef.value.modelShow({ ...toRaw(picObj.data), ...toRaw(setting) })
	}
	const choosePic = async () => {
		const filePath = await betterncm.app.openFileDialog('image/*', './') // 获取文件路径
		const src = await betterncm.fs.mountFile(filePath) //代理地址
		let obj = {
			x: 50,
			y: 50,
			filePath,
			src,
		}
		await getImageSize(src).then(({ newWidth = 300, newHeight = 300 }) => {
			obj.w = newWidth
			obj.h = newHeight
		})
		picObj.data = obj
		_s.setItem('PIC_OBJ', obj)
	}
	const putPic = (data) => {
		waifuRef.value.drawPic(data)
	}
	onMounted(async () => {
		const obj = _s.getItem('PIC_OBJ')
		if (obj) {
			picObj.data = obj
			picObj.data.src = await betterncm.fs.mountFile(picObj.data.filePath)
			// picObj.data.src = 'src/assets/img/test.jpeg'
			putPic({ ...toRaw(picObj.data) })
		}
	})
</script>
<style lang="scss" scoped>
	.cont-c {
		color: #333 !important;
	}
	.tip {
		margin: 10px 0;
		padding: 16px;
		background-color: #3abff8;
		border-radius: 10px;
		color: #555;
		.tip-txt {
			padding-left: 10px;
		}
	}
	.btn {
		border: none;
		background-color: #3d4451;
		color: #fff;
		padding: 12px;
		font-size: 16px;
		border-radius: 8px;
		&:hover {
			background-color: #313641;
		}
	}
	.wy-menu-box {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background-color: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(2px);
		border-radius: 10px;
		box-sizing: border-box;
		padding: 10px;

		.card {
			box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
			padding: 16px;
			border-radius: 6px;
			margin-bottom: 10px;
			background: #f2f2f2;
			.pic-title {
				font-weight: 600;
				font-size: 20px;
			}
			.pic-list {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				border-radius: 10px;
				border: 3px solid rgba(3, 102, 214, 0.3);
				padding: 20px 0 0 20px;
				margin-bottom: 20px;
				.pic-item {
					margin: 0 20px 20px 0;
					overflow: hidden;
					border-radius: 8px;
					width: calc((100% - 80px) / 4);
					padding-bottom: calc((100% - 80px) / 4);
					box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
					position: relative;
					&::nth-of-type(4n + 0) {
						margin-right: 0;
					}
					.full-img {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						// object-fit: cover; //短
						object-fit: contain; //长
						background-image: linear-gradient(45deg, #00000040, #00000040),
							linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0, #eee),
							linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);
						background-size: 20px 20px;
						background-position: 0 0, 0 0, 10px 10px;
					}
				}
			}
			// second block
			.fake-form-item {
				display: flex;
				align-items: center;
				padding: 10px 0;
				.fake-form-label {
					font-size: 18px;
					width: 400px;
				}
			}
		}
	}
</style>
