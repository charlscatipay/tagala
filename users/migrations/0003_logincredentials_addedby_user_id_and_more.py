# Generated by Django 4.0.2 on 2022-04-19 02:46

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_profile_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='logincredentials',
            name='addedby_user_id',
            field=models.BigIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='logincredentials',
            name='data_updated',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='logincredentials',
            name='date_added',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='logincredentials',
            name='updatedby_user_id',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='addedby_user_id',
            field=models.BigIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='profile',
            name='data_updated',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='updatedby_user_id',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]
