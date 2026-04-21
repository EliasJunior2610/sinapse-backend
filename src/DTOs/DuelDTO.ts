export interface Player {
  userId: string;
  socketId: string;
}

export interface DuelRoom {
  roomId: string;
  players: Player[];
  scores: Record<string, number>;
  startTime?: number;
  questions: any[];
  finishedPlayers: string[];
  isFinished: boolean;
}
