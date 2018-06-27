// Server response for undefined values;
module.exports = {
    add: function(passValue){
        let modifyValue = passValue;
        modifyValue["errorStatus"] = false;
        return modifyValue;
    }
}