<template>
  <v-text-field
    v-model="localValue"
    :label="label"
    dense
    outlined
    :type="passwordFieldType"
    :append-icon="passwordFieldAppendIcon"
    @click:append="showPassword = !showPassword"
    :prepend-inner-icon="ableToGenerate ? 'mdi-key' : ''"
    @click:prepend-inner="generate"
    :rules="[required]"
    @input="updateValue"
    aria-autocomplete="none"
  >
  </v-text-field>
</template>

<script>
import { generatePassword } from "@/utils/generate-password";
import { mapGetters } from "vuex";

export default {
  name: "password-field",
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: "Password*",
    },
    ableToGenerate: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      showPassword: false,
      localValue: this.value,
    };
  },
  methods: {
    required: (v) => (v && v.length > 0) || "This Field is required",
    updateValue(newVal) {
      this.localValue = newVal;
      this.$emit("input", this.localValue);
    },
    generate() {
      const result = generatePassword(this.generateOptions);
      this.localValue = result;
      this.$emit("input", this.localValue);
    },
  },
  computed: {
    ...mapGetters(["generateOptions"]),
    passwordFieldAppendIcon() {
      return this.showPassword ? "mdi-eye" : "mdi-eye-off";
    },

    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },
  },
  watch: {
    value(_new, _old) {
      this.localValue = _new;
    },
  },
};
</script>
