// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

var appendItem =     function (a, b) { return function (d) { return d[a].concat([d[b]]); } };
var appendItemChar = function (a, b) { return function (d) { return d[a].concat(d[b]); } };
var empty = function (d) { return null };
let Lexer = undefined;
let ParserRules = [
    {"name": "main$ebnf$1", "symbols": ["header"], "postprocess": id},
    {"name": "main$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main$ebnf$2", "symbols": []},
    {"name": "main$ebnf$2", "symbols": ["main$ebnf$2", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main$ebnf$3", "symbols": ["section"]},
    {"name": "main$ebnf$3", "symbols": ["main$ebnf$3", "section"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1", "main$ebnf$2", "main$ebnf$3"], "postprocess": function(d) {return {header:d[0], sections:d[2]}}},
    {"name": "header$ebnf$1", "symbols": ["headerline"]},
    {"name": "header$ebnf$1", "symbols": ["header$ebnf$1", "headerline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "header", "symbols": ["header$ebnf$1"], "postprocess": function(d) {return d[0]}},
    {"name": "headerline", "symbols": ["text", "newline"], "postprocess": function(d) {return d[0]}},
    {"name": "section$ebnf$1", "symbols": ["characters"], "postprocess": id},
    {"name": "section$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "section", "symbols": ["sectiontitle", "section$ebnf$1"], "postprocess": function(d) {return {title:d[0], characters: d[1]}}},
    {"name": "sectiontitle$ebnf$1", "symbols": [{"literal":"#"}]},
    {"name": "sectiontitle$ebnf$1", "symbols": ["sectiontitle$ebnf$1", {"literal":"#"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sectiontitle", "symbols": ["sectiontitle$ebnf$1", "text", "newline"], "postprocess": function(d) {return d[2]}},
    {"name": "characters$ebnf$1", "symbols": []},
    {"name": "characters$ebnf$1", "symbols": ["characters$ebnf$1", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "characters", "symbols": ["character", "characters$ebnf$1"], "postprocess": function(d) {return [d[0]]}},
    {"name": "characters$ebnf$2", "symbols": []},
    {"name": "characters$ebnf$2", "symbols": ["characters$ebnf$2", "newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "characters", "symbols": ["characters", "newline", "character", "characters$ebnf$2"], "postprocess": appendItem(0,2)},
    {"name": "character", "symbols": ["text"], "postprocess": id},
    {"name": "text", "symbols": ["char"], "postprocess": id},
    {"name": "text", "symbols": ["text", "char"], "postprocess": appendItemChar(0,1)},
    {"name": "char", "symbols": [/[^\n\r#]/], "postprocess": id},
    {"name": "newline$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "newline", "symbols": ["newline$string$1"]},
    {"name": "newline", "symbols": [{"literal":"\n"}]},
    {"name": "newline", "symbols": [{"literal":"\r"}], "postprocess": empty}
];
let ParserStart = "main";
export default { Lexer, ParserRules, ParserStart };
