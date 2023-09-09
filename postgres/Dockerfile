FROM timescale/timescaledb:latest-pg15

RUN apk --no-cache --virtual .pgroonga-dependencies add lz4-dev msgpack-c-dev zstd-dev
RUN apk --no-cache --virtual .pgroonga-build-dependencies add build-base clang15-dev clang15 llvm15

ENV PGROONGA_VERSION=3.1.3
ENV GROONGA_VERSION=13.0.5

COPY ./build-pgroonga.sh /build-pgroonga.sh

RUN /build-pgroonga.sh ${PGROONGA_VERSION} ${GROONGA_VERSION}
RUN rm -f build-pgroonga.sh

RUN apk del .pgroonga-build-dependencies 
