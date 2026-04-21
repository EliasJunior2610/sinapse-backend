import { DuelRoom } from 'src/DTOs/DuelDTO';

export class DuelState {
  private rooms = new Map<string, DuelRoom>();

  createRoom(roomId: string) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        roomId,
        players: [],
        scores: {},
        questions: [],
        finishedPlayers: [],
        isFinished: false,
      });
    }
  }

  getRoom(roomId: string): DuelRoom {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new Error('Sala não encontrada.');
    }

    return room;
  }

  removeRoom(roomId: string) {
    this.rooms.delete(roomId);
  }
}
