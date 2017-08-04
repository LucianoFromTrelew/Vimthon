from django import forms

class RegexForm(forms.Form):

    text = forms.CharField(widget=forms.Textarea, required=True)
    regex = forms.CharField(required=True) 
        #RegexValidator('^:\/s\/\w+\/\w+\/g', )
