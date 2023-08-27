export default {
  methods: {
    required(v) {
      return (v && v.length > 0) || "This field is required";
    },
  },
};
