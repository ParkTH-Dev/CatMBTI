import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Result from "./pages/Result";
import reset from "styled-reset";
import bg from "/img/bg.jpg";

const GlobalStyle = createGlobalStyle`
${reset}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jua", sans-serif;
}
li,ul{
  list-style: none;
}
a{
  color: inherit;
  text-decoration: none;
}
body{
  background: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  font-family: "Nanum Gothic", sans-serif;
  
}
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "question",
        element: <Question />,
      },
      {
        path: "result",
        element: <Result />,
      },
    ],
  },
]);

const Wrapper = styled.div``;

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <Wrapper></Wrapper>
    </>
  );
}

export default App;
