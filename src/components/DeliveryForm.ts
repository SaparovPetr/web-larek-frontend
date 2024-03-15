import {ensureElement} from "../utils/utils";
import {Form} from "./common/Form"
import {IEvents} from "./base/Events"
import { IDeliveryForm } from "../types";

export class DeliveryForm extends Form<IDeliveryForm> {
  protected _payCard: HTMLButtonElement;
  protected _payCash: HTMLButtonElement; 
  protected _address: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._payCard = ensureElement<HTMLButtonElement>('.by-card', container);
    if (this._payCard) {
      this._payCard.addEventListener('click', () => {
        events.emit('by-card:click');
      });
    }

    this._payCash = ensureElement<HTMLButtonElement>('.by-cash', container);
    if (this._payCash) {
      this._payCash.addEventListener('click', () => {
        events.emit('by-cash:click');
      });
    }

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();    
      this.events.emit(`${this.container.name}:submit`);
    });
    
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

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }

  makePayByCardActive(value: boolean) {
    this.toggleClass(this._payCard, 'button_alt-active', value)
  }

  makePayByCashActive(value: boolean) {
    this.toggleClass(this._payCash, 'button_alt-active', value)
  }
}
