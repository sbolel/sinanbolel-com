String.prototype.condense = function(){
  'use strict';
  return this.replace(/(\r\n|\n|\r)/gm,"");
};