from django.shortcuts import render
from . import forms

def main(request):
        form = forms.RegexForm()
        return render(request, 'vimthon/main.html', {'form':form})
# Create your views here.

