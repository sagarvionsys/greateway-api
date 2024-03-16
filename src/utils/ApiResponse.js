// format to use in controllers
// new ApiResponse(200,message,data)
class ApiResponse {
    constructor(statusCode, message = "Success",data){
        this.statusCode = statusCode
        this.success = statusCode < 400
        this.message = message
        this.data = data
    }
}


export { ApiResponse }