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
            izq:data[0],
            igual:data[2],
            der:data[4]
        }
    };
    const operacion = (data, index, reject) => {

        return {
            op_izquierdo:data[0][0][0],
            operador: data[0][0][2],
            op_derecho:data[0][0][4]
        }
    };

    const NUMERO = (data, index, reject) => {

        return {
            NUMERO:data.join().replace(/,/g, '')
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
            condicion:data[2],
            dospuntos:data[4]
        }
    };

    const bucleFor = (data, index, reject) => { 
        return {
            for:data[0],
            variable:data[2],
            in:data[4],
            iterable:data[6],
            dospuntos:data[8]
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
        ESPACIO sentencia ESPACIO SALTO {% linea %}

sentencia -> asignacion
    | expresion 
    | bucle
    | for


bucle -> "while" ESPACIO expresion ESPACIO ":" {% bucle %}

for -> "for" ESPACIO VARIABLE ESPACIO "in" ESPACIO VARIABLE ESPACIO ":" {% bucleFor %}

asignacion -> VARIABLE ESPACIO "=" ESPACIO expresion {% asignacion %}

expresion -> 
        operacion {% operacion %}
    |   NUMERO
    |   VARIABLE

operacion -> 
        aritmetica 
    |   booleana    
    
aritmetica -> expresion ESPACIO ARITMETICO ESPACIO expresion 
booleana -> expresion ESPACIO BOOLEANO ESPACIO expresion

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

SALTO -> "\n"
