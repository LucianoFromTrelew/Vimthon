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
    {"name": "linea", "symbols": ["ESPACIO", "sentencia", "ESPACIO", "SALTO"], "postprocess": linea},
    {"name": "sentencia", "symbols": ["asignacion"]},
    {"name": "sentencia", "symbols": ["expresion"]},
    {"name": "sentencia", "symbols": ["bucle"]},
    {"name": "sentencia", "symbols": ["for"]},
    {"name": "bucle$string$1", "symbols": [{"literal":"w"}, {"literal":"h"}, {"literal":"i"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bucle", "symbols": ["bucle$string$1", "ESPACIO", "expresion", "ESPACIO", {"literal":":"}], "postprocess": bucle},
    {"name": "for$string$1", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "for$string$2", "symbols": [{"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "for", "symbols": ["for$string$1", "ESPACIO", "VARIABLE", "ESPACIO", "for$string$2", "ESPACIO", "VARIABLE", "ESPACIO", {"literal":":"}], "postprocess": bucleFor},
    {"name": "asignacion", "symbols": ["VARIABLE", "ESPACIO", {"literal":"="}, "ESPACIO", "expresion"], "postprocess": asignacion},
    {"name": "expresion", "symbols": ["operacion"], "postprocess": operacion},
    {"name": "expresion", "symbols": ["NUMERO"]},
    {"name": "expresion", "symbols": ["VARIABLE"]},
    {"name": "operacion", "symbols": ["aritmetica"]},
    {"name": "operacion", "symbols": ["booleana"]},
    {"name": "aritmetica", "symbols": ["expresion", "ESPACIO", "ARITMETICO", "ESPACIO", "expresion"]},
    {"name": "booleana", "symbols": ["expresion", "ESPACIO", "BOOLEANO", "ESPACIO", "expresion"]},
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
    {"name": "ESPACIO", "symbols": ["_"]},
    {"name": "SALTO", "symbols": [{"literal":"\n"}]}
]
  , ParserStart: "cuerpo"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
