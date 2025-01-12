<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-top-transition"
    persistent
  >
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot></slot>
      </div>
    </template>
    <v-card class="dialog-card">
      <v-card-title
        class="text-h6 d-flex justify-space-between dialog-card-title"
      >
        <div>
          {{
            createNew ? "Set up Master password" : `Change your master password`
          }}
        </div>
        <v-icon @click="handleCancel" color="white">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text>
        <p class="mb-7 text-justify">
          Your master password is the key to all your sensitive data, so it's
          crucial to make it strong and secure. This password is the only one
          you’ll need to remember, as it will be used to reveal entry's
          password. Choose a master password that is unique, long, and complex,
          incorporating a mix of letters, numbers, and symbols. Avoid using
          easily guessed information, like birthdays or common words. Your
          master password is never stored directly, and only you will know it.
          Remember, if you forget it, your entry data will be inaccessible, as
          this password is used to securely encrypt and decrypt entries'
          passwords.
        </p>
        <ErrorAlert v-if="ui.errorHappened" :timeout="3500"></ErrorAlert>
        <v-form class="mt-4" @submit.prevent="handleSubmit" v-model="isValid">
          <PasswordField
            v-model="item.oldMasterPassword"
            label="Old master password *"
            auto-focus
            v-if="auth.userHasMasterPassword"
          ></PasswordField>
          <PasswordField
            v-model="item.masterPassword"
            label="Master password *"
            auto-focus
          ></PasswordField>
          <PasswordField
            v-model="item.repeatMasterPassword"
            label="Repeat Master password *"
            auto-focus
          ></PasswordField>
          <div class="btn-cont">
            <v-btn
              type="submit"
              color="primary"
              variant="outlined"
              :disabled="processing"
              :loading="processing"
              >Save</v-btn
            >
            <v-btn @click="handleCancel" variant="outlined" color="secondary"
              >Cancel</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import PasswordField from "../_shared/PasswordField.vue";
import ErrorAlert from "../_shared/ErrorAlert.vue";
import { computed, ref } from "vue";
import useUiStore from "../../store/ui.store";
import useAuthStore from "../../store/auth.store";

const ui = useUiStore();
const auth = useAuthStore();

const isValid = ref(false);
const dialog = ref(false);
const processing = ref(false);
const item = ref({
  oldMasterPassword: "",
  masterPassword: "",
  repeatMasterPassword: "",
});

const createNew = computed(() => !auth.userHasMasterPassword);

async function handleSubmit() {
  if (!isValid) return;
  if (item.value.masterPassword !== item.value.repeatMasterPassword) {
    ui.setError("Master passwords should match");
    return;
  }
  processing.value = true;
  if (auth.userHasMasterPassword) {
    await auth.changeMasterPassword({
      oldMasterPassword: item.value.oldMasterPassword,
      newMasterPassword: item.value.masterPassword,
    });
  } else {
    await auth.setupMasterPassword({
      masterPassword: item.value.masterPassword,
    });
  }
  processing.value = false;
  if (!ui.errorHappened) dialog.value = false;
}

function handleCancel() {
  item.value.masterPassword = "";
  item.value.repeatMasterPassword = "";
  dialog.value = false;
}
</script>

<style>
.btn-cont {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
