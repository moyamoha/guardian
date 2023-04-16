<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" dense>{{
        entry ? "mdi-pencil-outline" : "mdi-plus"
      }}</v-icon>
    </template>
    <v-card class="dialog-card">
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        <div>
          {{ createNew ? "Create new entry?" : `Edit '${item.title}'?` }}
        </div>
        <v-icon @click="handleClose" color="brown">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="py-2">
        <ErrorAlert></ErrorAlert>
        <v-form class="my-3" @submit="handleSubmit" ref="enform">
          <v-text-field
            label="Title*"
            dense
            outlined
            v-model="item.title"
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            label="Username*"
            dense
            outlined
            v-model="item.username"
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            label="Password*"
            dense
            outlined
            v-model="item.password"
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            label="Url"
            dense
            outlined
            v-model="item.url"
          ></v-text-field>

          <v-combobox
            v-model="item.category"
            :items="this.categories"
            item-text="name"
            item-value="id"
            label="Category"
            dense
            outlined
            v-if="this.entry !== null && this.entry !== undefined"
          ></v-combobox>
          <v-btn
            type="submit"
            class="mr-2"
            color="primary"
            outlined
            dense
            :disabled="processing"
            >{{ processing ? "Saving..." : "Save" }}</v-btn
          >
          <v-btn @click="dialog = !dialog" color="error" outlined dense
            >Cancel</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorAlert from "./ErrorAlert.vue";
export default {
  props: ["entry", "categoryId"],
  data() {
    return {
      item: {
        title: this.entry ? this.entry.title : "",
        username: this.entry ? this.entry.username : "",
        password: this.entry ? this.entry.password : "",
        url: this.entry && this.entry.url ? this.entry.url : "",
      },
      dialog: false,
      processing: false,
    };
  },
  methods: {
    ...mapActions(["addEntry", "editEntry"]),
    async handleSubmit(e) {
      e.preventDefault();
      this.processing = true;
      if (this.$refs.enform.validate()) {
        if (this.entry) {
          await this.editEntry({
            ...this.entry,
            ...this.item,
            category: this.item.category.id,
          });
        } else {
          await this.addEntry({ entry: this.item, categId: this.categoryId });
        }
        this.processing = false;
        if (this.error === "") this.dialog = false;
      }
    },
    required: (v) => (v && v.length > 0) || "This Field is required",
    handleClose() {
      this.item = {
        title: this.entry ? this.entry.title : "",
        username: this.entry ? this.entry.username : "",
        password: this.entry ? this.entry.password : "",
        url: this.entry && this.entry.url ? this.entry.url : "",
        category: this.entry && this.entry.category ? this.entry.category : "",
      };
      this.$refs.enform.resetValidation();
      this.dialog = false;
    },

    getCategoryNameById(id) {
      const categs = this.categories;
      const found = categs.find((c) => c.id === id);
      if (!found) return "";
      return found.name;
    },
  },
  computed: {
    ...mapGetters(["error", "categories"]),
    createNew() {
      return this.entry === null || this.entry === undefined;
    },
  },
  mounted() {
    if (this.entry && this.entry.category) {
      const categs = this.categories;
      const found = categs.find((c) => c.id === this.entry.category);
      this.item.category = {
        name: found.name,
        id: this.entry.category,
      };
    }
  },
  components: { ErrorAlert },
};
</script>

<style>
.dialog-card {
  position: relative;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
