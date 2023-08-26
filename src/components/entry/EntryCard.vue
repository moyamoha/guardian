<template>
  <div class="entry-card">
    <section class="entry-card__title">
      <span>{{ this.entry.title }}</span>
    </section>
    <section class="entry-card__username">
      <span class="entry-card__label">Username: </span>
      <span>{{ this.entry.username }}</span>
    </section>
    <section class="entry-card__password">
      <span class="entry-card__label">Password: </span>
      <span>{{
        this.showPassword
          ? this.entry.password
          : Array(this.entry.password.length).fill("*").join("")
      }}</span>
    </section>
    <section class="entry-card__category">
      <span class="entry-card__label">Category: </span>
      <span>{{ categoryName }}</span>
    </section>
    <section class="entry-card__status">
      <span class="entry-card__label">Status: </span>
      <span>{{ this.entry.status }}</span>
    </section>
    <section class="entry-card__url" v-if="this.entry.url !== ''">
      <span class="entry-card__label">URL: </span>
      <a :href="this.entry.url" target="_blank">{{ this.entry.url }}</a>
    </section>
    <section class="entry-card__actions">
      <v-icon
        class="entry-card__actions__icon"
        @click="copyPassword"
        dense
        small
        >mdi-content-copy</v-icon
      >
      <v-icon
        class="entry-card__actions__icon"
        @click="showPassword = !showPassword"
        dense
        >{{ eyeIcon }}</v-icon
      >
      <EntryDeletionDialog :entry="entry"></EntryDeletionDialog>
      <EntryDialog :entry="entry" />
    </section>
    <v-snackbar v-model="passwordCopied" timeout="1500"
      >Password was copied to the clipboard</v-snackbar
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EntryDeletionDialog from "./EntryDeletionDialog.vue";
import EntryDialog from "./EntryDialog.vue";
export default {
  name: "entry-card",
  props: ["entry"],
  components: { EntryDeletionDialog, EntryDialog },
  data() {
    return {
      showPassword: false,
      passwordCopied: false,
    };
  },
  methods: {
    copyPassword() {
      navigator.clipboard.writeText(this.entry.password);
      this.passwordCopied = true;
    },
  },
  computed: {
    ...mapGetters(["categories"]),
    categoryName() {
      const found = this.categories.find((c) => c.id === this.entry.category);
      if (!found) return "N/A";
      return found.name;
    },
    eyeIcon() {
      return this.showPassword ? "mdi-eye-outline" : "mdi-eye-off-outline";
    },
    entryStatusColor() {
      switch (this.entry.status) {
        case "expired":
          return "orange";
        case "active":
        default:
          return "green";
      }
    },
  },
};
</script>

<style lang="scss">
.entry-card {
  width: 32%;
  height: 280px;
  border-radius: 2px;
  border: 1px solid #222;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0px;

  section {
    margin-bottom: 8px;
  }

  &__title {
    font-weight: 520;
  }

  &__username,
  &__password,
  &__url {
    font-size: 0.8rem;
  }

  &__label {
    font-size: 1rem;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    justify-self: flex-end;
    justify-content: flex-end;
    gap: 8px;
    margin-bottom: -20px;

    &__icon {
      cursor: pointer;
    }
  }
}

@media (max-width: 1150px) {
  .entry-card {
    width: 40%;
  }
}

@media (max-width: 750px) {
  .entry-card {
    width: 48%;
  }
}

@media (max-width: 450px) {
  .entry-card {
    width: 100%;
  }
}
</style>
