<template>
  <v-text-field
    v-model="localValue"
    :label="getLabel"
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
import i18n from "@/plugins/i18n";
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
    required: (v) => (v && v.length > 0) || i18n.t("rules.required_field"),
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

    getLabel() {
      const label = this.label
        ? this.label
        : this.$t("labels.inputs.password*");
      return label;
    },
  },
  watch: {
    value(_new, _old) {
      this.localValue = _new;
    },
  },
  mounted() {
    this.localValue = this.value;
  },
};
</script>
