# delta-lib: process_grpc_reply

Library to easily envelope a gRPC reply in the right message format.

# Installation

```code
npm install --save git+ssh://git-codecommit.us-east-1.amazonaws.com/v1/repos/delta-lib-process_grpc_reply
```

# Usage

```code
var my_proto = grpc.load('../protos/my_proto.proto');
var grpcReply = require('delta-lib-process_grpc_reply')('Your module name');
var processGrpcReply = grpcReply.processReply;
var createGrpcMessage = grpcReply.createMessage;

var server = new grpc.Server();
server.addProtoService(my_proto.my_package.my_service.service, {
    list: function(call, callback) {
      // Do something
    }
  });
```
