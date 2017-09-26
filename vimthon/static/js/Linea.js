
/*
 *  Lo que se me ocurre es armar un arreglo con los nombres de los miembros del JSON que nos devuelve la gramatica
 *  ir recorriendo el JSON con esos nombres, e ir envolviendo acorde
 *
 *  La que podria ser es armar un diccionario que tenga el nombre de miembro, y el color, asi pintamos segun el miembro
 *
 *  Habría que ver cómo s e pueden manejar las situaciones en las que se quiere acceder a un miembro de un objeto que no tiene dicho miembro
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

    get grafico(){
      throw "METODO ABSTRACTO"
    }
  }
  
  class LineaAsignacion extends Linea {
  
    constructor(linea){
      var colores = ["red", "blue"]
      super(colores, linea)
    }

    get variable(){
      return this.linea.izq.VARIABLE
    }

    get igual(){
      return this.linea.igual
    }

    get asignacion(){
      return this.linea.der["0"].NUMERO
    }
  
    colorear(){
      return "{0} {1} {2}\n".format(
      this.spanner(this.colores[0], this.variable),
      this.igual, 
      this.spanner(this.colores[1], this.asignacion))
    }

    get grafico(){
      
      return{ 
        name: "linea",
        children:[
          {
            name:"Asignación",
            children:[
              // izquierdo
              {
                name:"Izquierdo",
                children:[
                  {
                    name:"VARIABLE",
                    children:[
                      {
                        name: this.variable
                      }
                    ]
                  }
                ]
              },
              // fin izquierdo
              // igual
              {
                name:this.igual
              }, 
              {
                name:"Derecho",
                children:[
                  {
                    name:"NUMERO",
                    children:[
                      {
                        name:this.asignacion
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
  
  class LineaExpresion extends Linea {
  
    constructor(linea){
      var colores = ["green", "red"]
      super(colores, linea)
    }
  
    get op_izquierdo(){
      return this.linea.op_izquierdo["0"].VARIABLE ?
      this.linea.op_izquierdo["0"].VARIABLE :
      this.linea.op_izquierdo["0"].NUMERO
    }

    get operador(){
      return this.linea.operador["0"]
    }
    get op_derecho(){
      return this.linea.op_derecho["0"].VARIABLE ?
      this.linea.op_derecho["0"].VARIABLE :
      this.linea.op_derecho["0"].NUMERO      
    }
    colorear(){
      return "{0} {1} {2}\n".format(
        this.spanner(this.colores[0], this.op_izquierdo),
        this.spanner(this.colores[1], this.operador), 
        this.spanner(this.colores[0], this.op_derecho))  
    }

    get grafico(){
      return{
        name:"linea",
        children: [
          
          {
            name: "Expresión",
            children: [
              {
                name: "op_izquierdo",
                children:[
                  {
                    name: this.op_izquierdo
                  }
                ]
              },
              {
                name: this.operador
              },
              {
                name: "op_derecho",
                children: [
                  {
                    name: this.op_derecho
                  }
                ]
              }
            ]
          }

        ]
      } 
          
    }

  }
  
  class LineaWhile extends Linea {
    
    constructor(linea){
      var colores = ["blue", "red"]
      super(colores, linea)
    }

    get while(){
      return this.linea.while
    }

    get condicion(){
      return new LineaExpresion(this.linea.condicion)
    }
  
    get dospuntos(){
      return this.linea.dospuntos
    }

    colorear(){
      return "{0} {1}{2}\n".format(
        this.spanner(this.colores[0], this.while),
        this.condicion.colorear().replace(/\n/g, ""),
        this.spanner(this.colores[1], this.dospuntos)
      )
    }

    get grafico(){
      return{
        name:"linea",
        children: [
          
          {
            name:"While",
            children:[
              {
                name:this.while
              },
              {
                name:"Condición",
                children: this.condicion.grafico.children
              },
              {
                name:this.dospuntos
              },
            ]
          }

        ]    
      }
    }
  
  }

  class LineaFor extends Linea{
    
    constructor(linea){
      var colores = ["blue", "red", "green"]
      super(colores, linea)
    }

    get for(){
      return this.linea.for
    }
    get in(){
      return this.linea.in
    }
    get dospuntos(){
      return this.linea.dospuntos
    }

    get iterable(){
      return this.linea.iterable.VARIABLE
    }

    get variable(){
      return this.linea.variable.VARIABLE
    }

    colorear(){
      return "{0} {1} {2} {3}{4}\n".format(
        this.spanner(this.colores[0], this.for),
        this.spanner(this.colores[1], this.variable),
        this.in,
        this.spanner(this.colores[2], this.iterable),
        this.spanner(this.colores[1], this.dospuntos)
      )
    }

    get grafico(){

      return{
        name: "linea",
        children:[
          {
            name: this.for
          },
          {
            name: this.variable
          },
          {
            name: this.in
          },
          {
            name: this.iterable
          },
          {
            name: this.dospuntos
          },
        ]
      }
    }

  }
  class LineaFactory {
   
    static crear_linea(linea){
      
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
        return new LineaExpresion(linea)
      }else if (/while/i.test(claves_linea)){
        return new LineaWhile(linea)
      }else if (/for/i.test(claves_linea)){
        return new LineaFor(linea)
      }else{
        return new LineaAsignacion(linea)
      }
    }
  
  }  