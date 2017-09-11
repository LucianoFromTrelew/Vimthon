#asingacion -> variable "=" expresion
#expresion -> 
#        expresion operand expresion
#    |   variable
#    |   numero
#    |   boolean
#    |   "not" expresion
#    
#operand ->
#        "+"
#    |   "-"
#    |   "*"
#    |   "/"
#    |   "=="
#    |   "!="
#    |   "and"
#    |   "or"
#
# Esto incluya la produccion _ te permite ningún o varios espacios en blanco
@builtin "whitespace.ne"

sentencia -> asignacion

asignacion -> variable _ "=" _ expresion {%
    function(data){
        return {
            variable:data[0],
            igual:data[2],
            expresion:data[4]
        }
    }
%}

expresion -> 
        expresion _ operador _ expresion {%
            function(data){
                return {
                    operando1:data[0],
                    operador: data[2],
                    operando2:data[4]
                }
            }
        %}
    |   numero _ 
    |   variable _

variable -> [_a-zA-Z] ([_a-zA-Z0-9]):*

operador ->
        "+"
    |   "-"
    |   "*"
    |   "/"

numero -> [0-9]:+ {% 
    function(data){
        return {
            numero:data.join("").replace(/,/g,"")
        }
    }
%}
