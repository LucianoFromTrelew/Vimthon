// Document ready stuff
const codigo = '#editor'
var change = 0
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

    $(codigo).bind('DOMSubtreeModified', update);

});


function update() {
  var p = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
  var texto = $(codigo).html().replace(/<br>/g,'')
  .replace(/<div>/g,'\n').replace(/<\/div>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/<code>/g,'').replace(/<\/code>/g,'')

  console.log(texto)
  p.feed(texto)

  try {
    var cuerpo = p.results[0].cuerpo
  } catch (error){}
  
  if (change == 0) {
    $('#code_editor').html('')
    for (var l in cuerpo) {
      try {
        var linea = cuerpo[l].linea
        
        //recuperamos el html del code_editor
        texto = $("#code_editor").html()

        //le seteamos el nuevo texto al code_editor,
        //que va a ser lo que ya tenia, mas lo nuevo coloreado
        $("#code_editor")
        .html(texto.concat(LineaFactory
        .crear_linea(linea).colorear()))
      
      } catch (error) {
        continue
      }
    } 

    change = 1
  } else {
    change = 0
  }
} 


function cursor(){
    var start = $('#editor')[0].selectionStart;
    console.log(start)
    var end = $('#editor')[0].selectionEnd;
    console.log(end)
    return (start==end) ? start : -1;
}


// function getCaretPosition(editableDiv) {
// var caretPos = 0,
//     sel, range;
//   if (window.getSelection) {
//     sel = window.getSelection();
//     if (sel.rangeCount) {
//       range = sel.getRangeAt(0);
//       if (range.commonAncestorContainer.parentNode == editableDiv) {
//         caretPos = range.endOffset;
//       }
//     }
//   } else if (document.selection && document.selection.createRange) {
//     range = document.selection.createRange();
//     if (range.parentElement() == editableDiv) {
//       var tempEl = document.createElement("span");
//       editableDiv.insertBefore(tempEl, editableDiv.firstChild);
//       var tempRange = range.duplicate();
//       tempRange.moveToElementText(tempEl);
//       tempRange.setEndPoint("EndToEnd", range);
//       caretPos = tempRange.text.length;
//     }
//   }
//   return caretPos;
// }
