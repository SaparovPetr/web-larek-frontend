import {Component} from "./base/Component";
import {bem, createElement, ensureElement, ensureAllElements, cloneTemplate} from "../utils/utils";

interface ISecondOrderPage {  
  inputRun(event: Event): void;
  onClick(event: MouseEvent): void;
}

export class SecondOrderPage extends Component<ISecondOrderPage>{

  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  finishScreenButton: HTMLButtonElement;
  errorNotice: HTMLElement;

  constructor(container: HTMLElement, actions?: ISecondOrderPage) {
    super(container);

    this.emailInput = ensureElement<HTMLInputElement>('.email__input', container);
    if (actions?.inputRun) { 
      this.emailInput.addEventListener('input', actions.inputRun);      
    }

    this.phoneInput = ensureElement<HTMLInputElement>('.phone__input', container);
    if (actions?.inputRun) { 
      this.phoneInput.addEventListener('input', actions.inputRun);      
    }

    this.errorNotice = ensureElement<HTMLElement>('.form__errors', container);

    
    this.finishScreenButton = ensureElement<HTMLButtonElement>('.button', container);
    if (actions?.onClick) { 
      this.finishScreenButton.addEventListener('click', actions.onClick);      
    }

  }
}
