@builtin "whitespace.ne"

#las funciones de postprocesamiento reciben tres cosas
#    1) lista de todos los tokens matcheados
#    2) indice donde se encontro la regla de produccion
#    3) valor sentinela para rechazar el valor

#https://medium.com/@gajus/parsing-absolutely-anything-in-javascript-using-earley-algorithm-886edcc31e5e
#http://hardmath123.github.io/earley.html#comment-toggle

@{%
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



    const cuerpo = (data, index, reject) => {

        return {
            cuerpo:data[1]
        }
    };


    const asignacion = (data, index, reject) => {

        return {
            izquierdo:data[0],
            igual:data[2],
            derecho:data[4]
        }
    };
    const operacion = (data, index, reject) => {

        return {
            izquierdo:data[0],
            operador: data[2][0][0],
            derecho:data[4]
        }
    };

    const numero = (data, index, reject) => {

        return {
            numero:data.join("")
        }
    };

    const variable = (data, index, reject) => {

        return {
            variable:data.join().replace(/,/g, ''),
        }
    };

    const linea = (data, index, reject) => { 
        return {
            linea:data[1][0],
        }
    };

    const bucle = (data, index, reject) => { 
        return {
            while:data[0],
            condicion:data[2][0],
            dospuntos:data[3]
            
        }
    };

    const expresion = (data, index, reject) => { 
        return {
            expresion:data[0]

        }
    };
%}

# las funciones de postprocesamiento de definen a parte para que quede mas prolijo el asunto

cuerpo -> ESPACIO linea:* ESPACIO {% cuerpo %}

linea -> 
        ESPACIO sentencia ESPACIO "\n" {% linea %}
    |   ESPACIO "\n" 

sentencia -> asignacion
    | expresion 
    | bucle

bucle -> "while" ESPACIO expresion ":" {% bucle %}

asignacion -> variable ESPACIO "=" ESPACIO expresion {% asignacion %}

expresion -> 
        operacion
    |   numero {% expresion %}
    |   variable {% expresion %}

operacion -> 
        aritmetica 
    |   booleana    
    
aritmetica -> expresion ESPACIO aritmetico ESPACIO expresion {% operacion %}
booleana -> expresion ESPACIO booleano ESPACIO expresion {% operacion %}

numero -> [0-9]:+ {% numero %}

variable -> [_a-zA-Z] [_a-zA-Z0-9-]:* {% variable %}

operador -> aritmetico | booleano

aritmetico ->
        "+"
    |   "-"
    |   "*"
    |   "/" 

booleano ->
        "and"
    |   "or"
    |   ">"
    |   "<"
    |   ">="
    |   "<="
    |   "=="
    |   "!="

ESPACIO -> _ 