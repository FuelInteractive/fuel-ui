System.config({
	packages: {
		'@angular/common': {
			main: 'index'
		},
		'@angular/compiler': {
			main: 'index'
		},
		'@angular/core': {
			main: 'index'
		},
		'@angular/http': {
			main: 'index'
		},
		'@angular/platform-browser-dynamic': {
			main: 'index'
		},
		'@angular/platform-browser': {
			main: 'index'
		},
		'@angular/router': {
			main: 'index'
		},
		"rxjs": {
			defaultExtension: 'js'
		},
		'dist': {
			defaultExtension: 'js'
		},
	},
	paths: {
		'@angular/*': 'node_modules/@angular/*',
		"rxjs/*": "node_modules/rxjs/*",
		"reflect-metadata": "node_modules/reflect-metadata"
	},
	map: {
		"rxjs": "node_modules/rxjs"
	}
});