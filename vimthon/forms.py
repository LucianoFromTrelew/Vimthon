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
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
import re
class LoginForm(FlaskForm):
    regex = StringField('regex', validators=[DataRequired()])
    remember_me = BooleanField('remember_me', default=False)

    def validate_regex(form, field):

        regex = re.compile(r':(%|\d+,\d+)?s/(.*)/(.+)/g(i)?')
        match = regex.search(field.data)
        if not match:
            raise ValidationError("que onda man te sentis zarpado EEEEEEEEEEEEEEEEEe")
