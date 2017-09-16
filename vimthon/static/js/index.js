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
    $('#code_editor').bind('DOMSubtreeModified', update);

});

var update = function() {
  var p = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

  var texto = $('#code_editor').html().replace(/<code>/g,'').replace(/<\/code>/g,'').replace(/<br>/g,'').replace(/ /g,"").replace(/\n/g, "")

  p.feed(texto)
  texto = p.results[0][0]

  // document.getElementById("code_editor").innerHTML = "<span style='color:tomato'>Paragraph changed!</span>";
  console.log(JSON.stringify(texto, null, 2))
  // console.log(texto)
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