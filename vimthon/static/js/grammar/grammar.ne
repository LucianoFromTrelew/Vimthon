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



    const asignacion = (data, index, reject) => {

        return {
            variable:data[0],
            igual:data[2],
            expresion:data[4]
        }
    };

    const expresion = (data, index, reject) => {

        return {
            primer_op:data[0],
            operador: data[2],
            segundo_op:data[4]
        }
    };

    const numero = (data, index, reject) => {

        return {
            numero:parseInt(data[0].join(''), 10)
        }
    };

    const variable = (data, index, reject) => {

        return {
            variable:data.join().replace(/,/g, ''),
        }
    };
%}

# las funciones de postprocesamiento de definen a parte para que quede mas prolijo el asunto

sentencia -> asignacion
    | expresion 

asignacion -> variable ESPACIO "=" ESPACIO expresion {% asignacion %}

expresion -> 
        expresion ESPACIO operador ESPACIO expresion 
    |   numero 
    |   variable {% expresion %}

numero -> [0-9]:+ {% numero %}

variable -> [_a-zA-Z] [_a-zA-Z0-9-]:* {% variable %}

operador ->
        "+"
    |   "-"
    |   "*"
    |   "/"

ESPACIO -> _ 