<template>
	<label class="switch">
		<input type="checkbox" v-model="currentVal" />
		<span class="slider round"></span>
	</label>
</template>
<script setup>
	import { computed } from '@vue/reactivity'

	const emmits = defineEmits(['update:modelValue'])

	let props = defineProps({
		modelValue: String,
	})

	const currentVal = computed({
		get: () => {
			return props.modelValue
		},
		set: (val) => {
			emmits('update:modelValue', val)
		},
	})
</script>
<style scoped lang="scss">
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 30px;
		input {
			opacity: 0;
			width: 0;
			height: 0;
		}
	}
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #e9e9e9;
		border: 2px solid #333;
		-webkit-transition: 0.4s;
		transition: 0.4s;

		&::before {
			position: absolute;
			content: '';
			height: 22px;
			width: 22px;
			left: 4px;
			bottom: 2px;
			background-color: #ff86e3;
			-webkit-transition: 0.4s;
			transition: 0.4s;
		}
	}
	.round {
		border-radius: 30px;
		&:before {
			border-radius: 50%;
		}
	}
	input {
		&:checked + .slider {
			background-color: #86a0ff;
			&::before {
				-webkit-transform: translateX(26px);
				-ms-transform: translateX(26px);
				transform: translateX(26px);
			}
		}
		&:focus + .slider {
			box-shadow: 0 0 1px #343434;
		}
	}
</style>
