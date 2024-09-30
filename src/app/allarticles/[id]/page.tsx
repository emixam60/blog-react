"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OneArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null); // Typage explicite ici

  useEffect(() => {
    async function fetchArticle() {
      const response = await fetch(`http://localhost:8080/articles/${id}`);
      if (response.ok) {
        const articleData = await response.json();
        setArticle(articleData);
      } else {
        console.error('Erreur lors de la récupération de l\'article');
      }
    }

    fetchArticle();
  }, [id]);

  return (
    <>
      {article ? (
        <div className="card">
          <h2 className="header-article">{article.title}</h2>
          <div className="card-content">
            <img
              className="img-article"
              src={`http://localhost:8080/images/${article.image}`} // Assurez-vous que le chemin d'image est correct
              alt={`Image de : ${article.title}`}
            />
            <div className="card-text">
              <p className="author-date">Auteur: {article.author}</p>
              <p className="author-date">
                Date: {new Date(article.date_at).toDateString()}
              </p>
              <p className="p-article">{article.article}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Chargement de l'article...</p>
      )}
    </>
  );
}
