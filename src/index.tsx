import * as React from "react";
import {
  HTMLPerspectiveViewerElement,
  PerspectiveViewerState
} from "./perspective-viewer-typings";

interface OnApiReadyParams {
  load(data: any): Promise<void>;
  update(data: any): Promise<void>;
}

export interface PerspectiveViewerProps {
  aggregates?: {
    [column: string]: string;
  };
  "column-pivots"?: string[];
  columns?: string[];
  filters?: Array<Array<string | number>>;
  "row-pivots"?: string[];
  sort?: Array<[string, string]>;
  settings?: boolean;
  view?: string;
  onApiReady?(params: OnApiReadyParams): void;
}

const FILTERED_ATTIBUTES = [
  "aggregates",
  "column-pivots",
  "filters",
  "columnts",
  "filters",
  "row-pivots",
  "sort",
  "view",
  "onApiReady",
  "ref"
];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "perspective-viewer": React.ClassAttributes<HTMLPerspectiveViewerElement>;
    }
  }
}

function filterKeys<T extends {}>(obj: any): T {
  return Object.keys(obj).reduce<T>(
    (agg: any, key: string) => {
      const acc = agg;
      if (obj[key] !== undefined) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as T
  );
}

export class PerspectiveViewer extends React.Component<
  PerspectiveViewerProps & React.HTMLAttributes<HTMLDivElement>,
  {}
> {
  private node: HTMLPerspectiveViewerElement | undefined;

  constructor(props: any) {
    super(props);
    this.node = void 0;
  }

  public componentDidMount() {
    this.updateState();
    if (this.props.onApiReady) {
      const node = this.node as HTMLPerspectiveViewerElement;
      const load = (data: any) => node.load(data);
      const update = (data: any) => node.update(data);
      this.props.onApiReady({
        load,
        update
      });
    }
  }

  public componentDidUpdate() {
    this.updateState();
  }

  public async componentWillUnmount() {
    if (this.node) {
      await this.node.delete();
    }
  }

  public render() {
    return <perspective-viewer {...this.getViewerProps()} ref={this.bindRef} />;
  }

  private bindRef = (node: HTMLPerspectiveViewerElement) => {
    this.node = node;
  };

  private updateState() {
    const node = this.node as HTMLPerspectiveViewerElement;
    node.restore(
      filterKeys({
        ...node.save(),
        ...this.getStateFromProps()
      })
    );
  }

  private getViewerProps() {
    const props: any = this.props;
    return Object.keys(this.props).reduce((agg, key) => {
      if (FILTERED_ATTIBUTES.indexOf(key) === -1) {
        return {
          ...agg,
          [key]: props[key]
        };
      } else {
        return agg;
      }
    }, {});
  }

  private getStateFromProps(): Partial<PerspectiveViewerState> {
    const {
      aggregates,
      columns,
      "column-pivots": colPivots,
      filters,
      settings,
      sort,
      "row-pivots": rowPivots,
      view
    } = this.props;
    return {
      aggregates: aggregates ? JSON.stringify(aggregates) : void 0,
      "column-pivots": colPivots ? JSON.stringify(colPivots) : void 0,
      columns: columns ? JSON.stringify(columns) : void 0,
      filters: filters ? JSON.stringify(filters) : void 0,
      "row-pivots": rowPivots ? JSON.stringify(rowPivots) : void 0,
      settings: settings === void 0 ? JSON.stringify(settings) : void 0,
      sort: sort ? JSON.stringify(sort) : void 0,
      view
    };
  }
}
