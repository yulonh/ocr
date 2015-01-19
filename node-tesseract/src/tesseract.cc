#include <node.h>
#include <v8.h>
using namespace v8;
Handle<Value> Method(const Arguments& args) {
<<<<<<< HEAD
    HandleScope scope;
=======
  HandleScope scope;
>>>>>>> 7f9b400816c43bea8905a6377f8286d5557adaa5
    return scope.Close(String::New("Hello World!"));
}
void init(Handle<Object> target) {
    NODE_SET_METHOD(target, "sayHello", Method);
}
<<<<<<< HEAD
NODE_MODULE(tesseract, init);
=======

NODE_MODULE(hello, init);
>>>>>>> 7f9b400816c43bea8905a6377f8286d5557adaa5
