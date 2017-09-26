// Document ready stuff
const codigo = '#editor'
var change = 0

$(document).ready(function(){
    // cuando submiteo el form
    $('#text_form').submit(function(event){
        var position = cursor();
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
    $('#graficarBtn').on('click',graficar_derivacion)
});

var arbol
function update() {
  var p = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
  var texto = $(codigo).html().replace(/<br>/g,'')
  .replace(/<div>/g,'\n').replace(/<\/div>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/<code>/g,'').replace(/<\/code>/g,'')

  p.feed(texto)

  try {
    var cuerpo = p.results[0].cuerpo
    // console.log(JSON.stringify(cuerpo,null,2))
    // console.log(cuerpo)
  } catch (error){}
  
  if (change == 0) {
    $('#code_editor').html('')
    arbol = new Arbol()
    for (var l in cuerpo) {
      try {
        var linea = LineaFactory.crear_linea(cuerpo[l].linea)

        
        //recuperamos el html del code_editor
        texto = $("#code_editor").html()

        //le seteamos el nuevo texto al code_editor,
        //que va a ser lo que ya tenia, mas lo nuevo coloreado
        $("#code_editor")
        .html(texto.concat(linea.colorear()))

        
        arbol.addNodo(linea.grafico)

      
      } catch (error) {
        // console.log("PINCHOSE: {0}".format(error.message))
        continue
      }
    } 

    change = 1
  } else {
    change = 0
  }
}

function graficar_derivacion(){
  arbol.dibujar()
}