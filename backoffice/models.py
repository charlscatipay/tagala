from django.db import models

# Create your models here.
class M_Reference(models.Model):
    ReferenceID = models.BigIntegerField(primary_key=True)
    ReferenceGroup = models.CharField(max_length=100)
    ReferenceCode = models.CharField(max_length=20)
    ReferenceShortDescription = models.CharField(max_length=100)
    ReferenceLongDescription = models.CharField(
                            max_length=200,
                            null=True,
                            blank=True,
                            default=None  
                            )
    ReferenceGroupCode = models.CharField(
                            max_length=20,
                            null=True,
                            blank=True,
                            default=None                            
                            )
    ReferenceSequence = models.IntegerField(
                            null=True,
                            blank=True,
                            default=None
    )
    ReferenceTableStatusID = models.BigIntegerField()
    DateAdded = models.DateTimeField(auto_now_add=True)
    AddedByUserID = models.BigIntegerField()
    UpdatedByUserID = models.BigIntegerField(
        null=True,
        blank=True
    )
    DateUpdated = models.DateTimeField(
        null=True,
        blank=True,
        default=None
    )    

    class Meta:
        verbose_name = "Reference"

    def __str__(self):
        return f'{self.ReferenceID} | {self.ReferenceGroup}: {self.ReferenceLongDescription}'


class M_Groups(models.Model):
    GroupID = models.BigIntegerField(primary_key=True)
    GroupName = models.CharField(max_length=100)
    GroupCode = models.CharField(max_length=30)
    ReferenceTableStatusID = models.ForeignKey(M_Reference, on_delete=models.DO_NOTHING, default=1)
    DateAdded = models.DateTimeField(auto_now_add=True)
    AddedByUserID = models.BigIntegerField()
    UpdatedByUserID = models.BigIntegerField(
        null=True,
        blank=True
    )
    DateUpdated = models.DateTimeField(
        null=True,
        blank=True,
        default=None
    )

    class Meta:
        verbose_name = "Group"
