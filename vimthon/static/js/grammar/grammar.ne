#asingacion -> variable "=" expression
#expression -> 
#        expression operand expression
#    |   variable
#    |   number
#    |   boolean
#    |   "not" expression
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

sentencia -> asignacion | expression

asignacion -> variable _ "=" _ expression

expression -> 
        expression _ "+" _ expression _ end
    |   number _
    |   variable _

variable -> begin resto

begin -> [_a-zA-Z]  

resto -> caracter | end

caracter -> [_a-zA-Z0-9]

end -> null | "\n"

number -> [0-9]:+