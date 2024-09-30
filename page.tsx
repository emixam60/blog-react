"use client";

import Form from "@/components/Form";
import { User } from "@/domain/models/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, SetStateAction, useState } from "react";
import AllArticles from "../allarticles/page";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState<Omit<Partial<User>, "id_user">>({
       user_name: "",
       email: "",
       password: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erreur lors de l'inscription:", errorData);
      return;
    }

    console.log("Inscription réussie");
      router.push('/allarticles');
  }

  return (
    <main>
      <h1>Mon Zoo Blog</h1>
      <div>
        <Form
          id="signupForm"
          valueButton="S'inscrire"
          onSubmit={handleSubmit}
          setUser={setUser}
        />
        <div id="signin">
          <p>
            Déja inscrit? <Link href="/">Connectez vous</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
