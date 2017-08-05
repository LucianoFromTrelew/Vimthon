from django import forms
from django.core.validators import RegexValidator
import re
class RegexForm(forms.Form):
	
	regex = re.compile(r':(%|\d+,\d+)?s/(.+)/(.*)/g$', re.X)
	text = forms.CharField(widget=forms.Textarea)
	regex = forms.CharField(required=True,
		validators=[
		RegexValidator(
			regex=regex,
			message='Wrong format')])


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
	