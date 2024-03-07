FROM timescale/timescaledb:latest-pg16

RUN apk --no-cache --virtual .pgroonga-dependencies add lz4-dev msgpack-c-dev zstd-dev
RUN apk --no-cache --virtual .pgroonga-build-dependencies add autoconf automake gettext-dev libtool build-base clang15-dev clang15 llvm15

ENV PGROONGA_VERSION=3.1.5
ENV GROONGA_VERSION=13.0.8

COPY ./build-pgroonga.sh /build-pgroonga.sh
RUN chmod +x ./build-pgroonga.sh

RUN /build-pgroonga.sh ${PGROONGA_VERSION} ${GROONGA_VERSION}
RUN rm -f build-pgroonga.sh

RUN apk del .pgroonga-build-dependencies 
