import { fetchLichessAPI } from "./../lichess";
import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
export class LichessResponse {
  @Field(() => String)
  response: string;
}

@Resolver(LichessResponse)
export class LichessResolver {
  @Query(() => LichessResponse)
  async ratingHistory(
    @Arg("username") username: string
  ): Promise<LichessResponse> {
    const data = await fetchLichessAPI(`/user/${username}/rating-history`);

    console.log(data);

    return { response: "" };
  }
}
