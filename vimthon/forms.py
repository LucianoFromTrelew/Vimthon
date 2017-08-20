from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Regexp
from . import utils
import re


class RegexForm(FlaskForm):

    text = TextAreaField(render_kw={"rows": 15, "cols": 100})
    regex = StringField('regex', validators=[DataRequired(),
    Regexp(regex=utils.VIM_REGEX, message='Wrong format')])