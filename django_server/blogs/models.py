from django.db import models

class blog(models.Model):
    topic = models.CharField(max_length=150, null=True, blank=True)
    subtopic = models.CharField(max_length=150, null=True, blank=True)
    title=models.CharField(max_length=150)
    tips=models.JSONField()
    examples=models.JSONField()
    code=models.TextField()
    problems=models.JSONField()