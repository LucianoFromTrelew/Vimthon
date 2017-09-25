
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
  
    colorear(){
      return "{0} {1} {2}\n".format(
      this.spanner(this.colores[0], this.linea.izq.VARIABLE),
      this.linea.igual, 
      this.spanner(this.colores[1], this.linea.der["0"].NUMERO))
    }

    get grafico(){
      return {
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
                    name:this.linea.izq.VARIABLE
                  }
                ]
              }
            ]
          },
          // fin izquierdo
          // igual
          {
            name:this.linea.igual 
          }, 
          {
            name:"Derecho",
            children:[
              {
                name:"NUMERO",
                children:[
                  {
                    name:this.linea.der["0"].NUMERO
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
  
    colorear(){
      var izqvariable = this.linea.op_izquierdo["0"].VARIABLE
      var izqnumero = this.linea.op_izquierdo["0"].NUMERO
      var dervariable = this.linea.op_derecho["0"].VARIABLE
      var dernumero = this.linea.op_derecho["0"].NUMERO
      return "{0} {1} {2}\n".format(
        this.spanner(this.colores[0], (izqvariable)?izqvariable:izqnumero),
        this.spanner(this.colores[1], this.linea.operador["0"]), 
        this.spanner(this.colores[0], (dervariable)?dervariable:dernumero))  
    }

    get grafico(){
      return {
        
      }
    }

  }
  
  class LineaWhile extends Linea {
    
    constructor(linea){
      var colores = ["blue", "red"]
      super(colores, linea)
    }
  
    colorear(){
      return "{0} {1}{2}\n".format(
        this.spanner(this.colores[0], this.linea.while),
        new LineaExpresion(this.linea.condicion).colorear().replace(/\n/g, ""),
        this.spanner(this.colores[1], this.linea.dospuntos)
      )
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
        return new LineaExpresion(linea)
      }else if (/while/i.test(claves_linea)){
        return new LineaWhile(linea)
      }else{
        return new LineaAsignacion(linea)
      }
    }
  
  }  