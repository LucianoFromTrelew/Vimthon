from vimthon import app
from flask import render_template, request
from . import forms, utils
from .forms import RegexForm
import re
import lorem

cursor = -1
LOREM_TEXT = lorem.text()


@app.route('/', methods=['GET', 'POST'])
def root():
    form = RegexForm()
    if form.validate_on_submit():
        match = re.search(utils.REGEX, form.regex.data)
        form.text.data = utils.reemplazar(form.text.data, match, cursor)
        print("todo ok")
    else:
        form.text.data = LOREM_TEXT
        print("todo mal")
    return render_template("vimthon/main.html", form=form)
    # return "Hello, World!"


# definimos que la url '/cursor' pueda recibir tanto peticiones GET como POST
# No se si es necesario para el script del cursor, lo estaba probando pero no estaria dando bola :/

@app.route('/cursor', methods=['GET', 'POST'])
def set_cursor():
    global cursor 
#    cursor = request.json['cursor']
    cursor = request.form['cursor'] 
    print('mostranding...')
    print("CURSOR: {}".format(cursor))
#    cursor = int(request.GET.get('cursor', None))
#    if cursor is not None:
#        print('ahi va')
#        if cursor != -1 :
#            return HttpResponse('success')
#    else:
#        return HttpResponse('ni ahi')



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

## Create your views here.
#
