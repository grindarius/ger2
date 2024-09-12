import type { Signal } from '@builder.io/qwik'
import type { LocationsProps } from './location'

export interface MapProps {
  // default options
  location: Signal<LocationsProps>
  // add other options to customization map
}
