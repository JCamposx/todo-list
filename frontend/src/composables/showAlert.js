import { reactive } from "vue";

function useShowAlert(data, message, variant = "danger") {
  data.show = true;
  data.message = message;
  data.variant = variant;

  return data;
}

const alertData = reactive({
  show: false,
  message: "",
  variant: "danger",
});

export { useShowAlert, alertData };
