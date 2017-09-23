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



    const cuerpo = (data, index, reject) => {

        return {
            cuerpo:data[1]
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

    const numero = (data, index, reject) => {

        return {
            numero:data.join("")
        }
    };

    const variable = (data, index, reject) => {

        return {
            variable:data.join().replace(/,/g, ''),
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
    {"name": "cuerpo$ebnf$1", "symbols": []},
    {"name": "cuerpo$ebnf$1", "symbols": ["cuerpo$ebnf$1", "linea"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cuerpo", "symbols": ["ESPACIO", "cuerpo$ebnf$1", "ESPACIO"], "postprocess": cuerpo},
    {"name": "linea", "symbols": ["ESPACIO", "sentencia", "ESPACIO", {"literal":"\n"}], "postprocess": linea},
    {"name": "linea", "symbols": ["ESPACIO", {"literal":"\n"}]},
    {"name": "sentencia", "symbols": ["asignacion"]},
    {"name": "sentencia", "symbols": ["expresion"]},
    {"name": "sentencia", "symbols": ["bucle"]},
    {"name": "bucle$string$1", "symbols": [{"literal":"w"}, {"literal":"h"}, {"literal":"i"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bucle", "symbols": ["bucle$string$1", "ESPACIO", "expresion", {"literal":":"}], "postprocess": bucle},
    {"name": "asignacion", "symbols": ["variable", "ESPACIO", {"literal":"="}, "ESPACIO", "expresion"], "postprocess": asignacion},
    {"name": "expresion", "symbols": ["operacion"]},
    {"name": "expresion", "symbols": ["numero"], "postprocess": expresion},
    {"name": "expresion", "symbols": ["variable"], "postprocess": expresion},
    {"name": "operacion", "symbols": ["aritmetica"]},
    {"name": "operacion", "symbols": ["booleana"]},
    {"name": "aritmetica", "symbols": ["expresion", "ESPACIO", "aritmetico", "ESPACIO", "expresion"], "postprocess": operacion},
    {"name": "booleana", "symbols": ["expresion", "ESPACIO", "booleano", "ESPACIO", "expresion"], "postprocess": operacion},
    {"name": "numero$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "numero$ebnf$1", "symbols": ["numero$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "numero", "symbols": ["numero$ebnf$1"], "postprocess": numero},
    {"name": "variable$ebnf$1", "symbols": []},
    {"name": "variable$ebnf$1", "symbols": ["variable$ebnf$1", /[_a-zA-Z0-9-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variable", "symbols": [/[_a-zA-Z]/, "variable$ebnf$1"], "postprocess": variable},
    {"name": "operador", "symbols": ["aritmetico"]},
    {"name": "operador", "symbols": ["booleano"]},
    {"name": "aritmetico", "symbols": [{"literal":"+"}]},
    {"name": "aritmetico", "symbols": [{"literal":"-"}]},
    {"name": "aritmetico", "symbols": [{"literal":"*"}]},
    {"name": "aritmetico", "symbols": [{"literal":"/"}]},
    {"name": "booleano$string$1", "symbols": [{"literal":"a"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "booleano", "symbols": ["booleano$string$1"]},
    {"name": "booleano$string$2", "symbols": [{"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "booleano", "symbols": ["booleano$string$2"]},
    {"name": "booleano", "symbols": [{"literal":">"}]},
    {"name": "booleano", "symbols": [{"literal":"<"}]},
    {"name": "booleano$string$3", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "booleano", "symbols": ["booleano$string$3"]},
    {"name": "booleano$string$4", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "booleano", "symbols": ["booleano$string$4"]},
    {"name": "booleano$string$5", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "booleano", "symbols": ["booleano$string$5"]},
    {"name": "booleano$string$6", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "booleano", "symbols": ["booleano$string$6"]},
    {"name": "ESPACIO", "symbols": ["_"]}
]
  , ParserStart: "cuerpo"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
