v8_version := 3.28


all: third_party build

build: build-v8

build-v8:
	@cd third_party/v8 && make PATH=$$PATH:../depot_tools dependencies

third_party: third_party/v8 third_party/depot_tools

third_party/depot_tools:
	@svn checkout http://src.chromium.org/svn/trunk/tools/depot_tools third_party/depot_tools

third_party/v8:
	@git clone -b ${v8_version} \
	           --single-branch git://github.com/v8/v8.git \
	           third_party/v8