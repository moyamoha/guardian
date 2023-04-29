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
            :label="getTitleLabel"
            dense
            outlined
            v-model="item.title"
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            :label="getUsernameLabel"
            dense
            outlined
            v-model="item.username"
            :rules="[required]"
          ></v-text-field>
          <PasswordField
            v-model="item.password"
            able-to-generate
          ></PasswordField>
          <UrlField v-model="item.url"></UrlField>
          <v-combobox
            v-model="item.status"
            :items="['active', 'expired']"
            label="Status"
            dense
            outlined
            v-if="this.entry !== null && this.entry !== undefined"
          ></v-combobox>
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
            >{{ saveBtnText }}</v-btn
          >
          <v-btn @click="dialog = !dialog" color="error" outlined dense>{{
            $t("btns.cancel")
          }}</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorAlert from "./ErrorAlert.vue";
import PasswordField from "./PasswordField.vue";
import UrlField from "./UrlField.vue";
export default {
  props: ["entry", "categoryId"],
  data() {
    return {
      item: {
        title: this.entry ? this.entry.title : "",
        username: this.entry ? this.entry.username : "",
        password: this.entry ? this.entry.password : "",
        url: this.entry && this.entry.url ? this.entry.url : "",
        status: this.entry && this.entry.status ? this.entry.status : "active",
      },
      dialog: false,
      processing: false,
    };
  },
  methods: {
    ...mapActions(["addEntry", "editEntry", "changeCategoryForEntry"]),
    async handleSubmit(e) {
      e.preventDefault();
      this.processing = true;
      if (this.$refs.enform.validate()) {
        if (this.entry) {
          const categoryChanged = this.item.category.id !== this.entry.category;
          await this.editEntry({
            entry: {
              ...this.entry,
              ...this.item,
              category: this.item.category.id,
            },
            reload: !categoryChanged,
          });
          if (categoryChanged) {
            await this.changeCategoryForEntry({
              entryId: this.entry._id,
              payload: {
                oldCategoryId: this.entry.category,
                newCategoryId: this.item.category.id,
              },
            });
          }
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
        category:
          this.entry && this.entry.category
            ? {
                name: this.getCategoryNameById(this.entry.category),
                id: this.entry.category,
              }
            : "",
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
    saveBtnText() {
      return this.processing ? this.$t("btns.saving") : this.$t("btns.save");
    },
    getUsernameLabel() {
      return this.$t("labels.inputs.username*");
    },
    getTitleLabel() {
      return this.$t("labels.inputs.title*");
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
  components: { ErrorAlert, PasswordField, UrlField },
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
