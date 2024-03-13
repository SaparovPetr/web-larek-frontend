import {ISecondOrderPageActions, ISecondOrderPage} from "../types";

import {Component} from "./base/Component";
import {ensureElement} from "../utils/utils";



export class SecondOrderPage extends Component<ISecondOrderPage> {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;
  protected _finishScreenButton: HTMLButtonElement;
  protected _secondOrderPageError: HTMLElement;

  constructor(container: HTMLElement, actions?: ISecondOrderPageActions) {
    super(container);
    this._emailInput = ensureElement<HTMLInputElement>('.email__input', container);
    if (actions?.emailInputinputRun) {
      this._emailInput.addEventListener('input', actions.emailInputinputRun);
    }
    this._phoneInput = ensureElement<HTMLInputElement>('.phone__input', container);
    if (actions?.phoneInputRun) {
      this._phoneInput.addEventListener('input', actions.phoneInputRun);
    }
    this._finishScreenButton = ensureElement<HTMLButtonElement>('.button', container);
    if (actions?.onClick) {
      this._finishScreenButton.addEventListener('click', actions.onClick);
    }
    this._secondOrderPageError = ensureElement<HTMLElement>('.form__errors', container);
  }

  get emailInput(): HTMLInputElement {
    return this._emailInput;
  }

  set emailInput(element: HTMLInputElement) {
    this._emailInput = element;
  }

  get phoneInput(): HTMLInputElement {
    return this._phoneInput;
  }

  set phoneInput(element: HTMLInputElement) {
    this._phoneInput = element;
  }

  get finishScreenButton(): HTMLButtonElement {
    return this._finishScreenButton;
  }

  set finishScreenButton(element: HTMLButtonElement) {
    this._finishScreenButton = element;
  }

  get secondOrderPageError(): HTMLElement {
    return this._secondOrderPageError;
  }

  set secondOrderPageError(element: HTMLElement) {
    this._secondOrderPageError = element;
  }
}




