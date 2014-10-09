# iOS builds for ARMv7 and simulator i386.
# Assumes any dependencies are in a local folder called libs and
# headers in a local folder called headers.
# Dependencies should already have been compiled for the target arch.
# source : https://gist.github.com/j0sh/895945


PROJ=auryn

ifeq ($(IOS), 1)
    ARCH=armv7
    DEVICE=OS
    CC_FLAGS=-arch $(ARCH)
    CFLAGS_FLAGS=-mcpu=cortex-a8 -marm
else
    ARCH=i386
    CC_FLAGS=-arch $(ARCH)
    DEVICE=Simulator
endif

DEVROOT=/Developer/Platforms/iPhone$(DEVICE).platform/Developer
SDKROOT=${DEVROOT}/SDKs/iPhone$(DEVICE)4.3.sdk
CC=$(DEVROOT)/usr/bin/gcc $(CC_FLAGS)
LD=$(CC)
CFLAGS=-isysroot ${SDKROOT} -Iheaders $(CFLAGS_FLAGS)
LDFLAGS=-isysroot ${SDKROOT} -Wl, -syslibroot ${SDKROOT}

SRC=$(wildcard *.cc)
OBJS=$(patsubst %.cc,%.o,$(SRC))
DEPS=ssl crypto expat

LIBDIR=$(shell pwd)/libs
LDLIBS=$(patsubst %, $(DIR)/lib%.a, $(DEPS))

all:$(ARCH)-$(PROJ).a

$(ARCH)-$(PROJ).a: $(OBJS)
	@echo $(LDLIBS) $(OBJS)
	ar rcs $@ $(OBJS)
	ranlib $@

.PHONY: lipo
lipo:
	lipo -create -arch armv7 armv7-$(PROJ).a -arch i386 i386-$(PROJ).a -output $(PROJ).a

clean:
	rm $(OBJS)


.PHONY: realclean
realclean: clean
	rm *.a