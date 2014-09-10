#include <jni.h>
#include <v8.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <android/log.h>

using namespace v8;

const char* ToCString(const v8::String::Utf8Value& value) {
  return *value ? *value : "<string conversion failed>";
}

void Print(const FunctionCallbackInfo<Value>& args) {
  bool first = true;
  
  std::string message = "";

  for (int i = 0; i < args.Length(); i++) {
    v8::HandleScope handle_scope(args.GetIsolate());
    if (first) {
      first = false;
    } else {
      message += " ";
    }
    v8::String::Utf8Value str(args[i]);
    const char* cstr = ToCString(str);
    message += cstr;
  }
  
  __android_log_print(ANDROID_LOG_INFO, "Auryn", "%s", message.c_str());
}


extern "C" JNIEXPORT void JNICALL Java_cc_phantasien_auryn_AurynAndroid_run(JNIEnv* env, jobject thiz, jstring jsource) {

  const char *rawSource = env->GetStringUTFChars(jsource, 0);
  
  // Create a new Isolate and make it the current one.
  Isolate* isolate = Isolate::New();
  Isolate::Scope isolate_scope(isolate);

  // Create a stack-allocated handle scope.
  HandleScope handle_scope(isolate);

  Handle<ObjectTemplate> global = ObjectTemplate::New(isolate);

  global->Set(String::NewFromUtf8(isolate, "print"), FunctionTemplate::New(isolate, Print));

  // Create a new context.
  Local<Context> context = Context::New(isolate, NULL, global);

  // Enter the context for compiling and running the hello world script.
  Context::Scope context_scope(context);

  // Create a string containing the JavaScript source code.
  Local<String> source = String::NewFromUtf8(isolate, rawSource);

  // Compile the source code.
  Local<Script> script = Script::Compile(source);

  script->Run();
}
