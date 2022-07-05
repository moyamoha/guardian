<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				color="indigo darken-1"
				class="white--text mb-2"
				v-on="on"
				v-bind="attrs"
				dense
				small
				>Change name</v-btn
			>
		</template>
		<v-card>
			<v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
				Changing your name?
				<v-icon @click="handleClose" color="brown">mdi-close-circle</v-icon>
			</v-card-title>
			<v-card-text>
				<ErrorAlert class="my-4"></ErrorAlert>
				<v-form class="my-3" ref="nameForm" @submit="handleSubmit">
					<v-text-field
						outlined
						dense
						label="Lastname"
						v-model="profile.firstname"
						:rules="[required]"
					></v-text-field>
					<v-text-field
						outlined
						dense
						label="Lastname"
						v-model="profile.lastname"
						:rules="[required]"
					></v-text-field>
					<v-btn
						type="submit"
						color="success"
						dense
						small
						outlined
						:diabled="processing"
						>{{ processing ? "Updating..." : "Update" }}</v-btn
					>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ErrorAlert from "./ErrorAlert.vue";
export default {
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			dialog: false,
			profile: {
				firstname: this.user ? this.user.firstname : "",
				lastname: this.user ? this.user.lastname : "",
			},
			processing: false,
		};
	},
	methods: {
		...mapActions(["changeName"]),
		...mapMutations(["setError", "setNotification"]),
		async handleSubmit(e) {
			e.preventDefault();
			this.processing = true;
			if (this.$refs.nameForm.validate()) {
				await this.changeName({ ...this.profile });
				this.processing = false;
				if (this.error === "") {
					this.dialog = false;
					this.setNotification(
						`Hello ${this.loggedInUser.firstname} ${this.loggedInUser.lastname} 😊`
					);
					setTimeout(() => {
						this.setNotification("");
					}, 5000);
				}
			}
			this.processing = false;
		},
		handleClose() {
			this.profile = {
				firstname: this.user ? this.user.firstname : "",
				lastname: this.user ? this.user.lastname : "",
			};
			this.dialog = false;
			this.setError("");
		},
		required(v) {
			return (v && v.length > 0) || "This field can not be empty";
		},
	},
	computed: {
		...mapGetters(["error", "loggedInUser"]),
	},
	components: {
		ErrorAlert,
	},
};
</script>

<style></style>
