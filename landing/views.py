<<<<<<< HEAD
from django.shortcuts import render


def index(request):
    return render(request, 'landing.html')


def home(request):
    return render(request, 'home.html')

=======
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def index(request):
    return render(request, 'home.html')

@login_required
def home(request):
    return render(request, 'home.html')

@login_required
>>>>>>> 3889a48 (Saving progress)
def settings(request):
    return render(request, 'settings.html')