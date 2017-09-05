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
    {"name": "sentencia", "symbols": ["expression"]},
    {"name": "asignacion", "symbols": ["variable", "_", {"literal":"="}, "_", "expression"]},
    {"name": "expression", "symbols": ["expression", "_", {"literal":"+"}, "_", "expression", "_", "end"]},
    {"name": "expression", "symbols": ["number", "_"]},
    {"name": "expression", "symbols": ["variable", "_"]},
    {"name": "variable", "symbols": ["begin", "resto"]},
    {"name": "begin", "symbols": [/[_a-zA-Z]/]},
    {"name": "resto", "symbols": ["caracter"]},
    {"name": "resto", "symbols": ["end"]},
    {"name": "caracter", "symbols": [/[_a-zA-Z0-9]/]},
    {"name": "end", "symbols": []},
    {"name": "end", "symbols": [{"literal":"\n"}]},
    {"name": "number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$1", "symbols": ["number$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number", "symbols": ["number$ebnf$1"]}
]
  , ParserStart: "sentencia"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
