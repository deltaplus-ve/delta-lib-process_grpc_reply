# delta-lib: process_grpc_reply

Library to easily envelope a gRPC reply in the right message format.

# Usage

```code
var my_proto = grpc.load('../protos/my_proto.proto');
var processGrpcReply = require('delta-lib-process_grpc_reply')('Your module name');

var server = new grpc.Server();
server.addProtoService(my_proto.my_package.my_service.service, {
    list: function(call, callback) {
      // Do something
    }
  });
```
