export class MeasurementDetailsDTO {
  readonly id: number
  readonly airTemperature: number;
  readonly layerDepth: number;
  readonly humidity: number;
  readonly surfaceAlbedo: number;
  readonly numberOfGPRTracks: number;
  readonly scanningFrequency: string;
}
