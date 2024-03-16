 // format to use in controllers
// Error_msg(res,error)
 const Error_msg = (res, error) => {
    return res.status(error.statusCode).json({
        statusCode:error.statusCode ,
        success: false,
        message: error.message,
        Other_errors: error.errors || [],
    });
}

export {Error_msg}