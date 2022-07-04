<template>
	<v-dialog
		width="500"
		v-model="dialog"
		transition="dialog-top-transition"
		persistent
	>
		<template v-slot:activator="{ on, attrs }">
			<span class="action-link" v-bind="attrs" v-on="on">{{
				activatorText
			}}</span>
		</template>
		<v-card class="dialog-card">
			<v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
				<div>
					{{ createNew ? "Create new category?" : `Edit '${item.name}'?` }}
				</div>
				<v-icon @click="handleCancel" color="brown">mdi-close-circle</v-icon>
			</v-card-title>
			<v-card-text>
				<v-form class="my-3" @submit="handleSubmit" ref="catform">
					<v-text-field
						label="Name"
						dense
						outlined
						:rules="[required]"
						v-model="item.name"
					></v-text-field>
					<div class="btn-cont">
						<v-btn type="submit" color="primary" outlined dense small
							>Save</v-btn
						>
						<v-btn @click="handleCancel" color="warn" outlined dense small
							>Cancel</v-btn
						>
						<v-btn
							@click="handleDelete"
							color="error"
							outlined
							dense
							small
							v-show="this.category !== null"
							>Delete</v-btn
						>
					</div>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	props: ["category", "activatorText"],
	data() {
		return {
			item: {
				name: this.category ? this.category.name : "",
			},
			dialog: false,
		};
	},
	methods: {
		...mapActions(["addCategory", "removeCategory", "editCategory"]),
		async handleSubmit(e) {
			e.preventDefault();
			if (this.$refs.catform.validate()) {
				if (this.category) {
					await this.editCategory({
						id: this.category._id,
						name: this.item.name,
					});
				} else {
					await this.addCategory(this.item);
				}
				if (this.error === "") this.dialog = false;
			}
		},
		handleDelete() {
			if (
				window.confirm(
					`Delete ${this.category.name}? Action is irreversable and all
          the entries under this category will be also deleted!!!!`
				)
			) {
				this.removeCategory(this.category._id);
			}
		},

		handleCancel() {
			this.item.name = this.category ? this.category.name : "";
			this.dialog = false;
		},

		required(v) {
			return (v && v.length > 0) || "Category has to have a name";
		},
	},
	computed: {
		...mapGetters(["error"]),
		createNew() {
			return this.category === null || this.category === undefined;
		},
	},
};
</script>

<style>
.btn-cont {
	display: flex;
	gap: 10px;
}
</style>
