from vimthon import app
from flask import render_template
from . import forms, utils
import re
import lorem 

cursor = -1


@app.route('/')
def root():
    return render_template("vimthon/coso.html")
    # return "Hello, World!"


#def main(request):
#    if request.method == 'POST' :
#        form = forms.RegexForm(request.POST)
#        if form.is_valid():
#                text = form.cleaned_data['text']
#                regex = form.cleaned_data['regex']
#                match = re.search(utils.REGEX, regex)
#                form = forms.RegexForm()
#                form.fields['text'].initial = utils.reemplazar(text, match, cursor)
#                return render(request, 'vimthon/main.html', {'form':form})
#        return render(request, 'vimthon/main.html', {'form':form})
#    else:
#        form = forms.RegexForm()
#        form.fields['text'].initial = lorem.paragraph
#        return render(request, 'vimthon/main.html', {'form':form})
#
#@csrf_exempt
#def set_cursor(request):
#    global cursor 
#    cursor = int(request.GET.get('cursor', None))
#    
#    if cursor is not None:
#        print('ahi va')
#        if cursor != -1 :
#            return HttpResponse('success')
#    else:
#        return HttpResponse('ni ahi')
#
#
## Create your views here.
#
