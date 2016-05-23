var clicks = 0;
var store = [];
var open1;
var open2;
var count = 0;
var h4 = document.getElementById("count");
var sound = [];
sound.push(document.getElementById("bir"));
sound.push(document.getElementById("mor"));
sound.push(document.getElementById("hds"));
sound.push(document.getElementById("out"));


function load(){
  sound[2].play();
  for (var i = 0; i < 500000000; i++) {  }
  h4.textContent = "0";


  var r = "r";
  var c = "c";
  var image = [];

  for (var i = 1; i <= 8; i++) {
    image.push("img/"+i);
  }

  for (var i = 1; i <= 8; i++) {
    image.push("img/"+i+"c");
  }

  for (var i = 1; i <= 16; i++) {
    var card = document.getElementById(i);
    var style = document.createAttribute("style");
    var empty = document.createAttribute("style");
    var index = Math.floor(Math.random() * image.length);
    var imid = image.splice(index,1);
    var obj = [];

    style.value = "background-image:url("+imid+".jpg)";
    empty.value = "background-image:none;background-color: rgb(0,193,100);";

    obj.id = i;
    obj.style = style;
    obj.imid = imid;
    obj.empty = empty;
    store.push(obj);

    card.setAttributeNode(empty);

  }
}


function show(id){
  var card = document.getElementById(id);
  var obj = store[parseInt(id)-1];

  sound[0].play();

  open2 = open1;
  open1 = obj;
  clicks ++;
  if (clicks == 2){
    var s1 = open1.imid;
    var s2 = open2.imid;
    var s1c = open1.imid + "c";
    var s2c = open2.imid + "c";

    if(s1 == s2c || s2 == s1c){
      open1.empty.value = open1.style.value;
      open2.empty.value = open2.style.value;

      sound[1].play();
      count++;
      h4.textContent = count;

      if (count >= 8){
        sound[3].play();
        for (var i = 0; i < 500000000; i++) {  }

        load();
      }
    }
  }
  else if (clicks > 2) {
    for (var i = 1; i <= 16; i++) {
      var c = document.getElementById(i);
      var a = document.createAttribute("style");
      var o = store[i-1];


      c.setAttributeNode(o.empty);
    }
    clicks = 1;
  }
  card.setAttributeNode(obj.style);

}
