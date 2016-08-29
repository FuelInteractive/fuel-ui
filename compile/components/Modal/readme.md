### Modal Selector
`modal` - `<modal></modal>`

### Open/Close Modal
Use the component's `showModal(displayed: boolean)` method to properly trigger the modal's display. Reference the modal using in your view to have access to the method to use.

### Modal Settings

  * `[closeButton]` _- boolean - (Default: `true`)(Optional)_ -
    Takes a boolean that causes the close button to be displayed in the top right corner
  * `[closeOnUnfocus]` _- boolean - (Default: `true`)(Optional)_-
    Takes a boolean that causes the modal to close when a user clicks outside of the modal
  * `[modalTitle]` _- string - (Default: `null`)(Optional)_ -
    The heading of the modal

### Modal inner content
  * What is displayed below the header of the modal

### Modal Example
```javascript
closeButton: boolean = true;
closeOnUnfocus: boolean = true;
modalTitle: string = 'This is a Modal';
```

```html
<modal #modal
    [closeButton]="closeButton"
    [closeOnUnfocus]="closeOnUnfocus"
    [modalTitle]="modalTitle">
    <div class="modal-body">
        <p>Body of modal...</p>
    </div>
    <div class="modal-footer">
        <button type="button"
            class="btn btn-primary"
            (click)="modal.showModal(false)">
                Close
        </button>
    </div>
</modal>
```

### Close/Open Model from a Class
```javascript
closeButton: boolean = true;
closeOnUnfocus: boolean = true;
modalTitle: string = 'This is a Modal';

toggleModal(modal:any){
    modal.showModal();
}
```

```html
<modal #modal
    [closeButton]="closeButton"
    [closeOnUnfocus]="closeOnUnfocus"
    [modalTitle]="modalTitle">
    <div class="modal-body">
        <p>Body of modal...</p>
    </div>
    <div class="modal-footer">
        <button type="button"
            class="btn btn-primary"
            (click)="modal.showModal(false)">
                Close
        </button>
    </div>
</modal>

<button type="button"
    class="btn btn-primary"
    (click)="toggleModal(modal)">
            Toggle Modal
</button>
```