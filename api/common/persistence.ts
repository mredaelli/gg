import { DataType, Sequelize } from 'sequelize-typescript';
import { UUID } from 'uuid'
import { parse } from 'pg-connection-string';
import { Model, Column, Table } from 'sequelize-typescript';

const connectionString = '<your-postgres-connection-string>';
const config = parse(connectionString);

const sequelize = new Sequelize({
   dialect: 'postgres',
   host: config.host,
   port: Number(config.port),
   database: config.database,
   username: config.user,
   password: config.password,
   // ssl: {
   //    rejectUnauthorized: false,
   // },
});


@Table
export class Game extends Model<Game> {
   @Column({ type: DataType.INTEGER })
   number!: number;

   @Column({ type: DataType.UUID })
   userId!: UUID;

   @Column({ type: DataType.UUID })
   gameId!: UUID;
}

export const getGame = (gameId: UUID) => Game.findOne({ where: { gameId } });
export const newGame = async (number: number, userId: UUID) => Game.create({ userId, number })
