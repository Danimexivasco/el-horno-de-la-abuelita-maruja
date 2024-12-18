/* eslint-disable @stylistic/js/max-len */

import Container from "@/app/_components/container";
import Headline from "@/app/_components/headline";
import Link from "@/app/_components/link";
import { COOKIES_PATH } from "@/routes";

export default function PrivacyPage() {
  return (
    <Container className="py-12">
      <Headline className="mb-12">Política de privacidad</Headline>
      <div className="grid gap-8">
        <div>
          <Headline as="h3">1. Política de Privacidad y Seguridad</Headline>
          <p>
            La siguiente información sobre nuestra Política de Privacidad refleja el compromiso de LAGUTER CRECE S.L, (en adelante El Horno de la abuelita Maruja), como responsable del tratamiento, por mantener y garantizar relaciones comerciales seguras
            mediante la protección de los datos personales, garantizando el derecho a la privacidad de cada uno de los usuarios de nuestros servicios. En este documento explicamos cómo utilizamos los datos personales durante el uso de nuestros
            servicios.
          </p>
        </div>
        <div>
          <Headline as="h3">2. Definición de dato personal</Headline>
          <p>Como «Dato Personal» debemos entender cualquier información concerniente a una persona física identificada o identificable. Entre otros, se incluyen el nombre, apellidos, la dirección postal y electrónica, así como el número de teléfono.</p>
        </div>
        <div>
          <Headline as="h3">3. Tratamientos y finalidades de los datos recogidos</Headline>
          <p>Cualquier dato personal que nos facilite al visitar nuestro portal web será tratado de conformidad con las normas de protección de datos y sólo serán recogidos, tratados y utilizados para fines lícitos, legítimos e informados. Por ello, detallamos todas las finalidades con las que LAGUTER CRECE S.L utiliza datos personales:</p>
          <div className="grid gap-4 py-8">
            <div>
              <Headline as="h4">- Por el envío de formularios de contacto o correos electrónicos:</Headline>
              <ul className="grid gap-4 list-disc pl-12 py-4">
                <li><strong>Finalidad:</strong> Poder responder a las consultas planteadas y ponerse en contacto con el usuario para resolver las dudas o cuestiones planteadas.</li>
                <li><strong>Legitimación:</strong> La base legítima con la que se tratarán los datos reside en la ejecución de las medidas precontractuales solicitadas y/o el consentimiento prestado.</li>
                <li><strong>Plazos de conservación:</strong> Los datos serán conservados durante el tiempo necesario para responder a las cuestiones planteadas.</li>
              </ul>
            </div>
            <div>
              <Headline as="h4">- Por la introducción del correo electrónico para la suscripción al boletín de noticias:</Headline>
              <ul className="grid gap-4 list-disc pl-12 py-4">
                <li><strong>Finalidad:</strong> Remitirle las newsletters solicitadas, así como remitirle información comercial sobre nuevos productos y servicios.</li>
                <li><strong>Legitimación:</strong> La base legítima con la que se tratarán los datos reside en la ejecución de las medidas precontractuales solicitadas y/o el consentimiento prestado.</li>
                <li><strong>Plazos de conservación:</strong> Los datos serán conservados durante el tiempo necesario para responder a las cuestiones planteadas.</li>
              </ul>
            </div>
            <div>
              <Headline as="h4">- Por las transacciones / adquisición de productos:</Headline>
              <ul className="grid gap-4 list-disc pl-12 py-4">
                <li><strong>Finalidad:</strong> Poder realizar las gestiones pertinentes de venta de los productos seleccionados además de remitirle información comercial a través de medios electrónicos.</li>
                <li><strong>Legitimación:</strong> La base legítima con la que se tratarán los datos reside en la ejecución de las medidas precontractuales solicitadas y/o el consentimiento prestado.</li>
                <li>
                  <strong>Comunicación de datos a terceros:</strong> Sus datos serán comunicados a las entidades bancarias para poder realizar las transacciones económicas pertinentes así como a los diferentes operadores logísticos para que se realice la entrega
                  de los productos seleccionados.
                </li>
                <li><strong>Plazos de conservación:</strong> Los datos serán conservados durante el tiempo necesario para cumplir con las obligaciones legales pertinentes, como por ejemplo, fiscales.</li>
              </ul>
            </div>
          </div>
          <p>
            Desde El Horno de la abuelita Maruja informaremos a todos los usuarios el carácter no obligatorio de la recogida de determinados datos de carácter personal, salvo en los campos que se indique lo contrario. No obstante, la no cumplimentación de
            dichos datos podrá impedir a El Horno de la abuelita Maruja prestar todos aquellos Servicios vinculados a tales datos, liberándonos de toda responsabilidad por la no prestación o prestación incompleta de estos Servicios.
          </p><br />
          <p>
            Corresponde al usuario la obligación de facilitar los datos de manera veraz y mantenerlos actualizados, por lo que El Horno de la abuelita Maruja se reserva el derecho de excluir de los servicios y proceder a la cancelación del servicio a todo
            usuario que haya facilitado datos falsos, sin perjuicio de las demás acciones que procedan en Derecho.
          </p><br />
          <p>Sus datos personales NO serán comunicados a ninguna otra empresa. En el caso de que fuera necesario comunicar su información a otra entidad, se solicitaría su consentimiento expreso antes de realizar la comunicación.</p>
        </div>
        <div>
          <Headline as="h3">4. Seguridad de sus datos personales</Headline>
          <p>
            El Horno de la abuelita Maruja tiene una preocupación especial por garantizar la seguridad de sus datos personales. Sus datos son almacenados en nuestros sistemas de información, donde hemos adoptado e implantado medidas de seguridad, técnicas y
            organizativas, para prevenir cualquier pérdida o uso no autorizado por terceros, por ejemplo nuestros portales web utilizan protocolos de cifrado de datos Https.
          </p>
        </div>
        <div>
          <Headline as="h3">5. Información sobre la Utilización de cookies</Headline>
          <p>
            Por el mero hecho de visitar el presente portal web o utilizar los servicios de El Horno de la abuelita Maruja no queda registrado de forma automática ningún dato de carácter personal que identifique a un Usuario. Sin embargo, le informamos que
            durante la navegación por el Sitio Web se utilizan «cookies», pequeños ficheros de datos que se generan en el ordenador del internauta y que nos permiten obtener la siguiente información analítica:
          </p>
          <p className="pl-8 py-4">
            a) La fecha y hora de acceso a la Web, permitiendo saber las horas de más afluencia, y hacer los ajustes precisos para evitar problemas de saturación en nuestras horas punta.<br />
            b) El número de visitantes diarios de cada sección, permitiendo conocer las áreas de más éxito y aumentar y mejorar su contenido, con el fin de que los usuarios obtengan un resultado más satisfactorio y mejorar el diseño de los
            contenidos.<br />
            c) La fecha y hora de la última vez que el usuario visitó el Sitio Web para realizar estudios analíticos y estadísticos sobre el uso que tiene la web.<br />
            d) Elementos de seguridad que intervienen en el control de acceso a las áreas restringidas.
          </p>
          <p>Para más información visite nuestra <Link href={COOKIES_PATH}>política de cookies</Link></p>
        </div>
        <div>
          <Headline as="h3">6. Derechos de los usuarios</Headline>
          <p>
            Todos los usuarios pueden ejercitar cualquier de los derechos otorgados por la normativa de protección de datos, como el derecho de acceso, rectificación, limitación del tratamiento, supresión, portabilidad de datos y
            oposición que le asisten mediante escrito dirigido a la dirección electrónica a nuestro delegado de protección de datos info@elhornodelaabuelitamaruja.es. Y en el caso de que lo estime oportuno podrá presentar reclamación ante la Agencia
            Española de Protección.
          </p>
        </div>
        <div>
          <Headline as="h3">7. ¿No desea recibir información de nosotros o desea revocar su consentimiento?</Headline>
          <p>
            Cualquier usuario puede oponerse al uso de su información para fines publicitarios, investigaciones de mercado o desarrollo de encuestas de satisfacción, así como revocar su consentimiento en cualquier momento (sin efecto
            retroactivo). Para ello, deberá enviar un correo electrónico a la dirección info@elhornodelaabuelitamaruja.es. Cuando reciba publicidad por correo electrónico, también podrá oponer desde dicho correo electrónico, pinchando en el enlace incluido
            en el mismo y siguiendo las instrucciones que le sean facilitadas.
          </p>
        </div>
        <div>
          <Headline as="h3">8. Cambios a la Política de Privacidad</Headline>
          <p>
            Nuestra Política de Privacidad podrá sufrir actualizaciones, debidas a cambios y necesidades legales, así como debidas a mejoras y cambios incluidos en la forma de ofrecer y prestar nuestros servicios. Por ello, le recomendamos que
            visite y acceda a nuestra Política de Privacidad periódicamente, para poder tener acceso y conocer los últimos cambios que hayan podido ser incorporados. En caso de que dichos cambios guarden relación con el consentimiento prestado
            por el usuario, en tal caso le será enviada una notificación independiente y por separado para recavarlo nuevamente.
          </p><br />
          <p>
            Si durante la lectura le ha surgido alguna duda o cuestión sobre nuestra Política de Privacidad o quiere ejercitar algún derecho o acción relativa a sus datos personales, por favor póngase en contacto con nosotros en la siguiente
            dirección de correo electrónico info@elhornodelaabuelitamaruja.es.
          </p>
        </div>
      </div>
    </Container>
  );
}