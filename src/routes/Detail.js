import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//이 useParams는 URL에서 변경되는 값이 무엇인지 router에게 알려주는 역할을 한다.

function Detail() {
  const [movieInfo, setMovieInfo] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  //console.log(x);
  //여기에 id값이 들어있는데 이 id라는 것은 movie/:id에서 :뒤에 붙은 것에 해당한다.
  //즉, : 뒤에 원하는 변수명 아무거나 적으면 그게 x에 들어있는 property 이름이 된다.

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      //console.log(json);
      setMovieInfo(json.data.movie);
      setLoading(false);
    };
    getMovie();
  }, [id]);

  //아래와 같이 useCallback을 사용하는 방법도 있다.
  //   const getMovie = useCallback(async () => {
  //     const json = await (
  //       await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
  //     ).json();
  //     setMovie(json.data.movie);
  //     setLoading(false);
  //   }, [id]);
  //   useEffect(() => {
  //     getMovie();
  //   }, [getMovie]);

  return (
    <>
      {loading ? (
        //이 Loading이 필요한 이유
        //만약 이 Loading 화면을 없이 바로 영화 정보를 화면에 뿌린다고 하면
        //비동기처리에 의해 Json을 통해서 movieInfo를 받기 전에
        //아래의 html코드를 화면에 뿌리게 된다.
        //근데 이때 movieInfo에 대한 정보가 undefined 상태이므로
        //아무런 데이터를 표현하지 못한 채로 html값이 나오게 된다.
        //이때 gener의 map은 여러 개의 데이터를 읽어야하는데
        //그 어떠한 값도 없으므로 오류가 발생하게 된다.
        //그러므로 Loading을 통해 모든 데이터를 읽어올 때까지 기다리게 해야한다.
        <h1>Loading...</h1>
      ) : (
        <div className="box">
          <h1>{movieInfo.title}</h1>
          <div>
            <img alt={movieInfo.title} src={movieInfo.medium_cover_image}></img>
          </div>
          <div style={{ textAlign: "center" }}>
            rating: {movieInfo.rating} | year:{movieInfo.year} | runtime :{" "}
            {movieInfo.runtime} | genres:{" "}
            {movieInfo.genres.map((genre) => genre + ", ")}
          </div>
          <h5>{movieInfo.description_full}</h5>
        </div>
      )}
    </>
  );
}

export default Detail;
