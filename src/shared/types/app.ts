import IComponent from './component';

export interface IApp extends IComponent {

  run(): Promise<void>
}

export default IApp;
