import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operator/map';
var obs = new Observable((sub) => {
    var i = 0;
    setInterval(_ => sub.next(++i), 1000);
});
map.call(obs, (i) => `${i} seconds elapsed`).subscribe((msg) => console.log(msg));
// #enddocregion
