// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

    const asignacion = (data, index, reject) => {

        return {
            variable:data[0].join("").replace(/,/g,""),
            igual:data[2],
            expresion:data[4]
        }
    };

    const expresion = (data, index, reject) => {

        return {
            primer_op:data[0],
            operador:data[2],
            segundo_op:data[4]
        }
    };

    const numero = (data, index, reject) => {

        return {
            numero:parseInt(data[0].join(''), 10)
        }
    };

    const espacio = (data, index, reject) => {

        return {
            espacio:null
        }
    };

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
    {"name": "sentencia", "symbols": ["expresion"]},
    {"name": "asignacion", "symbols": ["variable", "ESPACIO", {"literal":"="}, "ESPACIO", "expresion"], "postprocess": asignacion},
    {"name": "expresion", "symbols": ["expresion", "ESPACIO", "operador", "ESPACIO", "expresion"], "postprocess": expresion},
    {"name": "expresion", "symbols": ["numero"]},
    {"name": "expresion", "symbols": ["variable"]},
    {"name": "expresion", "symbols": []},
    {"name": "numero$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "numero$ebnf$1", "symbols": ["numero$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "numero", "symbols": ["numero$ebnf$1"], "postprocess": numero},
    {"name": "variable$ebnf$1", "symbols": []},
    {"name": "variable$ebnf$1", "symbols": ["variable$ebnf$1", /[_a-zA-Z0-9-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variable", "symbols": [/[_a-zA-Z]/, "variable$ebnf$1"]},
    {"name": "operador", "symbols": [{"literal":"+"}]},
    {"name": "operador", "symbols": [{"literal":"-"}]},
    {"name": "operador", "symbols": [{"literal":"*"}]},
    {"name": "operador", "symbols": [{"literal":"/"}]},
    {"name": "ESPACIO", "symbols": ["_"], "postprocess": espacio}
]
  , ParserStart: "sentencia"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
