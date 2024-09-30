import { ChangeEvent, FormEvent, HTMLInputAutoCompleteAttribute, SetStateAction, useState } from "react";
import MyButton from "../MyButton";
import { User } from "@/domain/models/user";

interface FormProps {
  id: 'signinForm' | 'signupForm', 
  valueButton: string,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  setUser: (value: SetStateAction<Omit<Partial<User>, 'id_user'>>) => void,
}

export default function form({ id, valueButton, onSubmit, setUser }: FormProps) {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value}= event.target;
    setUser((prevUser) => ({...prevUser, [name]: value}));
  }


    return (
        <form id={id} onSubmit={onSubmit}>
          {id === "signupForm" && (
            <>
              <label htmlFor="user_name"></label>
              <input type="text" name = "user_name" id="name" placeholder="Nom" required onChange={handleInputChange}/>
            </>
          )}
          <label htmlFor="email"></label>
          <input type="email" id="email" name="email" placeholder="Email" required onChange={handleInputChange}/>
          <label htmlFor="password"></label>
          <input type="password" id="password" name="password" placeholder="Mot de passe" required onChange={handleInputChange}/>
          
          {id === "signupForm" && (
            <>
              <p>Le mot de passe doit contenir :</p>
              <ul>
                <li>Une majuscule</li>
                <li>Une minuscule</li>
                <li>Un chiffre</li>
                <li>Un caractère spécial</li>
              </ul>
            </>
          )}
            <MyButton value={valueButton} />
        </form>
    );
}
