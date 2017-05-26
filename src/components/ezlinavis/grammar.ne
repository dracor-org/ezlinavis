main -> section:+ {% function(d) {return {sections:d[0]}} %}

section -> sectiontitle:+ characters:? {% function(d) {return {title:d[0], characters: d[1]}} %}

sectiontitle -> "#":+ " ":+ text newline {% function(d) {return d[2]} %}

characters -> character newline:* {% function(d) {return [d[0]]} %}
            | characters newline character newline:* {% appendItem(0,2) %}

character -> text {% id %}

text -> char {% id %}
      | text char {% appendItemChar(0,1) %}

char -> [^\n\r#,] {% id %}

newline -> "\r\n" | "\n" | "\r" {% empty %}


@{%
var appendItem =     function (a, b) { return function (d) { return d[a].concat([d[b]]); } };
var appendItemChar = function (a, b) { return function (d) { return d[a].concat(d[b]); } };
var empty = function (d) { return null };
%}
