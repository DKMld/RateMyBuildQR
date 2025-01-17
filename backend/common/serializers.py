from rest_framework import serializers

from backend.common.models import Car


class PostCarSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Car
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        return Car.objects.create(user=user, **validated_data)