import { computed } from "vue";

function useBackgroundColor(props) {
  return computed(() => {
    const options = {
      danger: "var(--danger-color)",
      warning: "var(--warning-color)",
      info: "var(--info-color)",
      success: "var(--accent-color)",
      secondary: "var(--secondary-color)",
    };

    return options[props.variant];
  });
}

const backgroundColorProps = {
  variant: {
    required: false,
    default: "danger",
    validator(value) {
      return ["danger", "warning", "info", "success", "secondary"].includes(
        value
      );
    },
  },
};

export { useBackgroundColor, backgroundColorProps };
