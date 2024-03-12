import {Component} from "./base/Component";
import {bem, createElement, ensureElement, ensureAllElements, cloneTemplate} from "../utils/utils";

interface IFirstOrderPage {  
  onOnlineClick(event: MouseEvent): void;
  onOfflineClick(event: MouseEvent): void;
  inputRun(event: Event): void;
  onClick(event: MouseEvent): void;
}

export class FirstOrderPage extends Component<IFirstOrderPage>{
  payCard: HTMLButtonElement;
  payCash: HTMLButtonElement;
  addressInput: HTMLInputElement;
  nextScreenButton: HTMLButtonElement;
  firstOrderPageError: HTMLElement;

  constructor(container: HTMLElement, actions?: IFirstOrderPage) {
    super(container);
    this.payCard = ensureElement<HTMLButtonElement>(".by-card", container);
    if (actions?.onOnlineClick) { 
      this.payCard.addEventListener('click', actions.onOnlineClick);      
    }

    this.payCash = ensureElement<HTMLButtonElement>(".by-cash", container);
    if (actions?.onOfflineClick) { 
      this.payCash.addEventListener('click', actions.onOfflineClick);      
    }

    this.addressInput = ensureElement<HTMLInputElement>('.form__input', container);
    if (actions?.inputRun) { 
      this.addressInput.addEventListener('input', actions.inputRun);      
    }

    this.nextScreenButton = ensureElement<HTMLButtonElement>('.order__button', container);
    if (actions?.onClick) { 
      this.nextScreenButton.addEventListener('click', actions.onClick);      
    }

    this.firstOrderPageError = ensureElement<HTMLElement>('.form__errors', container);
    
  }
}