// Document ready stuff
const codigo = '#editor'

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

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


 /*para definir las clases*

 
 */
class Linea {
  constructor(colores, linea){
    this._colores = colores
    this._linea = linea
  }

  get colores(){
    return this._colores
  }

  get linea(){
    return this._linea
  }

  colorear(){
    throw "MÉTODO ABSTRACTO"
  }

  spanner(color, texto){
    return "<span style=\"color: {0}\">{1}</span>".format(color, texto) 
  }
}

class LineaAsignacion extends Linea {

  constructor(linea){
    var colores = ["red", "blue"]
    super(colores, linea)
  }

  colorear(){
    // return this.linea.izq.VARIABLE + " " + this.linea.igual + " " + this.linea.der["0"].NUMERO

    return "{0} {1} {2}\n".format(
    this.spanner(this.colores[0], this.linea.izq.VARIABLE),
    this.linea.igual, 
    this.spanner(this.colores[1], this.linea.der["0"].NUMERO))

  }
}

class LineaExpresion extends Linea {

  constructor(linea){
    var colores = ["green", "yellow"]
    super(colores, linea)
  }

  colorear(){
    return "COLOREAR DENTRO DE EXPRESION"
  }
}

class LineaWhile extends Linea {
  
  constructor(linea){
    var colores = ["blue", "yellow"]
    super(colores, linea)
  }

  colorear(){
    return "COLOREAR DENTRO DE WHILE"
  }

}
class LineaFactory {
 
  static crear_linea(linea){
    
    const tipos_linea = ["operador", "while", "igual"]
    
    var claves_linea = Object.keys(linea)

    /* Cada tipo de linea (asignacion, bucle, expresion)
    tiene por lo menos una clave en el JSON que obtenemos de la produccion
    que va a ser unica (bah, todas son unicas, no hay repetidas)
    preguntamos por alguna de esas claves, y en base a la condicion,
    creamos un objeto de la clase correspondiente */

    /**
     * TODO: Crear la clase Linea y las subclases
     * 
     * LineaAsignacion
     * LineaExpresion
     * LineaWhile
     * 
     * la clase Linea va a tener un atributo que viene a ser el color
     * y el metodo colorear() que devuelve una cadena con el texto de la linea
     * envuelto en los spans acordemente
     */
    if (/operador/i.test(claves_linea)){
      // console.log("TIPO expresion")
      return new LineaExpresion(linea)
    }else if (/while/i.test(claves_linea)){
      // console.log("TIPO while")
      return new LineaWhile(linea)
    }else{
      // console.log("TIPO asignacion")
      return new LineaAsignacion(linea)
    }
  }

}

function update() {
  var p = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
  var texto = $(codigo).html().replace(/<br>/g,'')
  .replace(/<div>/g,'\n').replace(/<\/div>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/<code>/g,'').replace(/<\/code>/g,'')
  // .replace(/<span.*>/g, '').replace(/<\/span>/g,'')

  console.log(texto)
  p.feed(texto)

  try {
    var cuerpo = p.results[0].cuerpo
    // console.log(cuerpo)
  } catch (error){}
  
  // console.log(texto)
  
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
      
      // texto.concat(LineaFactory.crear_linea(linea).colorear())
      
      console.log(cuerpo[l].linea)

    } catch (error) {
      continue
    }

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
