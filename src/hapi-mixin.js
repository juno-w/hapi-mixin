import axios from "axios";

export default {
  data() {
    return {
      fields: {},
      errors: {},
      statusCode: 0,
      responseMessage: "",
      action: "",
    };
  },
  methods: {
    async submit() {
      this.resetAlert();

      const response = await axios
        .post(this.action, this.fields)
        .then((res) => {
          this.statusCode = res.data.status;
          this.responseMessage = res.data.message;
          this.resetFields();

          if (process.client && this.redirect) {
            if (this.isValidUrl(this.redirect)) {
              // if the redirect has http or https
              window.location.href = this.redirect;
            } else {
              // Go to internal link
              this.$router.push(this.redirect);
            }
          }
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          this.statusCode = err.response.status;
          this.responseMessage = err.response.data.message;
        });
    },
    resetAlert() {
      this.errors = {};
      this.statusCode = 0;
      this.responseMessage = "";
    },
    resetFields() {
      this.fields = {};
    },
    isValidUrl(string) {
      try {
        new URL(string);
      } catch (e) {
        return false;
      }

      return true;
    },
  },
};
