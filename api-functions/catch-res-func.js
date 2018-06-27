// Server response for catch api errors;
module.exports = {
    send: function(status,message,error){
        return {
            status: status,
            message: message,
            errorCode: error.errorCode,
            errorStatus: error.errorStatus
        }
    }
}
