curdir := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Functions

lowercase = $(shell echo $1 | tr A-Z a-z)

# Environment

v8_version := master
ndk_release := r10
ndk_version := 32
ndk_fullversion := ${ndk_version}-${ndk_release}
sys_name := $(shell uname -s)
sys_machine := $(shell uname -m)
sys_fullname := $(call lowercase,${sys_name})-${sys_machine}


all: third_party build

build: v8-build

v8-build: third_party/v8/third_party
	@cd third_party/v8 && \
	 make ANDROID_NDK_ROOT=${curdir}/third_party/android-ndk android_arm.release i18nsupport=off werror=no -j8

third_party/v8/third_party:
	@cd third_party/v8 && \
	 make PATH=$$PATH:${curdir}/third_party/depot_tools dependencies

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
	@git clone -b ${v8_version} \
	           --single-branch git://github.com/v8/v8.git \
	           third_party/v8