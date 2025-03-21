import { Metadata } from "next";
import { getLoggedUser } from "@/actions/authActions";
import DataTable from "@/app/_components/dataTable/users";
import { columns } from "@/app/_components/dataTable/users/columns";
import Headline from "@/app/_components/headline";
import { User } from "@/types";
import { standardizeUsersDates } from "@/app/_utils/standardizeUserDates";
import { getApiBaseUrl } from "@/app/_utils/getApiBaseUrl";
import { API_ROUTES } from "@/apiRoutes";

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
  const usersPromise = await fetch(`${getApiBaseUrl()}${API_ROUTES.USERS}`);
  const { users }: {users: User[]} = await usersPromise.json();

  // Hide your own user
  const restOfUsers = users.filter((user) => isUser(loggedUser) && user.id !== loggedUser?.id);

  const standardDateUsers = standardizeUsersDates(restOfUsers);

  return (
    <>
      <Headline className="!mb-0">Usuarios</Headline>
      <div className="py-10">
        <DataTable
          columns={columns}
          data={standardDateUsers}
        />
      </div>
    </>
  );
}