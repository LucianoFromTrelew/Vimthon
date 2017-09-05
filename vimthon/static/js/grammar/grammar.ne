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

expression -> number "+" number
number -> [0-9]:+