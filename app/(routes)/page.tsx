import { ABOUT_US_PATH, PRODUCTS_PATH } from "@/routes";
import Container from "../_components/container";
import Hero from "../_components/hero";
import Link from "../_components/link";
import TextMedia from "../_components/textMedia";
import Highlight from "../_components/highlight";
import { GuaranteeIcon } from "../_icons";
import Carousel from "../_components/carousel";
import { getProducts } from "../_libs/firebase/products";
import Masonry from "../_components/masonry";

export default async function Home() {

  const products = await getProducts();

  // TODO: Implement correct images functionality
  // on backend and remove mock images
  const mockImages = [
    "https://res.cloudinary.com/danimexivasco/image/upload/v1733741667/el_horno_de_la_abuelita_maruja/btpb9hyk1lbqgfkaoyk9.webp",
    "https://res.cloudinary.com/danimexivasco/image/upload/v1734170845/el_horno_de_la_abuelita_maruja/delicious-cookies-close-up-table_rbcfe5.jpg",
    "https://res.cloudinary.com/danimexivasco/image/upload/v1733428047/el_horno_de_la_abuelita_maruja/r5b8qfrxhrimuafeyj23.jpg",
    "https://res.cloudinary.com/danimexivasco/image/upload/v1732709141/el_horno_de_la_abuelita_maruja/q4p06gqnweaaz4jtxsnn.jpg",
    "https://res.cloudinary.com/danimexivasco/image/upload/v1732704271/el_horno_de_la_abuelita_maruja/pf2jm4sew20nirhbvmyo.webp",
    "https://res.cloudinary.com/danimexivasco/image/upload/v1732700986/el_horno_de_la_abuelita_maruja/gnjxckdc6zw5c3zlyw4x.jpg",
    "https://res.cloudinary.com/danimexivasco/image/upload/v1734170845/el_horno_de_la_abuelita_maruja/delicious-cookies-close-up-table_rbcfe5.jpg",
    "https://res.cloudinary.com/danimexivasco/image/upload/v1732700977/el_horno_de_la_abuelita_maruja/nyceqhsxseikqeon4c9e.jpg",
    "https://res.cloudinary.com/danimexivasco/image/upload/v1732538065/el_horno_de_la_abuelita_maruja/xsommyc59ufmv2get42w.webp"
  ];

  return (
    <Container className="grid gap-8 pt-0 pb-8">
      <Hero
        bottomText="Déjate llevar"
        image="https://res.cloudinary.com/danimexivasco/image/upload/v1734170845/el_horno_de_la_abuelita_maruja/delicious-cookies-close-up-table_rbcfe5.jpg"
        scrollTo="#productos-destacados"
      />
      <div
        id="productos-destacados"
        className="scroll-mt-20 lg:scroll-mt-40"
      />
      <Carousel
        headline="Productos destacados"
        items={JSON.stringify(products)}
      />
      <Highlight
        boxTopHeadline="Frescura"
        image={<GuaranteeIcon className="w-1/3 h-auto max-w-36"/>}
        boxBottomHeadline="Garantizada"
        headline="Siempre frescos, siempre gratis"
        text={`Y por gratis nos referimos a nuestros envíos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti cupiditate, quis facilis, animi deleniti a excepturi reiciendis laborum quaerat, rem eaque sunt doloribus consequatur itaque?  
          &nbsp;  
        Y por gratis nos referimos a nuestros envíos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti cupiditate, quis facilis, animi deleniti a excepturi reiciendis laborum quaerat, rem eaque sunt doloribus consequatur itaque?`}
      />
      <Masonry
        items={mockImages}
        cta={
          <Link
            asButton
            href={PRODUCTS_PATH}
            className="justify-self-center"
          >Descubrir Productos
          </Link>
        }
      />
      <TextMedia
        headline="Quiénes somos"
        subHeadline="detrás de cada creación"
        text={`Rocío y Daniel, una pareja con muchas ganas e ilusión por emprender una nueva aventura juntos. Yo, Rocío, soy la que elabora los productos con mucho cariño y dedicación mientras que Daniel, me apoya y me anima a llegar lo más lejos posible, él ha sido el creador de la página para que pudiera llegar a más gente.  \n\n Queremos compartir contigo nuestro viaje por lo que esperamos y deseamos que saborees y disfrutes lo que hacemos tanto como nosotros.`}
        cta={<Link
          asButton
          href={ABOUT_US_PATH}
        >Conócenos
        </Link>}
        media="https://res.cloudinary.com/danimexivasco/image/upload/v1732700977/el_horno_de_la_abuelita_maruja/nyceqhsxseikqeon4c9e.jpg"
        mediaPosition="left"
      />
    </Container>
  );
}