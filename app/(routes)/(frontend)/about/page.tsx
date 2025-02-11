import Container from "@/app/_components/container";
import Link from "@/app/_components/link";
import TextMedia from "@/app/_components/textMedia";
import { CONTACT_PATH, PRODUCTS_PATH } from "@/routes";

export default function AboutPage() {
  return (
    <Container>
      <TextMedia
        headline="Sobre Nosotros"
        headlineAs="h1"
        subHeadline="Rocío y Daniel"
        subHeadlineAs="h2"
        text={`Una pareja con muchas ganas e ilusión por emprender una nueva aventura juntos. Yo, Rocío, soy la que elabora los productos con mucho cariño y dedicación mientras que Daniel, me apoya y me anima a llegar lo más lejos posible, él ha sido el creador de la página para que pudiera llegar a más gente.  \r\r Queremos compartir contigo nuestro viaje por lo que esperamos y deseamos que saborees y disfrutes lo que hacemos tanto como nosotros.  \r\r Ofrecemos un servicio especial y cercano. Si tienes una tienda y deseas ofrecer a tus clientes productos tradicionales de alta calidad, o si eres un particular que ha salido de Andalucía y anhela esos dulces sabores de casa, estamos aquí para ti. Puedes ponerte en [contacto con nosotros](${CONTACT_PATH}) o realizar tus compras directamente en [nuestra tienda online](${PRODUCTS_PATH}).  \r\r Nos enorgullece ser más que una simple tienda, somos amigos de nuestros clientes y cultivamos una confianza máxima con cada uno de ellos. Porque para nosotros, cada cliente es parte de nuestra familia pastelera.  \r\r ¡Bienvenido a **El horno de la abuelita Maruja**, donde cada bocado es una tradición!`}
        cta={<Link
          asButton
          href={PRODUCTS_PATH}
        >Descubre nuestros productos
        </Link>}
        media="https://res.cloudinary.com/danimexivasco/image/upload/v1732700977/el_horno_de_la_abuelita_maruja/nyceqhsxseikqeon4c9e.jpg"
        mediaAspect="square"
        className="!py-0"
      />
    </Container>
  );
}