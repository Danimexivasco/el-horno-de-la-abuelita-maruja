/* eslint-disable @stylistic/js/max-len */

import Container from "@/app/_components/container";
import Headline from "@/app/_components/headline";

export default function CookiesPage() {
  return (
    <Container className="py-12 prose-base">
      <Headline>Política de Cookies</Headline>
      <div>
        <div>
          <Headline as="h3">¿Qué es una cookie?</Headline>
          <p>Una cookie es un fichero de texto <strong>inofensivo</strong> que se almacena en su navegador cuando visita casi cualquier página web. La utilidad de la cookie es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página. Aunque mucha gente no lo sabe las <i>cookies</i> se llevan utilizando desde hace 20 años, cuando aparecieron los primeros navegadores para la World Wide Web.</p>
        </div>
        <div>
          <Headline as="h3">¿Qué NO ES una cookie?</Headline>
          <p>No es un virus, ni un troyano, ni un gusano, ni spam, ni spyware, ni abre ventanas pop-up.</p>
        </div>
        <div>
          <Headline as="h3">¿Qué información almacena una cookie?</Headline>
          <p>Las <i>cookies</i> no suelen almacenar información sensible sobre usted, como tarjetas de crédito o datos bancarios, fotografías, su DNI o información personal, etc. Los datos que guardan son de carácter técnico, preferencias personales, personalización de contenidos, etc.</p>
          <p>El servidor web no le asocia a usted como persona si no a su navegador web. De hecho, si usted navega habitualmente con Internet Explorer y prueba a navegar por la misma web con Firefox o Chrome verá que la web no se da cuenta que es usted la misma persona porque en realidad está asociando al navegador, no a la persona.</p>
        </div>
        <div>
          <Headline as="h3">¿Qué tipo de cookies existen?</Headline>
          <ul className="list-disc pl-12">
            <li>
              <strong>Cookies técnicas:</strong> Son las más elementales y permiten, entre otras cosas, saber cuándo está navegando un humano o una aplicación automatizada, cuándo navega un usuario anónimo y uno registrado, tareas básicas para el funcionamiento de cualquier web dinámica.
            </li>
            <li>
              <strong>Cookies de análisis:</strong> Recogen información sobre el tipo de navegación que está realizando, las secciones que más utiliza, productos consultados, franja horaria de uso, idioma, etc.
            </li>
            <li>
              <strong>Cookies publicitarias:</strong> Muestran publicidad en función de su navegación, su país de procedencia, idioma, etc.
            </li>
          </ul>
        </div>
        <div>
          <Headline as="h3">¿Qué son las cookies propias y las de terceros?</Headline>
          <p>Las <i>cookies propias</i> son las generadas por la página que está visitando y las de <i>terceros</i> son las generadas por servicios o proveedores externos como Facebook, Twitter, Google, etc.</p>
        </div>
        <div>
          <Headline as="h3">¿Qué ocurre si desactivo las cookies?</Headline>
          <p>Para que entienda el alcance que puede tener desactivar las cookies le mostramos unos ejemplos:</p>
          <ul className="list-disc pl-12">
            <li>No podrá compartir contenidos de esa web en Facebook, Twitter o cualquier otra red social.</li>
            <li>El sitio web no podrá adaptar los contenidos a sus preferencias personales, como suele ocurrir en las tiendas online.</li>
            <li>No podrá acceder al área personal de esa web, como por ejemplo <i>Mi cuenta</i>, o <i>Mi perfil</i>o <i>Mis pedidos</i>.</li>
            <li>Tiendas online: Le será imposible realizar compras online, tendrán que ser telefónicas o visitando la tienda física si es que dispone de ella.</li>
            <li>No será posible personalizar sus preferencias geográficas como franja horaria, divisa o idioma.</li>
            <li>El sitio web no podrá realizar analíticas web sobre visitantes y tráfico en la web, lo que dificultará que la web sea competitiva.</li>
            <li>No podrá escribir en el blog, no podrá subir fotos, publicar comentarios, valorar o puntuar contenidos. La web tampoco podrá saber si usted es un humano o una aplicación automatizada que publica<i>spam</i>.</li>
            <li>No se podrá mostrar publicidad sectorizada, lo que reducirá los ingresos publicitarios de la web.</li>
            <li>Todas las redes sociales usan <i>cookies</i>, si las desactiva no podrá utilizar ninguna red social.</li>
          </ul>
        </div>
        <div>
          <Headline as="h3">¿Se pueden eliminar las cookies?</Headline>
          <p>Sí. No sólo eliminar, también bloquear, de forma general o particular para un dominio específico.</p>
          <p>Para eliminar las <i>cookies</i> de un sitio web debe ir a la configuración de su navegador y allí podrá buscar las asociadas al dominio en cuestión y proceder a su eliminación.</p>
        </div>
        <div>
          <Headline as="h3">Configuración de cookies para los navegadores más polulares</Headline>
          <p>
            A continuación le indicamos cómo acceder a una cookie determinada del navegador <strong>Chrome</strong>. Nota: estos pasos pueden variar en función de la versión del navegador:
          </p>
          <ol className="list-decimal pl-12">
            <li>Vaya a Configuración o Preferencias mediante el menú Archivo o bien pinchando el icono de personalización que aparece arriba a la derecha.</li>
            <li>Verá diferentes secciones, pinche la opción <i>Mostrar opciones avanzadas</i>.</li>
            <li>Vaya a <i>Privacidad</i>, <i>Configuración de contenido</i>.</li>
            <li>Seleccione <i>Todas las cookies y los datos de sitios</i>.</li>
            <li>Aparecerá un listado con todas las <i>cookies</i> ordenadas por dominio. Para que le sea más fácil encontrar las <i>cookies</i> de un determinado dominio introduzca parcial o totalmente la dirección en el campo <i>Buscar cookies</i>.</li>
            <li>Tras realizar este filtro aparecerán en pantalla una o varias líneas con las <i>cookies</i> de la web solicitada. Ahora sólo tiene que seleccionarla y pulsar la <i>X</i >para proceder a su eliminación.</li>
          </ol>
          <p>Para acceder a la configuración de cookies del navegador <strong>Firefox</strong> siga estos pasos (pueden variar en función de la versión del navegador):</p>
          <ol className="list-decimal pl-12">
            <li>Vaya a <i>Opciones</i>o <i>Preferencias</i> según su sistema operativo.</li>
            <li>Haga click en <i>Privacidad</i>.</li>
            <li>En <i>Historial</i> elija <i>Usar una configuración personalizada para el historial</i>.</li>
            <li>Ahora verá la opción <i>Aceptar cookies</i>, puede activarla o desactivarla según sus preferencias.</li>
          </ol>
          <p>Para acceder a la configuración de cookies del navegador <strong>Safari para OSX</strong> siga estos pasos (pueden variar en función de la versión del navegador):</p>
          <ol className="list-decimal pl-12">
            <li>Vaya a <i>Preferencias</i>, luego <i>Privacidad</i>.</li>
            <li>En este lugar verá la opción <i>Bloquear cookies</i> para que ajuste el tipo de bloqueo que desea realizar.</li>
          </ol>
          <p>Para acceder a la configuración de cookies del navegador <strong>Safari para iOS</strong> siga estos pasos (pueden variar en función de la versión del navegador):</p>
          <ol className="list-decimal pl-12">
            <li>Vaya a <i>Ajustes</i>, luego <i>Safari</i>.</li>
            <li>Vaya a <i>Privacidad y Seguridad</i>, verá la opción <i>Bloquear cookies</i> para que ajuste el tipo de bloqueo que desea realizar.</li>
          </ol>
          <p>Para acceder a la configuración de cookies del navegador para dispositivos <strong>Android</strong> siga estos pasos (pueden variar en función de la versión del navegador):</p>
          <ol className="list-decimal pl-12">
            <li>Ejecute el navegador y pulse la tecla <i>Menú</i>, luego <i>Ajustes</i>.</li>
            <li>Vaya a <i>Seguridad y Privacidad</i>, verá la opción <i>Aceptar cookies</i> para que active o desactive la casilla.</li>
          </ol>
          <p>Para acceder a la configuración de cookies del navegador para dispositivos <strong>Windows Phone</strong> siga estos pasos (pueden variar en función de la versión del navegador):</p>
          <ol className="list-decimal pl-12">
            <li>Abra <i>Internet Explorer</i>, luego <i>Más</i>, luego <i>Configuración</i></li>
            <li>Ahora puede activar o desactivar la casilla <i>Permitir cookies</i>.</li>
          </ol>
          <p>Para acceder a la configuración de cookies del navegador <strong>Internet Explorer</strong> siga estos pasos (pueden variar en función de la versión del navegador):</p>
          <ol className="list-decimal pl-12">
            <li>Vaya a <i>Herramientas</i>, <i>Opciones de Internet</i></li>
            <li>Haga click en <i>Privacidad</i>.</li>
            <li>Mueva el deslizador hasta ajustar el nivel de privacidad que desee.</li>
          </ol>
        </div>
      </div>
    </Container>
  );
}