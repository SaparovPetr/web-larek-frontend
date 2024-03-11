import {Component} from "./base/Component";
import {bem, createElement, ensureElement, ensureAllElements, cloneTemplate} from "../utils/utils";


// interface IFirstOrderPageActions {
//   onClick: (event: MouseEvent) => void;  
// }

// interface IChooseOnline {
//   onOnlineClick: (event: MouseEvent) => void;  
// }

// interface IChooseOffline {
//   onOfflineClick: (event: MouseEvent) => void;  
// }

interface IFirstOrderPage {  
  onOnlineClick(event: MouseEvent): void;
  onOfflineClick(event: MouseEvent): void;
  inputRun(event: Event): void;
  onClick(event: MouseEvent): void;
}

// export type TabState = {
//   selected: string
// };
// export type TabActions = {
//   onClick: (tab: string) => void
// }



export class FirstOrderPage extends Component<IFirstOrderPage>{
  payCard: HTMLButtonElement;
  payCash: HTMLButtonElement;
  addressInput: HTMLInputElement;
  nextScreenButton: HTMLButtonElement;

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

  }
}





// export class Tabs extends Component<TabState> {
//   protected _buttons: HTMLButtonElement[];

//   constructor(container: HTMLElement, actions?: TabActions) {
//       super(container);

//       this._buttons = ensureAllElements<HTMLButtonElement>('.button', container);

//       this._buttons.forEach(button => {
//           button.addEventListener('click', () => {
//               actions?.onClick?.(button.name);
//           });
//       })
//   }

//   set selected(name: string) {
//       this._buttons.forEach(button => {
//           this.toggleClass(button, 'tabs__item_active', button.name === name);
//           this.setDisabled(button, button.name === name)
//       });
//   }
// }