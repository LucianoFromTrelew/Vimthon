from django import forms

class RegexForm(forms.Form):

    text = forms.CharField(widget=forms.Textarea, required=True)
    regex = forms.CharField(required=True)

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
