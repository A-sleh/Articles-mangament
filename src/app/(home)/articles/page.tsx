import {getTranslations} from 'next-intl/server';

import Header from "@/components/layouts/Header";

import ArticlesList from "./_components/ArticlesList";

export default async function Articles() {
  const t = await getTranslations('articles')
  return (
    <section className="p-4">
      <Header title={t('title')} />
      <ArticlesList />
    </section>
  );
}
