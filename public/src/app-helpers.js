String.prototype.condense = function(){
  return this.replace(/(\r\n|\n|\r)/gm,"");
}