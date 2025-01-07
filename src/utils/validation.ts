export const rules = {
  required: (value: string) => {
    return (value && value.length > 0) || "This field is required";
  },
  isUrlOrEmpty: (v: string) => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return v === "" || urlRegex.test(v) || "This field only accepts URL";
  },
  passwordLengthShouldBe5OrGreater: (value: any) => {
    return parseInt(value) >= 5 || "Password length can't be less than 5";
  },
};
