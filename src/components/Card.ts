import {Component} from "./base/Component";
import {bem, createElement, ensureElement} from "../utils/utils";
import {IItemData} from "../types/index"


interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IItemData> {
  protected _category?: HTMLElement;
  protected _title: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _price: HTMLElement;

  constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
    if (actions?.onClick) {      
      container.addEventListener('click', actions.onClick);
    }
  }
  
  set id(value: string) {
    this.container.dataset.id = value;
  }
  get id(): string {
    return this.container.dataset.id || '';
  }

  set title(value: string) {
    this.setText(this._title, value);
  }
  get title(): string {
    return this._title.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }
  get image(): string {
    return this._image.src || '' && this._image.alt || '';
  }

  
  set category (value: string) {
    this.setText(this._category, value)
    
    if (value === "софт-скил") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_soft')
    } else if (value === "другое") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_other')
    } else if (value === "дополнительное") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_additional')
    } else if (value === "кнопка") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_button')
    } else if (value === "хард-скил") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_hard')
    }
  }
  get category(): string {
    return this._category.textContent || '';
  }

  set price (value: number | null) {
    if (typeof value === "number") {
      this.setText(this._price, `${value} синапсов`);
    } else {
      this.setText(this._price, "Бесценно");      
    }    
  }  
}

// карточка главной
export class CatalogItem extends Card {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);
  }
}

// карточка превью
export class PreviewItem extends Card {
  protected _description: HTMLElement;
  basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);  
    this._description = ensureElement<HTMLElement>('.card__text', container);
    
    this.basketButton = ensureElement<HTMLButtonElement>('.card__button', container);
    if (actions?.onClick) { 
      container.removeEventListener('click', actions.onClick);   
      this.basketButton.addEventListener('click', actions.onClick);      
    }
  }

  set description(value: string) {
    this.setText(this._description, value)
  }   
}


// карточка в корзине 
export class ShortItem extends Component<IItemData> {
  protected _itemIndex: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _basketDeleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._itemIndex  = ensureElement<HTMLElement>('.basket__item-index', container);
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._basketDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    if (actions?.onClick) { 
      this._basketDeleteButton.addEventListener('click', actions.onClick);      
    }
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price (value: number | null) {
    if (typeof value === "number") {
      this.setText(this._price, `${value} синапсов`);
    } else {
      this.setText(this._price, "Бесценно");      
    }    
  } 

  set itemIndex(value: number) {
    this.setText(this._itemIndex, value);
  }


}

  

  





































































