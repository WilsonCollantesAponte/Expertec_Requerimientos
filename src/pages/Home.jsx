import ListPost from "../components/ListPost";
import ListCategories from "../components/ListCategories";
const Home = () => {
  return (
    <main>
      <div className="container">
        <h2 className="title-page">Lista Requerimientos</h2>
      </div>
      <ListCategories />
      <ListPost url={"/posts"} />
    </main>
  );
};

export default Home;
