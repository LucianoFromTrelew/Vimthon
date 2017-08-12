#from django import forms
#from django.core.validators import RegexValidator
#from . import views, utils
#import re
#
#
#class RegexForm(forms.Form):
#	
#	rgx = re.compile(utils.REGEX, re.X)
#	text = forms.CharField(widget=forms.Textarea)
#	regex = forms.CharField(required=True,
#		validators=[
#		RegexValidator(
#			regex=rgx,
#			message='Wrong format')])

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Regexp
import re

VIM_REGEX = re.compile(r':(%|\d+,\d+)?s/(.*)/(.+)/g(i)?')

class RegexForm(FlaskForm):

    text = TextAreaField(render_kw={"rows": 15, "cols": 100})
    regex = StringField('regex', validators=[DataRequired(),
    Regexp(regex=VIM_REGEX, message='Wrong format')])