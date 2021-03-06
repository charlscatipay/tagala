# Generated by Django 4.0.2 on 2022-03-17 09:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('profile_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('firstname', models.CharField(max_length=120)),
                ('lastname', models.CharField(max_length=120)),
                ('location', models.CharField(max_length=120)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='LoginCredentials',
            fields=[
                ('login_credentials_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=20)),
                ('is_active', models.BooleanField(default=True)),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='users.profile')),
            ],
        ),
    ]
