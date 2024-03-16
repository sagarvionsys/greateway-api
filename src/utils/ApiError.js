// format to use in controllers
// throw new ApiError(401, "Invalid user credentials")
class ApiError extends Error {
    constructor(
        statusCode,
        message,
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = !statusCode?500:statusCode
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}