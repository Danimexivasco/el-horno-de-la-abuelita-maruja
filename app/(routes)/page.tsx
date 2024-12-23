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
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/700x350",
    "https://placehold.co/600x900",
    "https://placehold.co/900x450",
    "https://placehold.co/600x800",
    "https://placehold.co/600x900",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/700x350",
    "https://placehold.co/600x900",
    "https://placehold.co/900x450",
    "https://placehold.co/600x400"

  ];

  return (
    <Container className="grid gap-8 pt-0 pb-8">
      <Hero
        bottomText="Déjate llevar"
        image="https://res.cloudinary.com/danimexivasco/image/upload/v1734170845/el_horno_de_la_abuelita_maruja/delicious-cookies-close-up-table_rbcfe5.jpg"
      />
      <Carousel
        headline="Productos destacados"
        items={JSON.stringify(products)}
      />
      <Highlight
        boxTopHeadline="Frescura"
        image={<GuaranteeIcon className="w-1/3 h-auto"/>}
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
        text={`Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit?
          It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit.  
          &nbsp;  
          The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men.`}
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