from django import forms
from django.core.validators import RegexValidator
from . import views, utils
import re


class RegexForm(forms.Form):
	
	rgx = re.compile(utils.REGEX, re.X)
	text = forms.CharField(widget=forms.Textarea)
	regex = forms.CharField(required=True,
		validators=[
		RegexValidator(
			regex=rgx,
			message='Wrong format')])