// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "sentencia", "symbols": ["asignacion"]},
    {"name": "asignacion", "symbols": ["variable", "_", {"literal":"="}, "_", "expresion"], "postprocess": 
        function(data){
            return {
                variable:data[0],
                igual:data[2],
                expresion:data[4]
            }
        }
        },
    {"name": "expresion", "symbols": ["expresion", "_", "operador", "_", "expresion"], "postprocess": 
        function(data){
            return {
                operando1:data[0],
                operador: data[2],
                operando2:data[4]
            }
        }
                },
    {"name": "expresion", "symbols": ["numero", "_"]},
    {"name": "expresion", "symbols": ["variable", "_"]},
    {"name": "variable$ebnf$1", "symbols": []},
    {"name": "variable$ebnf$1$subexpression$1", "symbols": [/[_a-zA-Z0-9]/]},
    {"name": "variable$ebnf$1", "symbols": ["variable$ebnf$1", "variable$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variable", "symbols": [/[_a-zA-Z]/, "variable$ebnf$1"]},
    {"name": "operador", "symbols": [{"literal":"+"}]},
    {"name": "operador", "symbols": [{"literal":"-"}]},
    {"name": "operador", "symbols": [{"literal":"*"}]},
    {"name": "operador", "symbols": [{"literal":"/"}]},
    {"name": "numero$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "numero$ebnf$1", "symbols": ["numero$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "numero", "symbols": ["numero$ebnf$1"], "postprocess":  
        function(data){
            return {
                numero:data.join("").replace(/,/g,"")
            }
        }
        }
]
  , ParserStart: "sentencia"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
