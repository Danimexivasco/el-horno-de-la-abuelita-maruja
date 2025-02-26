"use client";

import Alert from "@/app/_components/alert";
import Button from "@/app/_components/button";
import Container from "@/app/_components/container";
import FormField from "@/app/_components/forms/formField";
import Headline from "@/app/_components/headline";
import Link from "@/app/_components/link";
import { LogoIcon, TrashIcon } from "@/app/_icons";
import {
  checkVerification,
  resendEmailVerification,
  useAuthState,
  useDeleteUser
} from "@/app/_libs/firebase/auth";
import {
  deleteUser,
  updateUser,
  useSingleUserData
} from "@/app/_libs/firebase/users";
import { getFormatedDate } from "@/app/_utils/getFormatedDate";
import { showMsg } from "@/app/_utils/showMsg";
import { uploadImage } from "@/app/_utils/uploadImage";
import { HOME_PATH } from "@/routes";
import { User } from "@/types";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserProfilePage() {
  const router = useRouter();
  const [user, loading] = useAuthState();
  const [deleteAuthUser, loadingDeleteUser] = useDeleteUser();
  const [dbUser, loadingDbUser] = useSingleUserData(user?.uid ?? "not existing");

  const [userData, setUserData] = useState({
    username:  "",
    photoURL:  "",
    createdAt: ""
  });

  useEffect(() => {
    if (dbUser) {
      const userData = dbUser as User;

      setUserData({
        username:  userData?.username ?? "",
        photoURL:  userData?.photoURL ?? "",
        createdAt: getFormatedDate(userData?.createdAt)
      });
    }
  }, [dbUser]);

  const [loadingImage, setLoadingImage] = useState(false);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true);
    const file = event.target?.files?.[0];

    if (file) {
      const url = await uploadImage(file as File);
      setUserData({
        ...userData,
        photoURL: url
      });
      setLoadingImage(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleCheckVerification = async () => {
    if (user) {
      try {
        const response = await checkVerification(user);

        if (response?.successs) {
          showMsg(response.message, "success");
        }

        if (response && !response?.successs) {
          showMsg(response.message, "error");
        }
      } catch (error) {
        if (error instanceof Error) {
          showMsg(error.message, "error");
        }
      }

    }
  };

  const handleResendEmailVerification = async () => {
    if (user) {
      try {
        const response = await resendEmailVerification(user);
        if (response?.successs) {
          showMsg(response.message, "success");
        }
      } catch (error) {
        if (error instanceof Error) {
          showMsg(error.message, "error");
        }
      }
    }
  };

  const handleUpdateUser = async () => {
    if (!user) return;
    try {
      const dataToUpdate = {
        username: userData.username,
        photoURL: userData.photoURL
      };

      await updateUser(user?.uid, dataToUpdate, true);

      router.refresh();
    } catch {
      showMsg("Ha ocurrido un error al actualizar el perfil", "error");
    }
  };

  const handleDelete = (id: User["id"]) => async () => {
    if (!id) return;

    try {
      await deleteUser(id);
      await deleteAuthUser();

      router.push(HOME_PATH);
    } catch {
      showMsg("Ha ocurrido un error al eliminar el perfil", "error");
    }
  };

  if (loadingDeleteUser) return <Container>Eliminando usuario...</Container>;
  // TODO: After delete user you can see for a second the below loading state, fix it
  if (loading || loadingDbUser) return <Container>Cargando perfil...</Container>;

  return dbUser && (
    <Container>
      <Headline className="lg:mb-8">Mi Perfil</Headline>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4 max-w-sm">
          <p className="text-2xl lg:text-3xl">Información de la cuenta</p>
          <div className="flex flex-col gap-2 items-center mb-2">
            <div className="relative w-32 h-32 overflow-hidden border-2 border-cake-800 rounded-full grid place-content-center seld-center">
              {loadingImage && <p className="text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full animate-pulse">Cargando...</p>}
              <label
                htmlFor="profile-upload"
                className="cursor-pointer"
              >
                {userData.photoURL ?
                  <Image
                    src={userData.photoURL ?? ""}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  : <div className="w-32 h-32 rounded-full grid place-content-center bg-cake-300">
                    <LogoIcon />
                  </div>
                }
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-cake-800 text-cake-100 p-2 rounded-full cursor-pointer"
              >
                {/* <label
                htmlFor="profile-upload"
                className="absolute bottom-0 w-full flex justify-center bg-cake-800 text-cake-100 p-1.5 cursor-pointer"
              > */}
                <Camera size={22} />
              </label>
            </div>
            <p>Foto de perfil</p>
          </div>
          <FormField
            input={{
              name:        "username",
              type:        "text",
              label:       "Nombre de usuario",
              onChange:    handleChange,
              placeholder: "Introduce tu nombre de usuario",
              className:   "mb-2"
            }}
            value={userData.username ?? ""}
          />
          <p>Usuario activo desde: {userData?.createdAt}</p>
          <Button
            className="w-full lg:w-fit  mt-4"
            onClick={handleUpdateUser}
          >
            Guardar configuración
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-2xl lg:text-3xl">Verificación de email</p>
          {user?.emailVerified ?
            <p>Email verificado: ✅</p>
            :
            <p>Tu email no está verificado, por favor verifica tu email, esta acción es necesaria para poder realizar compras</p>
          }
          {!user?.emailVerified ? (
            <div className="grid lg:flex gap-4 items-center">
              <Button onClick={handleCheckVerification}>Ya lo he verificado</Button>
              <Button onClick={handleResendEmailVerification}>Reenviarme el enlace</Button>
            </div>

          ) : null}

          <p className="text-2xl lg:text-3xl mt-4">Pedidos anteriores</p>
          <Link href={"/"}>
            TODO: VER PEDIDOS ANTERIORES
          </Link>

          <div className="bg-red-400/30 p-4 rounded-md flex flex-col gap-4 mt-6 lg:mt-auto">
            <p className="text-2xl lg:text-3xl">Eliminar usuario </p>
            <p>Cuidado, esta acción no se podrá deshacer.</p>
            <Alert
              title="Eliminar usuario"
              description="¿Seguro que deseas eliminar tu usuario? Esta acción no se puede deshacer."
              triggerElement={<Button
                isRed
                withIcon
                className="flex items-center justify-center"
                title="Eliminar usuario"
              >
                <TrashIcon className="w-5 h-5"/> Eliminar usuario
              </Button>}
              cancelElement={<Button>Cancelar</Button>}
              actionElement={<Button
                isRed
                onClick={handleDelete(user?.uid ?? "")}
              >Sí, eliminar
              </Button>}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}