v8_version := 3.28


all: third_party

third_party: third_party/v8

third_party/v8:
	@git clone -b ${v8_version} \
	           --single-branch git://github.com/v8/v8.git \
	           third_party/v8