import {ISuccessPage} from "../types";
import {Component} from "./base/Component";
import {ensureElement} from "../utils/utils";

export class SuccessPage extends Component<any> {
  protected _counter: HTMLElement;
  protected _lastButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ISuccessPage) {
    super(container);
    this._counter = ensureElement<HTMLElement>('.order-success__description', container);
    this._lastButton = ensureElement<HTMLButtonElement>('.button', container);
    if (actions?.onClick) { 
      this._lastButton.addEventListener('click', actions.onClick);      
    }
  }
   
  set counter(value: number) {
    this.setText(this._counter, `Списано ${value} синапсов`)
  } 

  get lastButton(): HTMLButtonElement {
    return this._lastButton;
  }

  set lastButton(element: HTMLButtonElement) {
    this._lastButton = element;
  }
}