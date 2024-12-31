from django.contrib import admin
from .models import blog

@admin.register(blog)
class blogAdmin(admin.ModelAdmin):
    list_display = ('topic', 'subtopic', 'title', 'tips', 'examples', 'code', 'problems')
    search_fields = ('title',)