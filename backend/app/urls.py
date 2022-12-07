from django.urls import path
import app.views as v

urlpatterns = [
    path("home", v.index, name="principal"),
    path("tasks", v.getTasks, name="tasks"),
    path("saveTask", v.createTask, name="saveTask"),
    path("task/<int:id>", v.getTask, name="getTask"),
    path("deleteTask/<int:id>", v.deleteTask, name="delTask"),
    path("updateTask/<int:id>", v.updateTask, name="updTask"),
]
