#include <node.h>
#include <v8.h>
using namespace v8;
Handle<Value> Method(const Arguments& args) {
  HandleScope scope;
    return scope.Close(String::New("Hello World!"));
}
void init(Handle<Object> target) {
    NODE_SET_METHOD(target, "sayHello", Method);
}

NODE_MODULE(hello, init);