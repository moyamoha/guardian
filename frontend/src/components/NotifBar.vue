<template>
	<div class="notif-bar" v-show="this.notification !== ''">
		<span>{{ this.notification }}</span>
		<v-icon @click="handleClose" dense>mdi-close-circle-outline</v-icon>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
	methods: {
		...mapMutations(["setNotification"]),
		handleClose() {
			this.setNotification("");
		},
	},
	computed: {
		...mapGetters(["notification"]),
	},
};
</script>

<style scoped>
.notif-bar {
	height: 30px;
	font-size: 0.9rem;
	padding: 10px;
	background-color: rgb(143, 243, 221);
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: rgb(72, 12, 12);
}
</style>
