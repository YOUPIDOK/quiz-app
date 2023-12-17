import {OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Socket} from "socket.io";
import {PlayerService} from "./player.service";
import {S2CSetUsernamePayload, C2SSetUsernamePayload} from "shared/src/player/payload";
import {SetUsernameEvent} from "shared/dist/player/events";

@WebSocketGateway({cors: true})
export class PlayerGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()
  server: Socket;

  constructor(private readonly playerService: PlayerService) {}

  @SubscribeMessage(SetUsernameEvent)
  handleSetUsername(client: Socket, C2SPayload: C2SSetUsernamePayload) {
    const existingPlayer = this.playerService.findByUsername(C2SPayload.username);

    const S2CPayload: S2CSetUsernamePayload = {
      isSet: false
    }

    if (existingPlayer != null && client.id !== existingPlayer?.clientId) {
      this.server.to(client.id).emit(SetUsernameEvent, S2CPayload);
      return
    }

    let player = this.playerService.findByClientId(client.id);
    if (player == null) {
      player = this.playerService.insert({
        clientId: client.id,
        username: C2SPayload.username
      })
    } else {
      player.username = C2SPayload.username;
      this.playerService.update(player);
    }

    console.log(`Client ${client.id} has updated its username to ${C2SPayload.username}`)

    S2CPayload.isSet = true;

    this.server.to(client.id).emit(SetUsernameEvent, S2CPayload);
  }

  handleConnection(client: Socket): void {
    this.playerService.insert({
      clientId: client.id,
      username: 'Anonymous'
    });

    console.log(`Client ${client.id} connected`);
  }

  handleDisconnect(client: Socket): void {
    this.playerService.delete(client.id);

    console.log(`Client ${client.id} disconnected`);
  }
}