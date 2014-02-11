console.log('\'Allo \'Allo!');

function toTitleCase(str)
{
	'use strict';
	return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function imprimirNombres(nom){
	'use strict';
	var lista = [];
	for(var k in nom) {
		lista.push(k);
	}
	lista.sort();
	console.log(lista);
	var output = '<select id="fila" class="form-control">';
	for(var i=0; i < lista.length; i++){
		if(nom[lista[i]] === 924){
			output = output + '<option selected="selected" value="' + nom[lista[i]] + '">';	
		}
		else{
			output = output + '<option value="' + nom[lista[i]] + '">';
		}
		output = output + toTitleCase(lista[i].replace(/"/g, ''));
		output = output + '</option>';
	}
	output = output + '</select>';
	return output;
}

function imprimirTabla(ta, inicio, fin, seleccionado){
	'use strict';
	var output='<table class="table">';
	var titulos = ta.tit;
	var n = titulos.length;
	output = output.concat('<thead><tr>');
    output = output.concat('<th></th>');
	for(var i=0;i<n;i++){
		output = output.concat('<th>').concat(titulos[i].replace(/"/g, '')).concat('</th>');
	}
	output = output.concat('</tr></thead>');
	output = output.concat('<tbody>');
	for(var j=inicio;j<=fin;j++){
		if(j === seleccionado) {
			output = output.concat('<tr class="success">');
		}
		else {
			output = output.concat('<tr>');
		}
        output = output.concat('<td>').concat(j).concat('</td>');
		for(var k=0;k<n;k++){
			output = output.concat('<td>').concat(toTitleCase(ta[j][titulos[k]].replace(/"/g, ''))).concat('</td>');
		}
		output = output.concat('</tr>');
	}
	output = output.concat('</tbody></table>');
	return output;
}

function generateTable() {
	'use strict';
	var tabla = {};
	var nombres = {};
	$.get('rank.csv', function(csvString) {
	    var lineasTabla = csvString.split(/\r\n|\n/);
	    var titulos = lineasTabla[0].split(',');
	    var n = titulos.length;
		tabla.tit = titulos;
	    tabla.len = lineasTabla.length;
	    for(var i=1; i<lineasTabla.length; i++) {
	        var fila = lineasTabla[i].split(',');
	        tabla[i] = {};
	        nombres[fila[0]+', '+fila[1]] = i;
	        for (var j=0; j<= n; j++){
	            tabla[i][titulos[j]] = fila[j];
	        }
	    }
	    var tablaHTML = imprimirTabla(tabla, 919,929,924);
	    var nombresHTML = imprimirNombres(nombres);
		$('#tabla-resultados').append(tablaHTML);
		$('#formulario').append(nombresHTML);
	    $('#fila').change(function(){
            var v = Number(this.value);
            console.log(v);
            var inicio = Math.max(v-5, 1);
            console.log(inicio);
            var fin = Math.min(v+5, 1105);
            console.log(fin);
            var t = imprimirTabla(tabla, inicio,fin,v);
            $('#tabla-resultados').empty(t);
            $('#tabla-resultados').append(t);
        });
	});
}

function generateTableMat() {
	'use strict';
	var tabla = {};
	var nombres = {};
	$.get('rank.mat.csv', function(csvString) {
	    var lineasTabla = csvString.split(/\r\n|\n/);
	    var titulos = lineasTabla[0].split(',');
	    var n = titulos.length;
		tabla.tit = titulos;
	    tabla.len = lineasTabla.length;
	    for(var i=1; i<lineasTabla.length; i++) {
	        var fila = lineasTabla[i].split(',');
	        tabla[i] = {};
	        nombres[fila[0]+', '+fila[1]] = i;
	        for (var j=0; j<= n; j++){
	            tabla[i][titulos[j]] = fila[j];
	        }
	    }
	    var tablaHTML = imprimirTabla(tabla, 1,10,0);
		$('#tabla-matematica').append(tablaHTML);
	    $('#topx').change(function(){
            var v = Number(this.value);
            var t = imprimirTabla(tabla, 1,v,0);
            $('#tabla-matematica').empty(t);
            $('#tabla-matematica').append(t);
        });
	});
}

function generateTableLeng() {
	'use strict';
	var tabla = {};
	var nombres = {};
	$.get('rank.leng.csv', function(csvString) {
	    var lineasTabla = csvString.split(/\r\n|\n/);
	    var titulos = lineasTabla[0].split(',');
	    var n = titulos.length;
		tabla.tit = titulos;
	    tabla.len = lineasTabla.length;
	    for(var i=1; i<lineasTabla.length; i++) {
	        var fila = lineasTabla[i].split(',');
	        tabla[i] = {};
	        nombres[fila[0]+', '+fila[1]] = i;
	        for (var j=0; j<= n; j++){
	            tabla[i][titulos[j]] = fila[j];
	        }
	    }
	    var tablaHTML = imprimirTabla(tabla, 1,10,0);
		$('#tabla-lenguaje').append(tablaHTML);
	    $('#topx').change(function(){
            var v = Number(this.value);
            var t = imprimirTabla(tabla, 1,v,0);
            $('#tabla-lenguaje').empty(t);
            $('#tabla-lenguaje').append(t);
        });
	});
}

$(document).ready(function() {
	'use strict';
	generateTableMat();
	generateTableLeng();
	generateTable();
});