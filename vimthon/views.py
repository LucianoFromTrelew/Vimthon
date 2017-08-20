from vimthon import app
from flask import render_template, request, jsonify
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
        match = utils.VIM_REGEX.search(form.regex.data)
        form.text.data = utils.reemplazar(form.text.data, match, cursor)
    else:
        form.text.data = LOREM_TEXT
    return render_template("vimthon/main.html", form=form)


@app.route('/cursor', methods=['POST'])
def set_cursor():
    global cursor 
    cursor = int(request.form['cursor'])
    return jsonify({"success": True})