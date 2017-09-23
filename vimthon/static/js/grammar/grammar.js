// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }


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
    {"name": "cuerpo", "symbols": ["cuerpo$ebnf$1"], "postprocess": cuerpo},
    {"name": "linea", "symbols": ["ESPACIO", "sentencia", "ESPACIO", {"literal":"\n"}], "postprocess": linea},
    {"name": "sentencia", "symbols": ["asignacion"]},
    {"name": "sentencia", "symbols": ["expresion"]},
    {"name": "sentencia", "symbols": ["bucle"]},
    {"name": "bucle$string$1", "symbols": [{"literal":"w"}, {"literal":"h"}, {"literal":"i"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bucle", "symbols": ["bucle$string$1", "ESPACIO", "expresion", {"literal":":"}], "postprocess": bucle},
    {"name": "asignacion", "symbols": ["VARIABLE", "ESPACIO", {"literal":"="}, "ESPACIO", "expresion"], "postprocess": asignacion},
    {"name": "expresion", "symbols": ["operacion"]},
    {"name": "expresion", "symbols": ["NUMERO"], "postprocess": expresion},
    {"name": "expresion", "symbols": ["VARIABLE"], "postprocess": expresion},
    {"name": "operacion", "symbols": ["aritmetica"]},
    {"name": "operacion", "symbols": ["booleana"]},
    {"name": "aritmetica", "symbols": ["expresion", "ESPACIO", "ARITMETICO", "ESPACIO", "expresion"], "postprocess": operacion},
    {"name": "booleana", "symbols": ["expresion", "ESPACIO", "BOOLEANO", "ESPACIO", "expresion"], "postprocess": operacion},
    {"name": "NUMERO$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "NUMERO$ebnf$1", "symbols": ["NUMERO$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NUMERO", "symbols": ["NUMERO$ebnf$1"], "postprocess": NUMERO},
    {"name": "VARIABLE$ebnf$1", "symbols": []},
    {"name": "VARIABLE$ebnf$1", "symbols": ["VARIABLE$ebnf$1", /[_a-zA-Z0-9-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "VARIABLE", "symbols": [/[_a-zA-Z]/, "VARIABLE$ebnf$1"], "postprocess": VARIABLE},
    {"name": "ARITMETICO", "symbols": [{"literal":"+"}]},
    {"name": "ARITMETICO", "symbols": [{"literal":"-"}]},
    {"name": "ARITMETICO", "symbols": [{"literal":"*"}]},
    {"name": "ARITMETICO", "symbols": [{"literal":"/"}]},
    {"name": "BOOLEANO$string$1", "symbols": [{"literal":"a"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEANO", "symbols": ["BOOLEANO$string$1"]},
    {"name": "BOOLEANO$string$2", "symbols": [{"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEANO", "symbols": ["BOOLEANO$string$2"]},
    {"name": "BOOLEANO", "symbols": [{"literal":">"}]},
    {"name": "BOOLEANO", "symbols": [{"literal":"<"}]},
    {"name": "BOOLEANO$string$3", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEANO", "symbols": ["BOOLEANO$string$3"]},
    {"name": "BOOLEANO$string$4", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEANO", "symbols": ["BOOLEANO$string$4"]},
    {"name": "BOOLEANO$string$5", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEANO", "symbols": ["BOOLEANO$string$5"]},
    {"name": "BOOLEANO$string$6", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEANO", "symbols": ["BOOLEANO$string$6"]},
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
