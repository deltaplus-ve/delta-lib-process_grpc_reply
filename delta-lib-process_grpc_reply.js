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
  console.log(this.senderName + " - replyMessage: ", replyMessage);
  callback(null, replyMessage);
};

var processReply = function(callback) {
  return function(error, data) {
    if (data && data.code && data.message && data.data && data.module){
      //Received data is in an envelope. We need to extract the data.
      data = data.data;
    }
    if (!error) callCallbackWithReplyMessage(callback, createReplyMessage(1, "Successful",
      (typeof data === 'string' || data instanceof String) ? data : JSON.stringify(data)));
    else {
      console.log(this.senderName + " error: ", JSON.stringify(error));
      callCallbackWithReplyMessage(callback, createReplyMessage(-1, "Error",
        (typeof data === 'string' || data instanceof String) ? data : JSON.stringify(data)));
    }
  };
};

module.exports = function(senderName) {
  this.senderName = senderName;
  return processReply;
}
