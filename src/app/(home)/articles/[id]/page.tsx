export default async function Article({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
    const articleId = (await params).id

    return <h1>{articleId}</h1>

}
