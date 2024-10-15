export class CreateExperimentDTO {
  readonly id?: number;
  readonly name?: string;
  readonly date?: string;
  readonly number?: number;
  readonly soilProfileCondition: string;
  readonly landscape?: string;
  readonly lat?: string;
  readonly long?: string;
  readonly geobotany?: string;
  readonly microrelief?: string;
  readonly typeOfSoil?: string;
  readonly isGleying?: boolean;
  readonly isPermafrost?: boolean;
  readonly isPyrogenic?: boolean;
  readonly permafrostBoundary?: number;
  readonly numberOfSoilCuts?: number;
  readonly granularComposition: string;
  readonly airTemperature?: number;
  readonly layerDepth?: number;
  readonly humidity?: number;
  readonly surfaceAlbedo?: number;
  readonly numberOfGPRTracks?: number;
  readonly scanningFrequency?: string;
  readonly images?: string[];
  readonly files?: string[];
}
