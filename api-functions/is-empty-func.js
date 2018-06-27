// Check if value is empty, undefined, null or [];
module.exports = {
    check: function(value){
        return (value === undefined || value == null || value.length <= 0) ? true : false;
    }
}