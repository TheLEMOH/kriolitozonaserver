export class MeasurementDTO {
  readonly id: number;
  readonly name: string;
  readonly value: number;
  readonly heatFlowMeasurementLevel: number;
  readonly bottomLayerTemperature: number;
  readonly topLayerTemperature: number;
  readonly heatFlowValue: number;
  readonly experimentId: number;
}
