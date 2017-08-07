from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse
from django import forms as formsdjango
from . import forms
import re
import lorem 

cursor = -1

def main(request):
    if request.method == 'POST' :
        form = forms.RegexForm(request.POST)
        if form.is_valid():
                text = form.cleaned_data['text']
                print(text, 'El cursor está en {}'.format(linea_columna(text, cursor)))
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
        #form.fields['text'].initial = lorem.paragraph
        return render(request, 'vimthon/main.html', {'form':form})

@csrf_exempt
def set_cursor(request):
    global cursor 
    cursor = int(request.GET.get('cursor', None))
    
    if cursor is not None:
        print('ahi va')
        if cursor != -1 :
            return HttpResponse('success')
    else:
        return HttpResponse('ni ahi')

def linea_columna(cadena, pos):
    linea = 0
    todo = [c for i in cadena.split('\r') for c in i.split('\n')]
    col = pos
    while (col - (len(todo[linea]))) > 0:
        col = col-(len(todo[linea])+1)
        linea+=1
    return (linea,col+1)
# Create your views here.

