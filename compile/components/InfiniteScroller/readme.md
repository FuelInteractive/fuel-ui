# Infinite Scroller

A component to facilitate a constant model update while scrolling through a container.
This component also defines styles to allow infinite scrolling within a self contained element.

### Selector
`infinite-scroller` - `<infinite-scroller></infinite-scroller>`


### Settings

  * `(next)` - _callback_ -
    function to be called when scrolling down below the distance threshold
  * `(prev)` - _callback_ -
    function to be called when scrolling up above the distance threshold
  * `[height]` _- string - (Default: `auto`)(Optional)_ -
    Defines the height of the container with scrolling content
  * `[distance]` _- number - (Default: `100`)(Optional)_ -
    Distance in pixels from the top or bottom of the container before enacting a next or prev event
  * `[hideScrollbar]` _- boolean - (Default: `false`)(Optional)_ -
    Determines wether or not to hide the scrollbar of the container

### Inner content
  * Content to be scrolled, typically containing an iterated model using *ngFor
  * Mark individual items to be added to the content with the scroll-item class

### Example
```html
<infinite-scroller 
	(next)="infinteScrollNext()" 
	(prev)="infiniteScrollPrev()" 
	height="300"
	distance="120"
	hideScrollbar="true">
	<div *ngFor="let item of infiniteScrollItems" class="card p-a scroll-item" style="background-color: #FFF">
		<div class="card-block">
			<h4 class="card-title">Some Item</h4>
			<p class="card-text">{{item}}</p>
		</div>
	</div>
</infinite-scroller>
```