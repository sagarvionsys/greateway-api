// format to use in controllers
// Error_msg(res,error)
const Error_msg = (res, error) => {
  return res.status(error.statusCode).json({
    statusCode: error.statusCode || 500,
    success: false,
    message: error.message || "server is down please try again !",
    Other_errors: error?.errors || [],
  });
};

export { Error_msg };
