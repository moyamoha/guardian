<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot></slot>
      </div>
    </template>
    <v-card class="dialog-card">
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        <div>
          {{ createNew ? `Create new entry` : `Edit '${entry.title}'?` }}
        </div>
        <v-icon @click="handleClose" color="brown">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="py-2">
        <ErrorAlert></ErrorAlert>
        <v-form class="my-3" @submit="handleSubmit" ref="enform">
          <v-text-field
            label="Title *"
            dense
            outlined
            v-model="item.title"
            :rules="[required]"
            autofocus
          ></v-text-field>
          <v-text-field
            label="Username *"
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
            label="Category *"
            dense
            outlined
          ></v-combobox>
          <v-btn
            type="submit"
            class="mr-2"
            color="primary"
            outlined
            dense
            :disabled="processing"
            :loading="processing"
            >Save</v-btn
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
import ErrorAlert from "../_shared/ErrorAlert.vue";
import PasswordField from "../_shared/PasswordField.vue";
import UrlField from "../_shared/UrlField.vue";
import socket from "@/plugins/socket";

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
      if (this.$refs.enform.validate()) {
        this.processing = true;
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
          socket.emit("content-changed", this.loggedInUser.email);
        } else {
          const categId = this.categoryId
            ? this.categoryId
            : this.item.category.id;
          await this.addEntry({ entry: this.item, categId });
          socket.emit("content-changed", this.loggedInUser.email);
        }
        this.processing = false;
        if (this.error === "") this.dialog = false;
      }
    },
    required: (v) => (v && v.length > 0) || "This field is required",
    handleClose() {
      this.item = {
        title: this.entry ? this.entry.title : "",
        username: this.entry ? this.entry.username : "",
        password: this.entry ? this.entry.password : "",
        url: this.entry && this.entry.url ? this.entry.url : "",
        category: null,
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
    ...mapGetters(["error", "categories", "loggedInUser", "isCardView"]),
    createNew() {
      return this.entry === null || this.entry === undefined;
    },
  },
  mounted() {
    if (this.entry && this.entry.category) {
      const categs = this.categories;
      const found = categs.find((c) => c.id === this.entry.category);
      if (!found) this.item.category = { name: "", id: this.entry.category };
      else
        this.item.category = {
          name: found.name,
          id: this.entry.category,
        };
    } else if (this.categoryId && this.categoryId.length > 0) {
      this.item.category = {
        name: this.getCategoryNameById(this.categoryId),
        id: this.categoryId,
      };
    } else {
      this.item.category = null;
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
