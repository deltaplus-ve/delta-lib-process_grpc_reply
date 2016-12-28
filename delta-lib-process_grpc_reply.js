var senderName = "";

var createReplyMessage = function(code, message, data){
  return {
    code: code,
    module: this.senderName,
    message: message,
    data: data
  };
};

var callCallbackWithReplyMessage = function(callback, replyMessage){
  callback(null, replyMessage);
};

var processReply = function(callback) {
  return function(error, data) {
    if (data && data.code && data.message && data.data && data.module){
      //Received data is in an envelope. We need to extract the data.
      data = data.data;
    }
    if (!error) callCallbackWithReplyMessage(callback, createReplyMessage(1, "Successful", JSON.stringify(data)));
    else {
      console.log(this.senderName + " error: ", JSON.stringify(error));
      callCallbackWithReplyMessage(callback, createReplyMessage(-1, "Error", JSON.stringify(error)));
    }
  };
};

module.exports = function(senderName) {
  this.senderName = senderName;
  return processReply;
}
