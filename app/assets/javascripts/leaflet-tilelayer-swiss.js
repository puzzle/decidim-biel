/*!
* Leaflet.TileLayer.Swiss v2.1.0
* Plugin for displaying Swiss map tiles
* © Roman Karavia | MIT License
* leaflet-tilelayer-swiss.karavia.ch
*/
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("leaflet")):"function"==typeof define&&define.amd?define(["leaflet"],n):((t=t||self).L=t.L||{},t.L.TileLayer=t.L.TileLayer||{},t.L.TileLayer.Swiss=n(t.L))}(this,(function(t){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t;void 0===Number.isFinite&&(Number.isFinite=function(t){return"number"==typeof t&&isFinite(t)});var n=1e-12;function a(t){if(!Array.isArray(t))throw new Error("Expected input to be an array.");if(t.length<2)throw new Error("Expected input to be an array with length >= 2, got "+t.length+".");if(t.some((function(t){return!Number.isFinite(t)})))throw new Error("Expected all coordinates to be finite numbers.")}function e(t,n,a){return(a/60+n)/60+t}function o(t){return 180*t/Math.PI}function r(t){return t*Math.PI/180}function i(t,n){return{apply:function(a){var e=a[0],o=a[1],r=a.slice(2);return[e+t,o+n].concat(r)},unapply:function(a){var e=a[0],o=a[1],r=a.slice(2);return[e-t,o-n].concat(r)}}}var s=i(6e5,2e5),h=s.apply,u=s.unapply,c=i(26e5,12e5),M=c.apply,p=c.unapply,f=674.374,l=15.056,d=405.346;function m(t,a){var e=1/a,i=2*e-Math.pow(e,2);return{fromCartesian:function(a){for(var e,r,s,h=a[0],u=a[1],c=a[2],M=Math.atan(u/h),p=Math.sqrt(Math.pow(h,2)+Math.pow(u,2)),f=Math.atan(c/((1-i)*p));!(Math.abs(r-e)<n);)e=r,r=t/Math.sqrt(1-i*Math.pow(Math.sin(f),2)),s=p/Math.cos(f)-r,f=Math.atan(c/((1-i*r/(r+s))*p));var l=o(f);return[o(M),l,s]},toCartesian:function(n){var a=n[0],e=n[2];void 0===e&&(e=0);var o=r(n[1]),s=r(a),h=t/Math.sqrt(1-i*Math.pow(Math.sin(o),2));return[(h+e)*Math.cos(o)*Math.cos(s),(h+e)*Math.cos(o)*Math.sin(s),(h*(1-i)+e)*Math.sin(o)]}}}var w=m(6377397.155,299.15281285),v=w.fromCartesian,y=w.toCartesian,g=m(6378137,298.257223563),b=g.fromCartesian,j=g.toCartesian,x=1/299.15281285,L=r(e(46,57,8.66)),P=r(e(7,26,22.5)),S=2*x-Math.pow(x,2),E=6377397.155*Math.sqrt(1-S)/(1-S*Math.pow(Math.sin(L),2)),I=Math.sqrt(1+S/(1-S)*Math.pow(Math.cos(L),4)),C=Math.asin(Math.sin(L)/I),T=Math.sqrt(S),q=Math.log(Math.tan(Math.PI/4+C/2))-I*Math.log(Math.tan(Math.PI/4+L/2))+I*T/2*Math.log((1+T*Math.sin(L))/(1-T*Math.sin(L)));function z(t){var n,a,e,o,i,s,h,u,c,M=[(n=j(t))[0]-f,n[1]-l,n[2]-d],p=v(M),m=(a=p[0],e=r(p[1]),o=r(a),i=I*Math.log(Math.tan(Math.PI/4+e/2))-I*T/2*Math.log((1+T*Math.sin(e))/(1-T*Math.sin(e)))+q,s=2*(Math.atan(Math.exp(i))-Math.PI/4),h=I*(o-P),u=Math.asin(Math.cos(C)*Math.sin(s)-Math.sin(C)*Math.cos(s)*Math.cos(h)),c=Math.atan(Math.sin(h)/(Math.sin(C)*Math.tan(s)+Math.cos(C)*Math.cos(h))),[E*c,E/2*Math.log((1+Math.sin(u))/(1-Math.sin(u)))]);return t.length>2?m.concat([p[2]]):m}function B(t){var a=function(a){for(var e,r,i=t[0],s=2*(Math.atan(Math.exp(t[1]/E))-Math.PI/4),h=i/E,u=Math.asin(Math.cos(C)*Math.sin(s)+Math.sin(C)*Math.cos(s)*Math.cos(h)),c=Math.atan(Math.sin(h)/(Math.cos(C)*Math.cos(h)-Math.sin(C)*Math.tan(s))),M=P+c/I,p=u;!(Math.abs(r-e)<n);)e=r,r=(Math.log(Math.tan(Math.PI/4+u/2))-q)/I+T*Math.log(Math.tan(Math.PI/4+Math.asin(T*Math.sin(p))/2)),p=2*Math.atan(Math.exp(r))-Math.PI/2;var f=o(p);return[o(M),f]}();a.push(t[2]);var e,r=[(e=y(a))[0]+f,e[1]+l,e[2]+d],i=b(r);return t.length>2?i:i.slice(0,2)}var G={project:function(t){return a(t),h(z(t))},unproject:function(t){return a(t),B(u(t))}};var k={project:function(t){return a(t),M(z(t))},unproject:function(t){return a(t),B(p(t))}},F=t.bounds([42e4,3e4],[9e5,35e4]),N=t.bounds([242e4,103e4],[29e5,135e4]);function R(n,a){return{bounds:a,project:function(a){var e=a.lng,o=a.lat,r=n.project([e,o]),i=r[0],s=r[1];return t.point(i,s)},unproject:function(a){var e=a.x,o=a.y,r=n.unproject([e,o]),i=r[0],s=r[1];return t.latLng(s,i)}}}var Z=R(G,F),A=R(k,N),O=[4e3,3750,3500,3250,3e3,2750,2500,2250,2e3,1750,1500,1250,1e3,750,650,500,250,100,50,20,10,5,2.5,2,1.5,1,.5,.25,.1];var H=t.Class.extend({includes:t.CRS,initialize:function(n){this.code=n.code,this.projection=n.projection;var a=this.projection.bounds.getBottomLeft();this.transformation=new t.Transformation(1,-a.x,-1,a.y),this.infinite=!1},scale:function(t){return 1/function(t){if(t<0)return O[0];if(t>O.length-1)return O[O.length-1];var n=Math.floor(t);if(n===t)return O[t];var a=O[n],e=O[n+1]/a;return a*Math.pow(e,t-n)}(t)},zoom:function(t){return function(t){for(var n=-1,a=0;a<O.length;a+=1)if(t>=O[a]){n=a;break}if(0===n)return 0;if(-1===n)return O.length-1;if(O[n]===t)return n;var e=O[n-1],o=O[n];return n+Math.log(o/t)/Math.log(e/o)}(1/t)},distance:function(t,n){var a=this.project(t),e=this.project(n);return a.distanceTo(e)}}),_=new H({code:"EPSG:21781",projection:Z}),D=new H({code:"EPSG:2056",projection:A}),J=t.latLngBounds(D.unproject(D.projection.bounds.min),D.unproject(D.projection.bounds.max)),K=t.latLngBounds(D.unproject(t.point(2485e3,1075e3)),D.unproject(t.point(2835e3,1295e3))),Q={"EPSG:21781":"https://wmts{s}.geo.admin.ch/1.0.0/{layer}/default/{timestamp}/21781/{z}/{y}/{x}.{format}","EPSG:2056":"https://wmts{s}.geo.admin.ch/1.0.0/{layer}/default/{timestamp}/2056/{z}/{x}/{y}.{format}"},U=t.TileLayer.extend({options:{attribution:'© <a href="https://www.swisstopo.ch/" target="_blank">Swisstopo</a>',bounds:J,crs:D,format:"jpeg",layer:"ch.swisstopo.pixelkarte-farbe",minZoom:14,maxNativeZoom:27,maxZoom:28,subdomains:"0123456789",timestamp:"current"},initialize:function(n){t.setOptions(this,n);var a=this.options.url||Q[this.options.crs.code];t.TileLayer.prototype.initialize.call(this,a,this.options)}});return t.CRS.EPSG21781=_,t.CRS.EPSG2056=D,t.TileLayer.Swiss=U,t.tileLayer.swiss=function(t){return new U(t)},t.Map.addInitHook((function(){this.options.maxBounds||this.options.crs!==_&&this.options.crs!==D||this.setMaxBounds(J)})),t.Map.include({fitSwitzerland:function(){this.fitBounds(K)}}),U}));
//# sourceMappingURL=Leaflet.TileLayer.Swiss.umd.js.map