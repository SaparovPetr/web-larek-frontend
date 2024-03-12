import {Component} from "./base/Component";
import {bem, createElement, ensureElement, cloneTemplate} from "../utils/utils";

interface IBasketActions {
  onClick: (event: MouseEvent) => void;
}

// интерфейс корзины
interface IBasket {
}



export class Basket extends Component<IBasket> {
  protected _ul: HTMLElement;
  orderButton: HTMLButtonElement;
  protected _basketCounter: HTMLElement;
 
  constructor(container: HTMLElement, actions?: IBasketActions) {
    super(container);
    this._ul = ensureElement<HTMLElement>('.basket__list', container);
    this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', container);
    this._basketCounter = ensureElement<HTMLElement>('.basket__price', container);
    
    if (actions?.onClick) {      
      this.orderButton.addEventListener('click', actions.onClick);
    }
  }

  set ul(items: HTMLElement[]) {
    this._ul.replaceChildren(...items);
  }

  set counter(value: number) {
    this.setText(this._basketCounter, String(`${value} синапсов`));
  }


}
