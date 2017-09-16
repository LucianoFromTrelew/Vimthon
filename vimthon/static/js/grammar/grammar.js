// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

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

    function spanner(color, texto){
        var inicio_span = "<span style:'color: {0}'>".format(color) 
        return inicio_span + texto + "</span>"
    }

    const asignacion = (data, index, reject) => {

        return {
            variable:spanner("red", eval(data[0])),
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
    {"name": "expresion", "symbols": ["expresion", "ESPACIO", "operador", "ESPACIO", "expresion"]},
    {"name": "expresion", "symbols": ["numero"]},
    {"name": "expresion", "symbols": ["variable"], "postprocess": expresion},
    {"name": "numero$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "numero$ebnf$1", "symbols": ["numero$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "numero", "symbols": ["numero$ebnf$1"], "postprocess": numero},
    {"name": "variable$ebnf$1", "symbols": []},
    {"name": "variable$ebnf$1", "symbols": ["variable$ebnf$1", /[_a-zA-Z0-9-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variable", "symbols": [/[_a-zA-Z]/, "variable$ebnf$1"], "postprocess": variable},
    {"name": "operador", "symbols": [{"literal":"+"}]},
    {"name": "operador", "symbols": [{"literal":"-"}]},
    {"name": "operador", "symbols": [{"literal":"*"}]},
    {"name": "operador", "symbols": [{"literal":"/"}]},
    {"name": "ESPACIO", "symbols": ["_"]}
]
  , ParserStart: "sentencia"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
