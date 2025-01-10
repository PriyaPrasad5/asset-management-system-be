export const errorHandler = (err, errorCode, res) => {
  let errorMessage = "";
  if (typeof err === "object") {
    errorMessage =
      err?.response?.data || err?.message || "Something went wrong";
  }

  console.error(`Error code: ${errorCode}, Error message:`, errorMessage);

  res.setHeader("Content-Type", "application/json");
  res.status(errorCode).json({
    status: "error",
    exception: {
      error: {
        message: errorMessage,
      },
    },
  });
};

export const successHandler = (data, res, meta) => {
  console.info("Sending a success response...");
  console.debug("Response data:", data);

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    status: "success",
    data,
    meta,
  });
};
