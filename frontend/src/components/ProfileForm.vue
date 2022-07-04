<template>
	<div style="width: '100%'">
		<v-btn
			@click="showForm = !showForm"
			color="primary"
			dense
			small
			class="mb-2"
			v-show="!showForm"
			>Change name</v-btn
		>
		<v-form
			class="profile-form px-3 py-7 pr-7"
			@submit="handleSubmit"
			ref="profileForm"
			v-show="showForm"
		>
			<v-text-field
				label="Firstname"
				dense
				outlined
				v-model="profile.firstname"
				:rules="[required]"
			></v-text-field>
			<v-text-field
				label="Lastname"
				dense
				outlined
				v-model="profile.lastname"
				:rules="[required]"
			></v-text-field>
			<v-btn dense small color="success">Update</v-btn>
			<v-icon class="close-icon top-right" dense small @click="handleClose"
				>mdi-close-circle</v-icon
			>
		</v-form>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	props: ["user"],
	data() {
		return {
			profile: {
				firstname: this.user ? this.user.firstname : "",
				lastname: this.user ? this.user.lastname : "",
			},
			showForm: false,
		};
	},
	methods: {
		...mapActions(["changeName"]),
		handleSubmit(e) {
			e.preventDefault();
			if (this.$refs.profileForm.validate()) {
				this.changeName({ ...this.profile });
				this.showForm = false;
			}
		},
		handleClose() {
			this.profile = {
				firstname: this.user ? this.user.firstname : "",
				lastname: this.user ? this.user.lastname : "",
			};
			this.showForm = false;
		},
		required: (v) => (v && v.length > 0) || "This field can not be empty",
	},
};
</script>

<style scoped>
.profile-form {
	width: 40%;
	background-color: rgb(242, 238, 253);
	position: relative;
	padding: 3rem;
}
@media (max-width: 700px) {
	.profile-form {
		width: 60%;
	}
}

.top-right {
	position: absolute;
	top: 6px;
	right: 6px;
}

@media (max-width: 500px) {
	.profile-form {
		width: 80%;
	}
}
</style>
