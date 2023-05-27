import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
  appId: "1603093",
  key: "8bd6128dc54b37e07303",
  secret: "e3b6462f87c537ccb534",
  cluster: "eu",
  useTLS: true
})

export const pusherClient = new PusherClient(
  '8bd6128dc54b37e07303',
  {
    channelAuthorization: {
      endpoint: '/api/pusher/auth',
      transport: 'ajax',
    },
    cluster: 'eu'
  }
)
