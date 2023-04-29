<template>
  <v-text-field
    v-model="localValue"
    :label="getLabel"
    dense
    outlined
    type="email"
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
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  methods: {
    required: (v) => (v && v.length > 0) || i18n.t("rules.required_field"),
    updateValue(newVal) {
      this.localValue = newVal;
      this.$emit("input", this.localValue);
    },
  },
  computed: {
    getLabel() {
      const label = this.label
        ? this.label
        : this.$t("labels.inputs.password*");
      console.log(label);
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
