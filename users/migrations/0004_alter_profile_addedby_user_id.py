# Generated by Django 4.0.2 on 2022-04-19 02:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_logincredentials_addedby_user_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='addedby_user_id',
            field=models.BigIntegerField(),
        ),
    ]
