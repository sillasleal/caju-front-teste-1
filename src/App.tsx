import Router from "~/router";
import { Header } from "./components/Header";
import { LoadingContext } from "./providers/loading.provider";
import { useContext } from "react";

function App() {
  const loadingStatus = useContext(LoadingContext);

  return (
    <>
      <Header loading={loadingStatus.loading}>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
    </>
  );
}

export default App;
