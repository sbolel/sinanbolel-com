"format amd";!function(){"use strict";function e(e,t){return e.module("angularMoment",[]).constant("angularMomentConfig",{preprocess:null,timezone:"",format:null,statefulFilters:!0}).constant("moment",t).constant("amTimeAgoConfig",{withoutSuffix:!1,serverTime:null,titleFormat:null,fullDateThreshold:null,fullDateFormat:null}).directive("amTimeAgo",["$window","moment","amMoment","amTimeAgoConfig","angularMomentConfig",function(t,n,o,r,i){return function(a,u,f){function m(){var e;if(r.serverTime){var t=(new Date).getTime(),o=t-y+r.serverTime;e=n(o)}else e=n();return e}function l(){g&&(t.clearTimeout(g),g=null)}function s(e){var n=m().diff(e,"day"),o=D&&n>=D;if(u.text(o?e.format(M):e.from(m(),v)),T&&!u.attr("title")&&u.attr("title",e.local().format(T)),!o){var r=Math.abs(m().diff(e,"minute")),i=3600;1>r?i=1:60>r?i=30:180>r&&(i=300),g=t.setTimeout(function(){s(e)},1e3*i)}}function c(e){z&&u.attr("datetime",e)}function d(){if(l(),p){var e=o.preprocessDate(p,$,h);s(e),c(e.toISOString())}}var p,g=null,h=i.format,v=r.withoutSuffix,T=r.titleFormat,D=r.fullDateThreshold,M=r.fullDateFormat,y=(new Date).getTime(),$=i.preprocess,F=f.amTimeAgo,z="TIME"===u[0].nodeName.toUpperCase();a.$watch(F,function(e){return"undefined"==typeof e||null===e||""===e?(l(),void(p&&(u.text(""),c(""),p=null))):(p=e,void d())}),e.isDefined(f.amWithoutSuffix)&&a.$watch(f.amWithoutSuffix,function(e){"boolean"==typeof e?(v=e,d()):v=r.withoutSuffix}),f.$observe("amFormat",function(e){"undefined"!=typeof e&&(h=e,d())}),f.$observe("amPreprocess",function(e){$=e,d()}),f.$observe("amFullDateThreshold",function(e){D=e,d()}),f.$observe("amFullDateFormat",function(e){M=e,d()}),a.$on("$destroy",function(){l()}),a.$on("amMoment:localeChanged",function(){d()})}}]).service("amMoment",["moment","$rootScope","$log","angularMomentConfig",function(t,n,o,r){this.preprocessors={utc:t.utc,unix:t.unix},this.changeLocale=function(o,r){var i=t.locale(o,r);return e.isDefined(o)&&n.$broadcast("amMoment:localeChanged"),i},this.changeTimezone=function(e){r.timezone=e,n.$broadcast("amMoment:timezoneChanged")},this.preprocessDate=function(n,i,a){return e.isUndefined(i)&&(i=r.preprocess),this.preprocessors[i]?this.preprocessors[i](n,a):(i&&o.warn("angular-moment: Ignoring unsupported value for preprocess: "+i),!isNaN(parseFloat(n))&&isFinite(n)?t(parseInt(n,10)):t(n,a))},this.applyTimezone=function(e,t){return t=t||r.timezone,e&&t&&(e.tz?e=e.tz(t):o.warn("angular-moment: timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?")),e}}]).filter("amCalendar",["moment","amMoment","angularMomentConfig",function(e,t,n){function o(n,o){if("undefined"==typeof n||null===n)return"";n=t.preprocessDate(n,o);var r=e(n);return r.isValid()?t.applyTimezone(r).calendar():""}return o.$stateful=n.statefulFilters,o}]).filter("amDifference",["moment","amMoment","angularMomentConfig",function(e,t,n){function o(n,o,r,i,a,u){if("undefined"==typeof n||null===n)return"";n=t.preprocessDate(n,a);var f=e(n);if(!f.isValid())return"";var m;if("undefined"==typeof o||null===o)m=e();else if(o=t.preprocessDate(o,u),m=e(o),!m.isValid())return"";return t.applyTimezone(f).diff(t.applyTimezone(m),r,i)}return o.$stateful=n.statefulFilters,o}]).filter("amDateFormat",["moment","amMoment","angularMomentConfig",function(e,t,n){function o(n,o,r,i){if("undefined"==typeof n||null===n)return"";n=t.preprocessDate(n,r);var a=e(n);return a.isValid()?t.applyTimezone(a,i).format(o):""}return o.$stateful=n.statefulFilters,o}]).filter("amDurationFormat",["moment","angularMomentConfig",function(e,t){function n(t,n,o){return"undefined"==typeof t||null===t?"":e.duration(t,n).humanize(o)}return n.$stateful=t.statefulFilters,n}]).filter("amTimeAgo",["moment","amMoment","angularMomentConfig",function(e,t,n){function o(n,o,r){if("undefined"==typeof n||null===n)return"";n=t.preprocessDate(n,o);var i=e(n);return i.isValid()?t.applyTimezone(i).fromNow(r):""}return o.$stateful=n.statefulFilters,o}])}"function"==typeof define&&define.amd?define(["angular","moment"],e):"undefined"!=typeof module&&module&&module.exports?(e(angular,require("moment")),module.exports="angularMoment"):e(angular,window.moment)}();