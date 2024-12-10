import type { Component } from './component';

export interface ILayout extends Component {
  execute(maxLoops: number): Promise<void>;
}
