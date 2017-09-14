/* Copyright (C) Deltaplus Soluciones C.A. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * This software is proprietary
 * Written by Alberto Güerere <alberto.guerere@deltapl.us>, Sep 2017
 */

var senderName = "";

var createMessage = function(code, message, data, context){
  return {
    code: code,
    module: this.senderName,
    message: message,
    data: data || "{}" //data cannot be empty. If it is received empty, fill it with JSON empty object.
    context: context
  };
};

var callCallbackWithReplyMessageOnFirstArgument = function(callback, replyMessage){
  console.log(this.senderName + " - replyMessage: ", replyMessage);
  callback(replyMessage);
};

var callCallbackWithReplyMessageOnSecondArgument = function(callback, replyMessage){
  console.log(this.senderName + " - replyMessage: ", replyMessage);
  callback(null, replyMessage);
};

var processReply = function(callback, mode) {
  return function(error, data) {
    if (data && data.code && data.message && data.data && data.module){
      //Received data is in an envelope. We need to extract the data.
      data = data.data;
    }
    if (!error){
      mode === 2 ?
        callCallbackWithReplyMessageOnFirstArgument(callback,
          createMessage(1, "Successful", (typeof data === 'string' || data instanceof String) ? data : JSON.stringify(data)))
      : callCallbackWithReplyMessageOnSecondArgument(callback,
          createMessage(1, "Successful", (typeof data === 'string' || data instanceof String) ? data : JSON.stringify(data)));
    }
    else {
      console.log(this.senderName + " error: ", JSON.stringify(error));
      mode === 2 ?
        callCallbackWithReplyMessageOnFirstArgument(callback, createMessage(-1, "Error: " + error,
          (typeof data === 'string' || data instanceof String) ? data : JSON.stringify(data)))
      : callCallbackWithReplyMessageOnSecondArgument(callback, createMessage(-1, "Error: " + error,
          (typeof data === 'string' || data instanceof String) ? data : JSON.stringify(data)));
    }
  };
};

module.exports = function(senderName) {
  this.senderName = senderName;
  return {
    processReply: processReply,
    createMessage: createMessage
  }
};
