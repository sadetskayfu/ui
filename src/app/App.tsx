import { Header } from "@/widgets/Header";
import { AppRouter } from "./providers/router";
import "./styles/style.scss";
import { AsideBar } from "@/widgets/AsideBar";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="content container">
        <AsideBar />
        <div className="container-page">
        <AppRouter />
        </div>
      </main>
    </div>
  );
}

export default App;
