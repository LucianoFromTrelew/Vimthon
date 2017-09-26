var cuerpo =[
    {
      name: "cuerpo",                         // The name of the node
      class: "node",                          // The CSS class of the node
      textClass: "nodeText",                  // The CSS class of the text in the node
      depthOffset: 0,                         // Generational height offset
      children: [],
      extra: {}                               // Custom data passed to renderers
    },
    ]
    
    var opciones = {
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

class Arbol {
    constructor(){
      this._cuerpo = cuerpo
      this._opciones = opciones
    }

    addNodo(nodo){
      this._cuerpo["0"].children.push(nodo)
    }

    dibujar(){
      dTree.init(this._cuerpo, this._opciones)
    }
  }