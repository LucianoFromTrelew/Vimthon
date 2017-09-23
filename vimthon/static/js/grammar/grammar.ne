@builtin "whitespace.ne"

#las funciones de postprocesamiento reciben tres cosas
#    1) lista de todos los tokens matcheados
#    2) indice donde se encontro la regla de produccion
#    3) valor sentinela para rechazar el valor

#https://medium.com/@gajus/parsing-absolutely-anything-in-javascript-using-earley-algorithm-886edcc31e5e
#http://hardmath123.github.io/earley.html#comment-toggle

@{%

    const cuerpo = (data, index, reject) => {

        return {
            cuerpo:data[0]
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

    const NUMERO = (data, index, reject) => {

        return {
            NUMERO:data.join("")
        }
    };

    const VARIABLE = (data, index, reject) => {

        return {
            VARIABLE:data.join().replace(/,/g, ''),
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

cuerpo -> linea:* {% cuerpo %}

linea -> 
        ESPACIO sentencia ESPACIO "\n" {% linea %}

sentencia -> asignacion
    | expresion 
    | bucle

bucle -> "while" ESPACIO expresion ":" {% bucle %}

asignacion -> VARIABLE ESPACIO "=" ESPACIO expresion {% asignacion %}

expresion -> 
        operacion
    |   NUMERO {% expresion %}
    |   VARIABLE {% expresion %}

operacion -> 
        aritmetica 
    |   booleana    
    
aritmetica -> expresion ESPACIO ARITMETICO ESPACIO expresion {% operacion %}
booleana -> expresion ESPACIO BOOLEANO ESPACIO expresion {% operacion %}

NUMERO -> [0-9]:+ {% NUMERO %}

VARIABLE -> [_a-zA-Z] [_a-zA-Z0-9-]:* {% VARIABLE %}

ARITMETICO ->
        "+"
    |   "-"
    |   "*"
    |   "/" 

BOOLEANO ->
        "and"
    |   "or"
    |   ">"
    |   "<"
    |   ">="
    |   "<="
    |   "=="
    |   "!="

ESPACIO -> _ 
