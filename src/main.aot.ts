import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { decorateModuleRef } from './environment';
import { FuelUiDemoModuleNgFactory } from './compiled/src/demo/index.ngfactory';

export function main(): Promise<any> {
  return platformBrowser()
    .bootstrapModuleFactory(FuelUiDemoModuleNgFactory)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}
