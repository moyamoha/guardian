<template>
  <v-form ref="passForm" class="generate-password-page">
    <v-text-field
      dense
      outlined
      v-model="length"
      type="number"
      label="Length"
      hide-spin-buttons
      :rules="[required, isFiveOrHiger]"
    />
    <v-checkbox label="Include numbers" dense v-model="includesDigits" />
    <v-checkbox
      label="Include capital letters"
      dense
      v-model="includesUpperCase"
    />
    <v-checkbox
      label="Include special characters"
      dense
      v-model="includesSpecialChars"
    />
    <v-divider class="mb-5"></v-divider>
    <v-btn color="success" dense outlined no-cap small @click="generate"
      >Generate random password</v-btn
    >
    <v-container
      fluid
      v-if="generated !== ''"
      class="d-flex mt-3 align-center justify-space-between generated-text-cont"
    >
      <span>{{ generated }}</span>
      <v-icon @click="copyGeneratedPassword">mdi-content-copy</v-icon>
    </v-container>
    <v-snackbar v-model="copied" timeout="1500">
      Password copied to clipboard
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
  name: "generate-password",
  data() {
    return {
      length: 8 * 2,
      includesDigits: true,
      includesUpperCase: true,
      includesSpecialChars: false,
      generated: "",
      copied: false,
    };
  },
  methods: {
    generate() {
      if (this.$refs.passForm.validate()) {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const capitals = lowercase.toUpperCase();
        const digits = "01234567890123456789";
        const specialChars = "!?#%$:;_-,*^~+=)([]{}/&€@<>|\"£'.";
        let base = lowercase;
        if (this.includesUpperCase) {
          base = base + capitals;
        }
        if (this.includesDigits) base += digits;
        if (this.includesSpecialChars) base += specialChars;
        const toArray = base.split("");
        const arrayLength = toArray.length;
        let result = "";
        for (let i = 0; i < this.length; i++) {
          const randomIndex = Math.floor(Math.random() * arrayLength);
          result += toArray[randomIndex];
        }
        this.generated = result;
      }
    },
    required(value) {
      return !!value || "This field is required";
    },
    isFiveOrHiger(value) {
      return parseInt(value) >= 5 || "Password length can't be less than 5";
    },

    async copyGeneratedPassword() {
      await window.navigator.clipboard.writeText(this.generated);
      this.copied = true;
    },
  },
};
</script>

<style scoped>
.generate-password-page {
  width: 40%;
}

.generated-text-cont {
  background-color: azure;
  width: 100%;
  word-break: break-all;
}
</style>
