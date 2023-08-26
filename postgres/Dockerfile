FROM timescale/timescaledb:latest-pg15

RUN apk --no-cache --virtual .pgroonga-dependencies add lz4-dev msgpack-c-dev zstd-dev
RUN apk --no-cache --virtual .pgroonga-build-dependencies add build-base clang15-dev clang15 llvm15

ENV PGROONGA_VERSION=3.1.3
ENV GROONGA_VERSION=13.0.5

COPY ./build-pgroonga.sh /build-pgroonga.sh

RUN /build-pgroonga.sh ${PGROONGA_VERSION} ${GROONGA_VERSION}
RUN rm -f build-pgroonga.sh

RUN apk del .pgroonga-build-dependencies 

ENV POSTGIS_VERSION=3.4.0

RUN apk add --no-cache --virtual .postgis-fetch-deps ca-certificates openssl tar
RUN apk add --no-cache --virtual .postgis-build-deps gdal-dev geos-dev proj-dev proj-util sfcgal-dev $DOCKER_PG_LLVM_DEPS autoconf automake cunit-dev file g++ gcc gettext-dev git json-c-dev libtool libxml2-dev make pcre2-dev perl protobuf-c-dev

COPY ./build-postgis.sh /build-postgis.sh

RUN /build-postgis.sh ${POSTGIS_VERSION}
RUN rm -f build-postgis.sh

RUN apk add --no-cache --virtual .postgis-run-deps gdal geos proj sfcgal json-c libstdc++ pcre2 protobuf-c ca-certificates
RUN apk del .postgis-fetch-deps .postgis-build-deps

COPY ./update-postgis.sh /usr/local/bin/update-postgis.sh
