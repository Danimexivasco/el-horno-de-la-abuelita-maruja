import { getLoggedUser } from "@/actions/authActions";
import Avatar from "@/app/_components/avatar";
import Headline from "@/app/_components/headline";
import { getUsers } from "@/app/_libs/firebase/users";
import { User } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Usuarios",
  description: "Usuarios",
  openGraph:   {
    title:       "Usuarios",
    description: "Usuarios",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/admin/dashboard/users",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

function isUser(user: any): user is User {
  return "id" in user;
}

export default async function UsersDashboardPage() {
  const loggedUser = await getLoggedUser();
  const users = await getUsers();
  // TODO: Add select to change the role
  return (
    <>
      <Headline className="!mb-16">Usuarios</Headline>
      <div className="grid gap-8">
        {users?.map((user) => {
          return isUser(loggedUser) && user.id !== loggedUser?.id ? (
            <div
              key={user.id}
              className={"grid gap-6 dark:bg-cake-800 bg-cake-200 rounded-lg p-6"}
            >
              <div className="flex gap-4 items-center">
                {user.photoURL ? (
                  <Avatar
                    user={user}
                    className="mb-4"
                  />
                ) : null
                }
                <div>
                  <p className="font-bold">{user.username}</p>
                  <small>{user.email}</small>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                <p className="font-bold">Email verificado: <span className="font-normal">{user.emailVerified ? "Si" : "No"}</span></p>
                <p className="font-bold">Rol:  <span className="font-normal">{user.role}</span></p>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
}