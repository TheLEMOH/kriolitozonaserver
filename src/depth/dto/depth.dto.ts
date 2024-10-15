export class DepthDTO {
  readonly id?: number;
  readonly name: string;
  readonly value: number;
  readonly temperatureAtDepth: number;
  readonly humidity: number;
  readonly pH: number;
  readonly thermalConductivityIndex: number;
  readonly heatFluxValue: number;
  readonly organicContentSubstances: number;
  readonly experimentId: number;
}
