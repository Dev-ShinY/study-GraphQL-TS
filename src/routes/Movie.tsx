import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface MovieType {
  id: string,
  title: string,
  medium_cover_image: string,
  rating: number,
  isLiked: boolean
}

interface MovieData {
  movie: MovieType;
}

interface MovieVars {
  movieId: string;
}

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
        id
        title
        medium_cover_image
        rating
        isLiked @client
    }
}`;

// [remote field]
// page가 로딩되면 Apollo는 api에 remote field를 요청
// -> id, title, medium_cover_image, rating

// [local only field]
// local only field는 절대 api로 가지 않는 field (cache에서만 활동)
// -> isLiked @client

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Image = styled.div<{ bg: string }>`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery<MovieData, MovieVars>(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };

  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClick}>
          {data?.movie?.isLiked ? "Unlike" : "Like"}
        </button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}