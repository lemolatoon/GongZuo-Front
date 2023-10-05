"use client";
import { useEffect, useState } from "react";
import { Hi } from "./root.css";
import { Configuration, Gongzuo, GongzuosApi, User, UsersApi } from "@/apiClient";

const config = new Configuration({
  basePath: process.env.BASE_PATH ?? "http://localhost:3001",
});
const gongzuoClient = new GongzuosApi(config);
const userClient = new UsersApi(config);

export default function Home() {
  const [gongzuos, setGongzuos] = useState<Gongzuo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      const username = "lemolatoon";
      const password = "password";
      await userClient.registerPost({
          username,
          password,
      }).catch(() => console.log('already registered'));
      const { sessionToken } = await userClient.loginPost({
        username,
        password
      });
      const user = await userClient.meGet(sessionToken);
      setUser(user);
      const gongzuos = await gongzuoClient.gongzuoGongzuosGet(sessionToken);
      setGongzuos(gongzuos);
    })();
  }, []);
  return (
    <main>
      <div className={Hi}>Hi!</div>
      <div>Here is gongzuos</div>
      <div>{JSON.stringify(gongzuos)}</div>
      <div>Here is user</div>
      <div>{JSON.stringify(user)}</div>
    </main>
  );
}
