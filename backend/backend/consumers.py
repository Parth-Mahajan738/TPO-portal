import json
from channels.generic.websocket import AsyncWebsocketConsumer

class UpdatesConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'global_updates'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message', '')

        if message:
            await self.channel_layer.group_send(
                self.group_name,
                {
                    'type': 'global_update',
                    'message': message
                }
            )

    async def global_update(self, event):
        message = event.get('message', '')

        await self.send(text_data=json.dumps({
            'message': message,
            'type': 'update'
        }))
