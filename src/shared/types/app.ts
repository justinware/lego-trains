import type { Component } from './component';

export interface IApp extends Component {

  run(): Promise<void>
}
