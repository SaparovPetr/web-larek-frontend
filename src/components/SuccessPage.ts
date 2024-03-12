import {Component} from "./base/Component";
import {bem, createElement, ensureElement, ensureAllElements, cloneTemplate} from "../utils/utils";

interface ISuccessPage {
  onClick(event: MouseEvent): void;
  counter: number;
}

export class SuccessPage extends Component<ISuccessPage> {
  protected _counter: HTMLElement;
  lastButton: HTMLButtonElement;


  set description(value: string) {
    this.setText(this._counter, value)
  }

  constructor(container: HTMLElement, actions?: ISuccessPage) {
    super(container);
    this._counter = ensureElement<HTMLElement>('.order-success__description', container);

    this.lastButton = ensureElement<HTMLButtonElement>('.button', container);
    if (actions?.onClick) { 
      this.lastButton.addEventListener('click', actions.onClick);      
    }
  }

  set counter(value: number) {
    this.setText(this._counter, `Списано ${value} синапсов`)
  }
}
