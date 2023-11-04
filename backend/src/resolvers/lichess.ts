import { fetchLichessAPI } from "./../lichess";
import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class LichessPlayer {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  rating: number;
}

@ObjectType()
class LichessPlayers {
  @Field(() => LichessPlayer)
  white: LichessPlayer;

  @Field(() => LichessPlayer)
  black: LichessPlayer;
}

@ObjectType()
export class LichessResponse {
  @Field(() => String)
  speed: string;

  @Field(() => Date)
  date: Date;

  @Field(() => LichessPlayers)
  players: { white: LichessPlayer; black: LichessPlayer };

  @Field(() => String)
  winner: string;

  @Field(() => String)
  moves: string;

  @Field(() => String)
  format: string;
}

@Resolver(LichessResponse)
export class LichessResolver {
  @Query(() => [LichessResponse])
  async games(@Arg("username") username: string): Promise<[LichessResponse]> {
    const data = await fetchLichessAPI(`/games/user/${username}`);

    data.forEach((game: any) => {
			game.players = 
		});

    return data;
  }
}
