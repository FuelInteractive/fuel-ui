### OffCanvasMenu Selector
`alert` - `<off-canvas-menu></off-canvas-menu>`

### OffCanvasMenu Settings

  * `[origin]` _- "left" | "top" | "right" | "bottom" -
    direction to extend content from
  * `[width]` _- string - (Default: `25% / 100%`)(Optional)_ -
    Width of the extended content, forced to 100% when origin is top or bottom
  * `[height]` _- string - (Default: `25% / 100%`)(Optional)_ -
    Height of the extended content, forced to 100% when origin is left or right

### OffCanvasMenu inner content
  * What is displayed in the body of the extended content

### OffCanvasMenu Example

```html
<off-canvas-menu origin="left" width="25%" #menu>
    <div class="p-a-1">
        <h3>Menu</h3>
        <button class="btn btn-info off-canvas-menu-close">Close Menu</button>
    </div>
</off-canvas-menu>
<button class="btn btn-info" (click)="menu.toggleMenu()">Open Menu</button>
```