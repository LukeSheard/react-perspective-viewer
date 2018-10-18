export interface PerspectiveViewerState {
  aggregates: string;
  "column-pivots": string;
  columns: string;
  filters: string;
  "row-pivots": string;
  settings: string;
  sort: string;
  view: string;
}

export interface HTMLPerspectiveViewerElement
  extends HTMLElement,
    PerspectiveViewerState {
  delete(): Promise<void>;
  restore(state: PerspectiveViewerState): void;
  save(): PerspectiveViewerState;
  load(data: any): Promise<void>;
  update(data: any): Promise<void>;
}
