export interface VestAttributes {
  trait_type: string,
  value: string | number
}

export interface VestMetadata {
  external_url: string,
  image: string,
  name: string,
  description: string,
  attributes: Array<VestAttributes>
}
