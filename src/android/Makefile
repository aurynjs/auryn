curdir := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Functions

lowercase = $(shell echo $1 | tr A-Z a-z)

# Environment

v8_version := 8226d4fce7c3a75d5fe3032d84239ea17a9f1dfa
ndk_release := r10
ndk_version := 32
ndk_fullversion := ${ndk_version}-${ndk_release}
sys_name := $(shell uname -s)
sys_machine := $(shell uname -m)
sys_fullname := $(call lowercase,${sys_name})-${sys_machine}
third_party_path := ${curdir}/third_party
android_ndk_path := ${third_party_path}/android-ndk
android_toolchain := ${android_ndk_path}/toolchains/arm-linux-androideabi-4.8
android_toolchain_bin := ${android_toolchain}/prebuilt/linux-x86_64/bin


all: third_party build

build: v8-build

v8-build: v8-dependencies
	 @cd third_party/v8 && \
	  make ANDROID_NDK_ROOT=${curdir}/third_party/android-ndk \
	       CC=${android_toolchain_bin}/arm-linux-androideabi-gcc \
	       CXX={android_toolchain_bin}/arm-linux-androideabi-g++ \
	       AR=${android_toolchain_bin}/arm-linux-androideabi-ar \
	       RANLIB=${android_toolchain_bin}/arm-linux-androideabi-ranlib \
	       android_arm.release i18nsupport=off werror=no -j8

v8-dependencies:
	@cd third_party/v8 && \
	 make PATH=$$PATH:${curdir}/third_party/depot_tools \
	      dependencies

third_party: third_party/v8 third_party/depot_tools third_party/android-ndk

third_party/android-ndk: third_party/android-ndk.tar.bz2
	@tar -C third_party -jxf third_party/android-ndk.tar.bz2
	@mv third_party/android-ndk-${ndk_release} third_party/android-ndk

third_party/android-ndk.tar.bz2:
	@curl -L http://dl.google.com/android/ndk/android-ndk${ndk_fullversion}-${sys_fullname}.tar.bz2 \
	      > third_party/android-ndk.tar.bz2

third_party/depot_tools:
	@svn checkout http://src.chromium.org/svn/trunk/tools/depot_tools third_party/depot_tools

third_party/v8:
	@git clone git://github.com/v8/v8.git third_party/v8
	@cd third_party/v8 && git checkout ${v8_version}
