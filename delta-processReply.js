var createReplyMessage = function(code, message, data){
  return {
    code: code,
    message: message,
    data: data
  };
};

var callCallbackWithReplyMessage = function(callback, replyMessage){
  callback(null, replyMessage);
};

var processReply = function(callback) {
  return function(error, data) {
    if (!error) callCallbackWithReplyMessage(callback, createReplyMessage(1, "Successful", JSON.stringify(data)));
    else {
      console.log("BL error: ", JSON.stringify(error));
      callCallbackWithReplyMessage(callback, createReplyMessage(-1, "Error", JSON.stringify(error)));
    }
  };
};

exports.default = processReply;
