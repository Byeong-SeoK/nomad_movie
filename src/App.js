import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//BrowserRouter와 HashRouter의 차이
//BrowserRouter는 일반적인 URL과 동일한 URL에 대해 routing 해주는 것이다.
//즉, localhost:3000/movie와 같은 일반적인 URL에 대한 것이다.
//HashRouter는 조금 형태가 다른 URL에 대해 routing 해주는 것이다.
//HashRouter가 routing해주는 URL예시로는 localhost:3000/#/movie 가 있다.
//Link는 브라우저 새로고침 없이도 유저를 다른 페이지로 이동시켜주는 컴포넌트이다.
//즉, 단순 html에서는 href로 링크를 붙여가지고 페이지 전체가 reload되어야 했던것을
//react에서는 Link를 통해서 페이지 전체 reload없이 다른 페이지로 이동하게 해주는 것이다.

import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      <Switch>
        {/**Switch는 Route를 찾는 역할을 하는데 이떄 Route는 URL을 의미한다. */}
        {/**그리고 아래 Route를 만들 때는 가장 상위 URL에 해당하는 것이 가장 아래로 내려가야한다.
         * 왜냐하면 /이 /movie보다 상위에 있을 경우 /movie를 실제로 입력한다 하더라도
         * Route될 떄 /movie까지 내려가지 못하고 /에서 끊겨 /로 routing되기 때문이다.
         * 또다른 해결책으로는 path="/"를 exact path="/"로 주면 된다.
         * 이러한 문제가 발생하는 이유는 Switch는 위에서 아래로 순차적으로 rendering하기 때문이다.
         * 만약 switch를 사용하지 않는다면 Router 아래 컴포넌트가 모두 한번에 렌더링 된다.
         */}

        <Route path="/movie/:id">
          {/** :id를 통해서 동적 URL을 만들 수 있다.
           * 동적 URL이란 URL에 변수가 들어가는 것을 허용하는 URL을 의미한다.
           * 그래서 js에서 변수에 값을 넣는 것으로 URL을 만들 수 있다.
           * 그렇기 때문에 movie/1212와 같은 URL을 사용할 수 있다.
           */}
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
