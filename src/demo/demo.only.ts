import {Component} from "@angular/core";

@Component({
    template: `
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h2 class="display-3">Fuel-UI</h2>
            <p class="lead">Fuel-UI is a collection of native <a href="http://angular.io" target="_blank">Angular 2</a> components, directives, and pipes for <a href="http://v4-alpha.getbootstrap.com/" target="_blank">Bootstrap 4</a>.</p>
            
            <a href="https://github.com/FuelInteractive/fuel-ui/releases" target="_blank" class="btn btn-fuel">Download <i class="fa fa-download"></i></a> 
            <a href="https://github.com/FuelInteractive/fuel-ui" target="_blank" class="btn btn-fuel">View on GitHub <i class="fa fa-external-link"></i></a> 
            <a href="https://www.npmjs.com/package/fuel-ui" target="_blank" class="btn btn-fuel">View npm Package <i class="fa fa-external-link"></i></a>
        </div>
    </div>
    
    <p>Fuel-UI is developed by <a href="http://fueltravel.com" target="_blank">Fuel Travel</a>, a company with years of expertise in the travel marketing industry. For project news and updates, follow us on <a href="http://twitter.com/fueltravel" target="_blank">twitter</a>.</p>`
})
export class DemoHome {
    
}

@Component({
    template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Installation</h2>
            <p class="card-text">
                Fork our Quickstart! <a href="https://github.com/coryshaw1/ng2-play/" target="_blank">https://github.com/coryshaw1/ng2-play/</a><br/>
                Fork our angular-cli Quickstart! <a href="https://github.com/FuelInteractive/fuel-ui-cli-quickstart/" target="_blank">https://github.com/FuelInteractive/fuel-ui-cli-quickstart/</a>
            </p>
        </div>
    </div>
</div>

<accordion>
    <div accordion-item class="fuel-ui-accordion" #manually [open]="true">
        <div accordion-heading class="fuel-ui-accordion-heading fuel-ui-clickable">
            Manually
            <i class="pull-right fa"
                [ngClass]="{'fa-chevron-down': manually?.open, 'fa-chevron-right': !manually || !manually.open}"></i>
        </div>
        <div class="fuel-ui-accordion-body">
            <p>If you would like to add Fuel-UI to your Angular2 project through npm manually, do the following:</p>
               
<pre>
<code class="language-bash" code-highlight>
npm install fuel-ui font-awesome bootstrap@^4.0.0-alpha.2 --save
</code>
</pre>

            <p>Then simply add the proper script tags to your <code>index.html</code></p>
                        
<pre>
<code class="language-markup" code-highlight>
&lt;head&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/font-awesome/css/font-awesome.min.css&quot; /&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/bootstrap/dist/css/bootstrap.min.css&quot; /&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/fuel-ui/bundles/fuel-ui.min.css&quot; /&gt;
&lt;/head&gt;

...

&lt;!-- All your SystemJS, Angular2, Rx, etc. scripts first! --&gt;
&lt;script src=&quot;node_modules/fuel-ui/bundles/fuel-ui.min.js&quot;&gt;&lt;/script&gt;
</code>
</pre>
        </div>
    </div>
    <div accordion-item class="fuel-ui-accordion" #manuallyCli>
        <div accordion-heading class="fuel-ui-accordion-heading fuel-ui-clickable">
            Manually with <a href="https://github.com/angular/angular-cli">angular-cli</a>
            <i class="pull-right fa"
                [ngClass]="{'fa-chevron-down': manuallyCli?.open, 'fa-chevron-right': !manuallyCli || !manuallyCli.open}"></i>
        </div>
        <div class="fuel-ui-accordion-body">
<pre>
<code class="language-bash" code-highlight>
ng new example-project
cd example-project
npm install fuel-ui font-awesome bootstrap@^4.0.0-alpha.2 --save
</code>
</pre>

            <p>Go to your <code>angular-cli-build.js</code> file, and add the following to your <code>vendorNpmFiles</code> array:</p>

<pre>
<code class="language-markup" code-highlight>
'bootstrap/**/bootstrap.min.css',
'font-awesome/**/font-awesome.min.css',
'font-awesome/fonts/*',
'fuel-ui/bundles/*'
</code>
</pre>

            <p>Now build the project to copy over the necessary files to your vendor directory</p>

<pre>
<code class="language-markup" code-highlight>
ng build
</code>
</pre>

            <p>Then simply add the proper script tags to your <code>index.html</code></p>

<pre>
<code class="language-markup" code-highlight>
&lt;head&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;vendor/font-awesome/css/font-awesome.min.css&quot; /&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;vendor/bootstrap/dist/css/bootstrap.min.css&quot; /&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;vendor/fuel-ui/bundles/fuel-ui.min.css&quot; /&gt;
&lt;/head&gt;

...

&lt;!-- All your SystemJS, Angular2, Rx, etc. scripts first! --&gt;
&lt;script src=&quot;vendor/fuel-ui/bundles/fuel-ui.min.js&quot;&gt;&lt;/script&gt;
</code>
</pre>
        </div>
    </div>
</accordion>`
})
export class InstallationComponent {
    
}