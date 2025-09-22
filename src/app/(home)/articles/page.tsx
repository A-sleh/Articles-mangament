
import ArticlesList from "./_components/ArticlesList";
import ArticleForm from "./_components/ArticleForm";

export default function Articles() {
  
  return (
    <section className="p-4">
      <ArticleForm method="POST" >
        <button className="px-4 py-1 rounded-md text-white bg-primary dark:bg-primary-dark float-end">
          New article
        </button>
      </ArticleForm>
      <ArticlesList />
    </section>
  );
}
