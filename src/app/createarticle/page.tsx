'use client';

import MyButton from "@/components/MyButton";
import { useRouter } from "next/navigation";

export default function CreateArticle() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Formulaire soumis");

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const articleData = Object.fromEntries(formData);

    // Vérification de l'URL de l'image
    /*if (articleData.image) {
      articleData.image = `${articleData.image}`;
    }*/

    try {
      const response = await fetch("http://localhost:8080/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'article");
      }
      const responseData = await response.json();
      console.log("Article créé avec succès !");
      router.push(`/allarticles/${responseData.id_article}`);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'article :", error);
    }
  };

  return (
    <main className="form-container">
      <h1 className="header-all-articles">Créer un nouvel article</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title"></label>
          <input type="text" id="title" name="title" className="form-input" required placeholder="Titre :" />

          <label htmlFor="author"></label>
          <input type="text" id="author" name="author" className="form-input" required placeholder="Auteur :" />

          <label htmlFor="image"></label>
          <input type="text" id="image" name="image" className="form-input" required placeholder="Chemin de l'image :" />

          <label htmlFor="content"></label>
          <textarea id="content" name="article" className="form-input" required placeholder="Contenu :"></textarea>

          <MyButton value="Créer l'article" />
        </form>
      </div>
    </main>
  );
}
