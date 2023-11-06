import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";
import { formatLichessResponse } from "../utils/formatLichessResponse";
import { fetchLichessAPI } from "./../lichess";

@ObjectType()
class LichessPlayer {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  rating: string;
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

  @Field(() => String, { nullable: true })
  winner: string;

  @Field(() => String)
  moves: string;
}

@Resolver(LichessResponse)
export class LichessResolver {
  @Query(() => [LichessResponse])
  async games(@Arg("username") username: string): Promise<[LichessResponse]> {
    const data = await fetchLichessAPI(`/games/user/${username}`);

    return formatLichessResponse(data);
  }
}
