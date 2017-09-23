// Document ready stuff
$(document).ready(function(){
    // cuando submiteo el form
    $('#text_form').submit(function(event){
        var position = cursor();
        console.log('j')
        $.ajax({
            type: "POST",
            url: '/cursor',
            data: {
                'cursor':position,
            },
            dataType: 'json',
            success: function (data){}
       });
    });

    console.log("{0} {1}".format("hello", "world"))
    var actualizar = update()
    $('#code_editor').bind('DOMSubtreeModified', actualizar);

});



function spanner(color){
  return "<span style:'color: {0}'>".format(color) 
}
/*
 *  Lo que se me ocurre es armar un arreglo con los nombres de los miembros del JSON que nos devuelve la gramatica
 *  ir recorriendo el JSON con esos nombres, e ir envolviendo acorde
 *
 *  La que podria ser es armar un diccionario que tenga el nombre de miembro, y el color, asi pintamos segun el miembro
 *
 *  Habría que ver cómo se pueden manejar las situaciones en las que se quiere acceder a un miembro de un objeto que no tiene dicho miembro
 *  Osea, cómo atajar la excepción "AttributeError"
 * 
 * 
 *  otra cosa puede ser, recorrer el json, e ir armando una cadena con todo lo parseado, ya coloreado
 * */



function update() {
  var p = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
  // var miembros = [
  //   {"variable"}
  // ]
  function wrapper(){

    var texto = $('#code_editor').html()
    .replace(/<div>/g,'\n').replace(/<\/div>/g,'')
    .replace(/<br>/g,'')
    .replace(/<code>/g,'').replace(/<\/code>/g,'')
    // .replace(/&lt;/g, '<')+'\n'

    console.log(texto)
    p.feed(texto)

    console.log(p.results)

    // document.getElementById("code_editor").innerHTML = "<span style='color:tomato'>Paragraph changed!</span>";
    console.log(JSON.stringify(p.results, null, 2))
  

    // var keys = Object.keys(texto)
    // for (var index = 0; index < keys.length; index++) {
    //   console.log(keys[index])
    // }

    // for (var k in keys) {
    //   console.log(keys[k])
    // }
    // console.log("La expresion es " + texto["expresion"][0][0]["numero"]+ texto["expresion"][0][4]["numero"])
    // console.log(texto)
  }
  return wrapper
} 


function cursor(){
    var start = $('#editor')[0].selectionStart;
    console.log(start)
    var end = $('#editor')[0].selectionEnd;
    console.log(end)
    return (start==end) ? start : -1;
}


function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}
