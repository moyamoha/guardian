<template>
  <v-text-field
    v-model="localValue"
    :label="label"
    dense
    outlined
    :type="passwordFieldType"
    :append-icon="passwordFieldAppendIcon"
    @click:append="showPassword = !showPassword"
    :rules="[required]"
    @input="updateValue"
  >
  </v-text-field>
</template>

<script>
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
  },
  computed: {
    passwordFieldAppendIcon() {
      return this.showPassword ? "mdi-eye" : "mdi-eye-off";
    },

    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },
  },
  mounted() {
    // this.value = this.modelValue;
  },
};
</script>
