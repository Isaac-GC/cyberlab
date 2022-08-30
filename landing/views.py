from django.shortcuts import render


def index(request):
    return render(request, 'landing.html')


def home(request):
    return render(request, 'home.html')

def settings(request):
    return render(request, 'settings.html')