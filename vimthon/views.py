from django.shortcuts import render
from django import forms as formsdjango
from . import forms
import re
import lorem 


def main(request):
	if request.method == 'POST' :
		form = forms.RegexForm(request.POST)
		if form.is_valid():
			text = form.cleaned_data['text']
			regex = form.cleaned_data['regex']

			match = re.search(r':(%|\d+,\d+)?s/(\w+)?/(\w+)?/g$', regex)
			search = re.compile(match.group(2))
			text = re.sub(search, match.group(3), text)
			form = forms.RegexForm()
			form.fields['text'].initial=text
			#form.text = formsdjango.CharField(widget=formsdjango.Textarea, initial=text)
			return render(request, 'vimthon/main.html', {'form':form})

		return render(request, 'vimthon/main.html', {'form':form})

	else:
		form = forms.RegexForm()
		form.fields['text'].initial = lorem.paragraph
		return render(request, 'vimthon/main.html', {'form':form})
# Create your views here.

