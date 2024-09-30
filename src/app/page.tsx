"use client";

import Link from "next/link";
import Form from "@/components/Form";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { User } from "@/domain/models/user";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<Omit<Partial<User>, "id_user">>({
    email: "",
    password: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/users/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      return res.json();
    }
    console.log("Connexion réussi");
    router.push('/allarticles');
  }

  return (
    <main>
      <h1>Mon zoo blog</h1>
      <div>
        <Form
          id="signinForm"
          valueButton="Se connecter"
          onSubmit={handleSubmit}
          setUser={setUser}
        />
      </div>
      <div id="signup">
        <p>
          Pas encore inscrit ? <Link href="/signup">Inscrivez-vous ici</Link>
        </p>
      </div>
    </main>
  );
}
