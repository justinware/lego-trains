import type { Component } from './component';

export interface IBoard extends Component {

  initialise(): Promise<void>
}
