#!/bin/bash

set -e

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

POSTGIS_VERSION="${POSTGIS_VERSION%%+*}"

# Load PostGIS into both template_database and $POSTGRES_DB
for DB in template_postgis "$POSTGRES_DB" "${@}"; do
  echo "Updating PostGIS extensions '$DB' to $POSTGIS_VERSION"
  psql --dbname="$DB" -c "
    -- Upgrade PostGIS (includes raster)
    create extension if not exists postgis version '$POSTGIS_VERSION';
    alter extension postgis update to '$POSTGIS_VERSION';

    -- Upgrade Topology
    create extension if not exists postgis_topology version '$POSTGIS_VERSION';
    alter extension postgis_topology update to '$POSTGIS_VERSION';

    -- Install Tiger dependencies in case not already installed
    create extension if not exists fuzzystrmatch;
    -- Upgrade US Tiger Geocoder
    create extension if not exists postgis_tiger_geocoder version '$POSTGIS_VERSION';
    alter extension postgis_tiger_geocoder update to '$POSTGIS_VERSION';
  "
done
