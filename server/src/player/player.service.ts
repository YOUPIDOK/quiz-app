import { Injectable } from '@nestjs/common';
import {IPlayer} from 'shared/src/player/interface';

@Injectable()
export class PlayerService {
    private players: IPlayer[] = [];

    insert(player: IPlayer): IPlayer {
        this.players.push(player);
        return player;
    }

    findByClientId(clientId: string): IPlayer  {
        return this.players.find(player => player.clientId === clientId);
    }

    findByUsername(username: string): IPlayer|undefined {
        return this.players.find(player => player.username === username);
    }

    update(updatedPlayer: IPlayer): void {
        this.players = this.players.map(oldPlayer => oldPlayer.clientId === updatedPlayer.clientId ? updatedPlayer : oldPlayer);
    }

    delete(clientId: string) {
        this.players = this.players.filter(player => player.clientId !== clientId);
    }
}
