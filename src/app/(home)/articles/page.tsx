import Header from "@/components/layouts/Header";

import ArticlesList from "./_components/ArticlesList";

export default function Articles() {
  return (
    <section className="p-4">
      <Header title={"Article"} />
      <ArticlesList />
    </section>
  );
}
