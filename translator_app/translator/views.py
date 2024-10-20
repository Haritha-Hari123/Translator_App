from django.http import JsonResponse
from django.shortcuts import render
from deep_translator import GoogleTranslator
import requests


def home(request):
    return render(request, 'translator/index.html')

def translate_text(request):
    if request.method == "POST":
        text = request.POST.get('text')
        target_lang = request.POST.get('target_lang')

        try:
            translated_text = GoogleTranslator(source='auto', target=target_lang).translate(text)
            return JsonResponse({'translated_text': translated_text})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

