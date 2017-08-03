from django.shortcuts import render

def main(request):
	return render(request, 'vimthon/main.html', {})
# Create your views here.
