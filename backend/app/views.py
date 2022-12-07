from django.shortcuts import HttpResponse
from django.http import JsonResponse
from .models import Task
import json
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
# Create your views here.
def index(request):
    return HttpResponse("Hello world")

def getTasks(request):
    s_json = list(Task.objects.values())
    return JsonResponse({"tasks": s_json}, status=200)

def getTask(request, id):
    if id:
        task = str(Task.objects.get(pk=id)).split(", ")
        print(task)
        return JsonResponse({"task": task}, status=200)

@csrf_exempt
def createTask(request):
    if request.method == 'POST':
        try:
            task = json.loads(request.body.decode("utf-8"))
            print(task["name"])
            print(task["desc"])
            save_task = Task.objects.create(task_name=task["name"], desc=task["desc"])
            print(save_task)
            return JsonResponse({"result": "Task added"}, status=200)
        except:
            return JsonResponse({"result": "Task not added"}, status=200)

@csrf_exempt
def updateTask(request, id):
    print("ID:",id)
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode("utf-8"))
            Task.objects.filter(id=id).update(task_name=data["name"], desc=data["desc"])
            return JsonResponse({"result": "Task updated"}, status=200)
        except:
            return JsonResponse({"result": "Task not updated"}, status=200)


@csrf_exempt
def deleteTask(request, id):
    if request.method == 'POST':
        try:
            Task.objects.get(pk=id).delete()
            return JsonResponse({"result": "Task deleted"}, status=200)
        except:
            return JsonResponse({"result": "Error trying to delete value"}, status=200)