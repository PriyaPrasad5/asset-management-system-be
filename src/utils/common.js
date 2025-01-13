export const validateSchema = async (schema, input) => {
  const { error } = schema.validate(input, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error) {
    return {
      error: true,
      message: error.details
        ? error.details.map((errorDetails) => errorDetails.message).join("\n")
        : "",
    };
  } else {
    return { error: false, message: "" };
  }
};
