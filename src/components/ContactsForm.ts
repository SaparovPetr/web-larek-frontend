import {Form} from "./common/Form"
import {IEvents} from "./base/Events"
import { IOrderForm } from "../types";


export class ContactsForm extends Form<IOrderForm> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();    
      this.events.emit(`${this.container.name}:submit`);
    });
  }

  set phone(value: string) {
      (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }

  set email(value: string) {
      (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  }
}