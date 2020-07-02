
function Creator (selector, height, width, bg, fontSize ){

  this.selector = selector, 

  this.height = height, 

  this.width = width, 

  this.bg = bg, 

  this.fontSize = fontSize;
}


Creator.prototype.createEl = function(){

   let addEl = function(element, selector, height, width, bg, fontSize){
    element.style.cssText ='height:'+height+"px; width:"+width+ "px; background:"+bg+"; font-size:"+fontSize+"px;";
    document.body.appendChild(element);
   };
   

  if(this.selector[0]==='.'){
    let element = document.createElement('div');
    element.classList.add(this.selector.substring(1));
    addEl(element, this.selector, this.height, this.width, this.bg, this.fontSize);

  }else if(this.selector[0]==='#'){
    let element = document.createElement('p');
    element.id = (this.selector.substring(1));
    addEl(element, this.selector, this.height, this.width, this.bg, this.fontSize);
  } 

};

Creator.prototype.writeEl = function(text){

 let elText = document.querySelector(this.selector);
 elText.textContent = text;

};

let El1 = new Creator(".block",50,300,"#fc0",14);
let El2 = new Creator("#best",50,300,"red",14);

El1.createEl();
El2.createEl();

El1.writeEl("тест1");
El2.writeEl("тест2");