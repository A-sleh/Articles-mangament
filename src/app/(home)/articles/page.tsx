
import ArticlesList from "./_components/ArticlesList";
import NewArticleFrom from "./_components/NewArticleFrom";

export default function Articles() {
  
  return (
    <section className="p-4">
      <NewArticleFrom />
      <ArticlesList />
    </section>
  );
}
