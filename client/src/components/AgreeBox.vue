<template>
	<div>
		<div
			class="flex flex-row h-8 my-1 margin-class"
			:class="{'opacity-50' : !checkbox}"
		>
			<div class="w-1/12 relative">
				<div
					class="absolute top-0 left-0 h-5 w-5 bg-gray-300 border border-gray-400 flex items-center justify-center"
					@click="agreeBox"
				>
					<i v-if="agree" class="text-opacity-75">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="#2F4F4F"
							stroke="#2F4F4F"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
						</svg>
					</i>
				</div>
			</div>
			<div class="w-11/12 relative">
				<div class="absolute top-0 left-0 text-left text-sm leading-tight">
					{{ text }}
					<a
						href="#"
						target="_blank"
						v-if="link && linktext[0]"
						class="text-blue-600"
					>{{ linktext[0] }}</a>
					<a href="#" target="_blank" v-if="link && linktext[1]" class="text-blue-600">
						<span class="text-black">и</span>
						{{ linktext[1] }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AgreeBox',
	data() {
		return {
			agree: false,
		}
	},
	props: {
		checkbox: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			default: '',
		},
		link: {
			type: Boolean,
			default: false,
		},
		linktext: {
			type: Array,
		},
		text: {
			type: String,
			default: '',
		},
	},
	methods: {
		agreeBox: function () {
			if (!this.checkbox) {
				this.agree = false
			} else {
				this.agree = !this.agree
				this.$emit('boxenable', this.name, this.agree)
			}
		},
	},
	watch: {
		checkbox: function () {
			if (!this.checkbox) {
				this.agree = false
				this.$emit('boxenable', this.name, this.agree)
			}
		},
	},
}
</script>

<style>
@media screen and (max-width: 320px) {
	.margin-class {
        margin-top: 1rem;
        margin-bottom: 1rem;
	}
}
</style>
