from django import forms
from django.core.validators import RegexValidator
import re

REGEX = ':(%|\d+,\d+)?s/(.+)/(.*)/g$'
RE_PER = '%'
RE_RNG = '\d+,\d+'
class RegexForm(forms.Form):
	
	regex = re.compile(REGEX, re.X)
	text = forms.CharField(widget=forms.Textarea)
	regex = forms.CharField(required=True,
		validators=[
		RegexValidator(
			regex=regex,
			message='Wrong format')])


	def reemplazar(self, texto, matches, cursor):
		if(re.search(RE_PER, matches.group(1))):
			#reemplazo en todo el texto
			return re.sub(matches.group(2), matches.group(3), texto)
		elif(re.search(RE_RNG, matches.group(1))):
			#reemplazo en rango
			pass
		else:
			#reemplazo en linea
			pass

"""			
        r':(%|\d+,\d+)?s/(\w+)?/(\w+)?/g'

	esa expresion regular matchea bien con el %, con dos numeros separados por coma, o con nada (antes de la 's')
	matchea con la palabra a buscar
	matchea con la palabra a reemplazar

	faltaria hacer que pueda matchear con expresiones regulares tambien o algo mas complejo
	en el campo que va lo que se busca

	por ejemplo, si tenemos

	:%s/foo/bar/g

	que el 'foo', pueda ser una expresion regular. Asi como esta ahora la exp, solo busca palabras
"""
	