export interface PeriodInterval {
    inicio?: Date,
    fim?: Date
}

export type IntervalMode =
  | 'all'
  | '1mes'
  | '3meses'
  | '6meses'
  | '1ano'
  | 'custom';

export interface OptionInterval {
  nome: string;
  modo: IntervalMode;
}