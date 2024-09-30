"use client";

import ArticleItem, { Article } from "@/components/ArticleItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllArticles() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetch("http://localhost:8080/articles");
      if (!data.ok) {
        return data.json();
      }

      const jsonData = (await data.json()) as Article[];
      const articlesContent = jsonData.map(({image, ...rest}: Article) => ({
        ...rest,
        image: `http://localhost:8080/images/${image}`,
        date_at: new Date(rest.date_at)
      }))
      setArticles(articlesContent);
    }
    fetchData();
  }, []);

  return (
    <div className="all-articles">
      <div className="header-container">
        <h1 className="header-all-articles">Tous nos articles</h1>
        <button className="create-article-button" onClick={() => router.push('/createarticle')}>Créer un article</button>
      </div>
      <div className="article-list">
        {articles.map((article) => (
          <ArticleItem key={article.id_article} article={article} />
        ))}
      </div>
    </div>
  );
}
