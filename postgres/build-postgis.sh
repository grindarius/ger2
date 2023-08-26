#!/bin/bash

set -eux

POSTGIS_VERSION=$1

wget -O postgis.tar.gz https://github.com/postgis/postgis/archive/${POSTGIS_VERSION}.tar.gz
mkdir -p /usr/src/postgis
tar --extract --file postgis.tar.gz --directory /usr/src/postgis --strip-components 1
rm postgis.tar.gz

cd /usr/src/postgis
gettextize
./autogen.sh
./configure --enable-lto
make -j$(nproc)
make install

projsync --system-directory --file ch_swisstopo_CHENyx06_ETRS
projsync --system-directory --file us_noaa_eshpgn
projsync --system-directory --file us_noaa_prvi
projsync --system-directory --file us_noaa_wmhpgn

mkdir /tempdb
chown -R postgres:postgres /tempdb
su postgres -c 'pg_ctl -D /tempdb init'
su postgres -c 'pg_ctl -D /tempdb -c -l /tmp/logfile -o'-F' start '
cd regress
make -j$(nproc) check RUNTESTFLAGS=--extension PGUSER=postgres
su postgres -c 'psql -c "create extension if not exists postgis;"'
su postgres -c 'psql -c "create extension if not exists postgis_raster;"'
su postgres -c 'psql -c "create extension if not exists postgis_sfcgal;"'
su postgres -c 'psql -c "create extension if not exists fuzzystrmatch;"'
su postgres -c 'psql -c "create extension if not exists address_standardizer;"'
su postgres -c 'psql -c "create extension if not exists address_standardizer_data_us;"'
su postgres -c 'psql -c "create extension if not exists postgis_tiger_geocoder;"'
su postgres -c 'psql -c "create extension if not exists postgis_topology;"'
su postgres -c 'psql -t -c "select version();"' >> /_pgis_full_version.txt
su postgres -c 'psql -t -c "select PostGIS_Full_Version();"' >> /_pgis_full_version.txt
su postgres -c 'psql -t -c "\dx"' >> /_pgis_full_version.txt
su postgres -c 'pg_ctl -D /tempdb --mode=immediate stop'
rm -rf /tempdb
rm -rf /tmp/logfile
rm -rf /tmp/pgis_reg

cd /
rm -rf /usr/src/postgis
cat /_pgis_full_version.txt
