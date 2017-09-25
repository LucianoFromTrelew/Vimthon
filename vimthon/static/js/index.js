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

    dTree.init(foo,options)
});

var foo =[
{
  name: "cuerpo",                         // The name of the node
  class: "node",                          // The CSS class of the node
  textClass: "nodeText",                  // The CSS class of the text in the node
  depthOffset: 0,                         // Generational height offset
  children: [{                          // List of children nodes
    name: "linea",
    children: [
      {
      name:"izquierdo",
      children:null
    },
      {
        name:"igual"
      },
      {
        name:"izquierdo"
      }
  ]
  },
  {
    name:"linea"
  },
  {
    name:"linea"
  }
],
  extra: {}                               // Custom data passed to renderers
},
]

var options = {
  target: '#graph',
  debug: false,
  width: 600,
  height: 300,
  callbacks: {
    /*
      Callbacks should only be overwritten on a need to basis.
      See the section about callbacks below.
    */
  },
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  nodeWidth: 100,
  styles: {
    node: 'node',
    linage: 'linage',
    marriage: 'marriage',
    text: 'nodeText'
  }
}

function update() {
  var p = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
  var texto = $(codigo).html().replace(/<br>/g,'')
  .replace(/<div>/g,'\n').replace(/<\/div>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/<code>/g,'').replace(/<\/code>/g,'')

  p.feed(texto)

  try {
    var cuerpo = p.results[0].cuerpo
    console.log(JSON.stringify(cuerpo,null,2))
    console.log(cuerpo)
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