# rest-to-grpc
A simple stateful example of REST wrapper over gRPC. 

### Usage
`npm install`

`npm start`

API description: _/swagger/swagger.yml_.

Configuration: _/config/default.json_.

### Configuration

_sub_ section is responsible for local transport options.

* host: listen host
* port: listen port

_pub_ section is responsuble for remote transport options.

* host: bitcoin server host
* port: bitcoin server port
* apiPrefix: bitcoin server api path prefix.
