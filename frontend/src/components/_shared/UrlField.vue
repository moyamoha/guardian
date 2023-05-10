<template>
  <v-text-field
    label="URL"
    dense
    outlined
    v-model="localValue"
    @click:append="openUrl"
    :rules="[isUrl]"
    @input="(value) => $emit('input', value)"
  >
    <template v-slot:append>
      <v-icon @click="openUrl" :disabled="openUrlIconDisabled" dense
        >mdi-open-in-new</v-icon
      >
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "url-field",
  props: ["value"],
  data() {
    return {
      localValue: this.value,
    };
  },
  methods: {
    openUrl() {
      window.open(this.localValue, "_blank");
    },
    isUrl: (v) => {
      const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      return v === "" || urlRegex.test(v) || "This field only accepts URL";
    },
  },
  computed: {
    openUrlIconDisabled() {
      return typeof this.isUrl(this.localValue) === "string";
    },
  },
};
</script>
