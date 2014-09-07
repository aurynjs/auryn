LOCAL_PATH := $(call my-dir)

V8_REL_PATH := ../third_party/v8
V8_PATH := $(LOCAL_PATH)/$(V8_REL_PATH)


# V8
include $(CLEAR_VARS)
LOCAL_MODULE    := v8-base
LOCAL_SRC_FILES := $(V8_REL_PATH)/out/android_arm.release/obj.target/tools/gyp/libv8_base.a
include $(PREBUILT_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE    := v8-libbase
LOCAL_SRC_FILES := $(V8_REL_PATH)/out/android_arm.release/obj.target/tools/gyp/libv8_libbase.a
include $(PREBUILT_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE    := v8-snapshot
LOCAL_SRC_FILES := $(V8_REL_PATH)/out/android_arm.release/obj.target/tools/gyp/libv8_snapshot.a
include $(PREBUILT_STATIC_LIBRARY)


# Auryn
include $(CLEAR_VARS)

LOCAL_MODULE := auryn
LOCAL_SRC_FILES := main.cc
LOCAL_C_INCLUDES += $(V8_PATH)/include
LOCAL_STATIC_LIBRARIES += v8-base v8-libbase v8-snapshot
LOCAL_WHOLE_STATIC_LIBRARIES := libstlport_static
LOCAL_LDLIBS := -llog
include $(BUILD_SHARED_LIBRARY)