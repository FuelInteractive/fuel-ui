#Fuel-UI

A set of UI components for use with Angular 2 and Bootstrap 4.

See [Fuel-UI](http://fuelinteractive.github.io/fuel-ui/) homepage for live demo and documentation.

##Dependencies
- Node
- Gulp

##Build
Execute the following commands to run the demo in your local environment. A browser window pops up with the demo running at http://localhost:8000

```
npm install
gulp
```

##Installation

####Fork our Quickstart! [https://github.com/coryshaw1/ng2-play/](https://github.com/coryshaw1/ng2-play/)

If you would like to add Fuel-UI to your Angular2 project through npm manually, do the following:

```
npm install fuel-ui font-awesome --save
```
Add this line to your dependencies in your `package.json`

```
"dependencies": {
  ...
    "bootstrap": "git://github.com/twbs/bootstrap.git#v4.0.0-alpha.2"
}
```
And finally, add the proper script tags to your `index.html`
```html
<head>
  <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css" />
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="node_modules/fuel-ui/bundles/fuel-ui.min.css" />
</head>

...

<!-- All your SystemJS, Angular2, Rx, etc. scripts first! -->
<script src="node_modules/fuel-ui/bundles/fuel-ui.min.js"></script>
```

##Components
- [Alert](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/Alert#readme)
- Carousel (documentation in progress)
- [DatePicker](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/DatePicker#readme)
- [Dropdown](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/Dropdown#readme)
- [InfiniteScroller](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/InfiniteScroller#readme)
- [Modal](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/Modal#readme)
- [Pagination](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/Pagination#readme)
- [Progressbar](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/Progress#readme)
- [Slider](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/Slider#readme)
- [TableSortable](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/TableSortable#readme)
- [Tabs](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/Tab#readme)
- [Tags](https://github.com/FuelInteractive/fuel-ui/tree/master/src/components/Tag#readme)

##Directives
- [Animation (helper)](https://github.com/FuelInteractive/fuel-ui/tree/master/src/directives/Animation#readme)
- [CodeHighlighter](https://github.com/FuelInteractive/fuel-ui/tree/master/src/directives/CodeHighlighter#readme)
- [Collapse](https://github.com/FuelInteractive/fuel-ui/tree/master/src/directives/Collapse#readme)
- [Tooltip](https://github.com/FuelInteractive/fuel-ui/tree/master/src/directives/Tooltip#readme)

##Pipes
- [Format](https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/Format#readme)
- [MapToIterable](https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/MapToIterable#readme)
- [OrderBy](https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy#readme)
- [Range](https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/Range#readme)
