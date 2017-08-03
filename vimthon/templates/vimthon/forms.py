from django import forms

class RegexForm(forms.ModelForm):

	regex_validator = RegexValidator(regex= r'')
	text = TextField(required=True)
	regex = TextField(required=True, validators=[
		RegexValidator('^:\/s\/\w+\/\w+\/g', )])