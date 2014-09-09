#include <jni.h>
#include <v8.h>
#include <stdio.h>
#include <android/log.h>

using namespace v8;

extern "C" JNIEXPORT void JNICALL Java_cc_phantasien_auryn_AurynAndroid_run(JNIEnv* env, jobject thiz) {
  // Create a new Isolate and make it the current one.
  Isolate* isolate = Isolate::New();
  Isolate::Scope isolate_scope(isolate);

  // Create a stack-allocated handle scope.
  HandleScope handle_scope(isolate);

  // Create a new context.
  Local<Context> context = Context::New(isolate);

  // Enter the context for compiling and running the hello world script.
  Context::Scope context_scope(context);

  // Create a string containing the JavaScript source code.
  Local<String> source = String::NewFromUtf8(isolate, "'Hello' + ', World!'");

  // Compile the source code.
  Local<Script> script = Script::Compile(source);

  // Run the script to get the result.
  Local<Value> result = script->Run();

  // Convert the result to an UTF8 string and print it.
  String::Utf8Value utf8(result);


  __android_log_write(ANDROID_LOG_INFO, "Auryn native", *utf8);
  //printf("%s\n", *utf8);
}
