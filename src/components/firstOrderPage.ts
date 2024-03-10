import {Component} from "./base/Component";
import {bem, createElement, ensureElement, cloneTemplate} from "../utils/utils";


interface IFirstOrderPageActions {
  onClick: (event: MouseEvent) => void;
}

interface IFirstOrderPage {

}



export class FirstOrderPage extends Component<IFirstOrderPage>{
  protected _payCard: HTMLButtonElement;
  protected _payCash: HTMLButtonElement;
  protected _addressInput: HTMLInputElement;
  protected _nextScreenButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IFirstOrderPageActions) {
    super(container);
    // this._payCard = ensureElement<HTMLButtonElement>(".by-card", container);
    // this._payCash = ensureElement<HTMLButtonElement>(".by-cash", container);
    this._addressInput = ensureElement<HTMLInputElement>('.form__input', container);
    this._nextScreenButton = ensureElement<HTMLButtonElement>('.order__button', container);
    if (actions?.onClick) { 
      this._nextScreenButton.addEventListener('click', actions.onClick);      
    }
  }


}