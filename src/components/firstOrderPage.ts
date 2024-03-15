import {IFirstOrderPageActions, IFirstOrderPage} from "../types";
import {Component} from "./base/Component";
import {ensureElement} from "../utils/utils";


export class FirstOrderPage extends Component<IFirstOrderPage> {
  protected _payCard: HTMLButtonElement;
  protected _payCash: HTMLButtonElement;
  protected _addressInput: HTMLInputElement;
  protected _nextScreenButton: HTMLButtonElement;
  protected _firstOrderPageError: HTMLElement;

  constructor(container: HTMLElement, actions?: IFirstOrderPageActions) {
    super(container);
    this._payCard = ensureElement<HTMLButtonElement>(".by-card", container);
    if (actions?.onOnlineClick) {
      this._payCard.addEventListener('click', actions.onOnlineClick);
    }
    this._payCash = ensureElement<HTMLButtonElement>(".by-cash", container);
    if (actions?.onOfflineClick) {
      this._payCash.addEventListener('click', actions.onOfflineClick);
    }
    this._addressInput = ensureElement<HTMLInputElement>('.form__input', container);
    if (actions?.inputRun) {
      this._addressInput.addEventListener('input', actions.inputRun);
    }
    this._nextScreenButton = ensureElement<HTMLButtonElement>('.order__button', container);
    if (actions?.onClick) {
      this._nextScreenButton.addEventListener('click', actions.onClick);
    }
    this._firstOrderPageError = ensureElement<HTMLElement>('.form__errors', container);
  }

  get payCard(): HTMLButtonElement {
    return this._payCard;
  }
  set payCard(element: HTMLButtonElement) {
    this._payCard = element;
  }

  get payCash(): HTMLButtonElement {
    return this._payCash;
  }
  set payCash(element: HTMLButtonElement) {
    this._payCash = element;
  }

  get addressInput(): HTMLInputElement {
    return this._addressInput;
  }
  set addressInput(element: HTMLInputElement) {
    this._addressInput = element;
  }

  get nextScreenButton(): HTMLButtonElement {
    return this._nextScreenButton;
  }
  set nextScreenButton(element: HTMLButtonElement) {
    this._nextScreenButton = element;
  }

  get firstOrderPageError(): HTMLElement {
    return this._firstOrderPageError;
  }
  set firstOrderPageError(element: HTMLElement) {
    this._firstOrderPageError = element;
  }
}