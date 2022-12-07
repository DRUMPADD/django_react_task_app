from django.db import models

# Create your models here.
class Task(models.Model):
    id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=150)
    desc = models.CharField(max_length=200)


    def __str__(self):
        return f'{self.id}, {self.task_name}, {self.desc}'
    
# Username: drumpadd
# Password: sistemas99