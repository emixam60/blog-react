// ArticleItem.tsx
export interface Article {
  id_article: number;
  title: string;
  image: string;
  author: string;
  date_at: Date;
}

export default function ArticleItem({ article }: { article: Article }) {
  const formattedDate = new Date(article.date_at).toDateString();

  return (
    <article className="article-item">
      <h2>{article.title}</h2>
      <a href={`/allarticles/${article.id_article}`}>
        {/* Affiche l'image directement avec l'URL de l'article */}
        <img className="img-article" src={article.image} alt={`Image de : ${article.title}`} />
      </a>
      <div>
        <p>Auteur: {article.author}</p>
        <p>Date: {formattedDate}</p>
      </div>
    </article>
  );
}
