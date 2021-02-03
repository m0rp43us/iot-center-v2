declare module 's2-geometry' {
  declare namespace S2 {
    declare export const latLngToKey: (lat: number, lng: number, level: number) => string
    declare export const keyToId: (key: string) => string
  }
}


