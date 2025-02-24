import { component$, noSerialize, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik'
import * as L from 'leaflet'
import type { MapProps } from '~/models/map'
import { getBoundaryBox } from '../../helpers/boundary-box'

export const LeafletMap = component$<MapProps>(({ location }: MapProps) => {
  // Modify with your preferences. By default take all screen
  useStyles$(`
    #map {
      width: 100%;
      height: 100vh;
    }
  `)

  const mapContainer$ = useSignal<L.Map>()

  useVisibleTask$(async ({ track }) => {
    track(location)

    if (mapContainer$.value) {
      mapContainer$.value.remove()
    }

    const map: L.Map = new L.Map('map').setView(location.value.point, location.value.zoom || 14)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    // Assign select boundary box to use in OSM API if you want
    location.value.boundaryBox = getBoundaryBox(map)
    location.value.marker &&
      L.marker(location.value.point).bindPopup('Soraluze (Gipuzkoa) :)').addTo(map)
    mapContainer$.value = noSerialize(map)
  })

  return <div id="map" />
})
