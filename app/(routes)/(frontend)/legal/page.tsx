import Container from "@/app/_components/container";
import Headline from "@/app/_components/headline";
import Link from "@/app/_components/link";
import { COOKIES_PATH, PRIVACY_PATH } from "@/routes";

export default function LegalPage() {
  return (
    <Container className="py-12 prose-base">
      <Headline>Aviso Legal</Headline>
      <div>
        <div>
          <Headline as="h3">PRIMERO. TITULAR DE LA WEB</Headline>
          <p>El presente portal web pertenece a CANORRANCO S.L, con CIF B00000000, situada en <Link
            href="https://maps.app.goo.gl/RPeHkckEyHXTQwPW9"
            external
          >Calle La Luz
          </Link>, código postal 02434 de Letur (Albacete) e inscrita en el registro mercantil de Albacete en el Tomo 10.583, Libro 7864, Folio 204, Sección 8, Hoja V184.873. (en adelante El Horno de la Abuelita Maruja), pudiendo contactar en el correo electrónico info@elhornodelaabuelitamaruja.es
          </p>
        </div>
        <div>
          <Headline as="h3">SEGUNDO. ACCESO A LA WEB</Headline>
          <p>El Horno de la Abuelita Maruja pone a disposición del público (en adelante usuario), que acceda a la presente página web (en adelante WEB), información sobre los productos y servicios propios (en adelante CONTENIDOS y/o SERVICIOS).</p>
          <p>El acceso a determinadas secciones del portal requerirá la adquisición de la condición de usuario registrado, para ello, se deberá seguir los pasos indicados. </p>
        </div>
        <div>
          <Headline as="h3">TERCERO. UTILIZACIÓN CORRECTA DE LOS SERVICIOS</Headline>
          <p>El usuario se obliga a usar los Servicios de forma diligente, correcta y lícita y, en particular, a título meramente enunciativo y no limitativo, queda terminantemente prohibido:</p>
          <ul className="list-disc pl-12">
            <li>Utilizar los Servicios de forma, con fines o efectos contrarios a la ley, a la moral y a las buenas costumbres generalmente aceptadas o al orden público;</li>
            <li>Reproducir o copiar, distribuir, permitir el acceso del público a través de cualquier modalidad de comunicación pública, transformar o modificar los Servicios, a menos que se cuente con la autorización del titular de los correspondientes derechos o ello resulte legalmente permitido;</li>
            <li>Realizar cualquier acto que pueda ser considerado una vulneración de cualesquiera derechos de propiedad intelectual o industrial pertenecientes a El Horno de la Abuelita Maruja o a terceros;</li>
            <li>Emplear los Servicios y, en particular, la información de cualquier clase obtenida a través del Sitio Web para remitir publicidad, comunicaciones con fines de venta directa o con cualquier otra clase de finalidad comercial, mensajes no solicitados dirigidos a una pluralidad de personas con independencia de su finalidad, así como de comercializar o divulgar de cualquier modo dicha información;</li>
          </ul>
          <p>El usuario responderá de los daños y perjuicios de toda naturaleza que El Horno de la Abuelita Maruja pueda sufrir, con ocasión del incumplimiento de cualquiera de las obligaciones anteriormente expuestas así como cualesquier otras incluidas en las presentes Condiciones Generales y/o las impuestas por la Ley en relación con la utilización del Sitio Web.</p>
          <p>Todo usuario menor de edad deberá utilizar la Web bajo el consentimiento de su padre, madre o tutor legal, siendo estos los responsables de cualquier problema que pudiera acontecer en el uso de los servicios de la misma.</p>
          <p>El Horno de la Abuelita Maruja velará en todo momento por el respeto del ordenamiento jurídico vigente, y estará legitimada para interrumpir, a su entera discreción, el Servicio o excluir al usuario del Sitio Web en caso de presunta comisión, de alguno de los delitos o faltas tipificados por el Código Penal vigente, o en caso de observar cualesquiera conductas que a juicio de El Horno de la Abuelita Maruja resulten contrarias a estas Condiciones Generales o puedan perturbar el buen funcionamiento, imagen, credibilidad y/o prestigio de El Horno de la Abuelita Maruja</p>
        </div>
        <div>
          <Headline as="h3">CUARTO. REGLAS DE CONDUCTA</Headline>
          <p >Los usuarios podrán contactar con El Horno de la Abuelita Maruja e interactuar en determinadas secciones del portal web, por ejemplo compartiendo secciones en redes sociales, siempre y cuando respeten el presente código de conducta:</p>
          <ol className="list-decimal pl-12">
            <li >NINGÚN USUARIO PODRÁ HACERSE PASAR POR OTRA PERSONA U ORGANIZACIÓN, en caso contrario puede incurrir en falta o delito según el Código Penal y el Código Civil Español.</li>
            <li >NO SE PODRÁ UTILIZAR UN LENGUAJE IRRESPETUOSO Y OFENSIVO. No son admisibles mensajes con amenazas, insultos graves o cualquier otro tipo de comentario que pueda herir la sensibilidad. En tal caso, El Horno de la Abuelita Maruja se reserva el derecho de retirar cualquier contenido que contravenga la presente condición y ejercitar las vías judiciales oportunas.</li>
            <li>QUEDA TOTALMENTE PROHIBIDO presentar, citar y recomendar empresas, o portales web, y en general realizar acciones de marketing o spam. Ese tipo de contenidos serán eliminados junto con las cuentas que llevaron a cabo tal acción e incluso ponerlo en conocimiento de la Agencia Española de Protección de Datos.</li>
          </ol>
        </div>
        <div>
          <Headline as="h3">QUINTO. DERECHOS DE PROPIEDAD</Headline>
          <p>Todos los contenidos del Sitio Web, tales como textos, artículos de opinión, gráficos, fotografías, logotipos, iconos, imágenes, así como el diseño gráfico, código fuente y software, son de la exclusiva propiedad de El Horno de la Abuelita Maruja o de terceros, cuyos derechos al respecto ostenta legítimamente El Horno de la Abuelita Maruja, estando por lo tanto protegidos por la legislación nacional e internacional.</p>
          <p>Queda estrictamente prohibido la utilización de todos los elementos objeto de propiedad industrial e intelectual con fines comerciales así como su distribución, modificación, alteración o descompilación.</p>
        </div>
        <div>
          <Headline as="h3">SEXTO. EXCLUSIÓN DE GARANTÍAS Y DE RESPONSABILIDAD</Headline>
          <p>El Horno de la Abuelita Maruja se reserva el derecho a interrumpir el acceso a los servicios en cualquier momento y sin previo aviso, ya sea por motivos técnicos, de seguridad, de control, de mantenimiento, por fallos de suministro eléctrico o por cualquier otra causa justificada.</p>
          <p>En consecuencia, El Horno de la Abuelita Maruja no garantiza la fiabilidad, la disponibilidad ni la continuidad de la Web ni de los Servicios, por lo que la utilización de los mismos por parte de los usuarios se lleva a cabo por su propia cuenta y riesgo, sin que, en ningún momento, puedan exigirse responsabilidades a El Horno de la Abuelita Maruja en este sentido.</p>
          <p>Además El Horno de la Abuelita Maruja no asume responsabilidad alguna derivada, a título enunciativo pero no limitativo:</p>
          <ul className="list-disc pl-12">
            <li lang="es-ES">De la utilización que los usuarios hagan de los materiales dispuestos en la web, ya sean prohibidos o permitidos, en infracción de los derechos de propiedad intelectual y/o industrial de contenidos de la propia web o de los portales de terceros.</li>
            <li lang="es-ES">De los eventuales daños y perjuicios a los usuarios causados por un funcionamiento normal o anormal de las herramientas de búsqueda, de la organización o la localización de los contenidos y/o acceso a los servicios y, en general, de los errores o problemas que se generen en el desarrollo o instrumentación de los elementos técnicos que forman el servicio.</li>
            <li lang="es-ES">De los contenidos de aquellas páginas a las que los usuarios puedan acceder desde enlaces incluidos en la web.</li>
            <li lang="es-ES">De los actos u omisiones de terceros, con independencia de que estos terceros pudiesen estar unidos a El Horno de la Abuelita Maruja mediante vía contractual.</li>
          </ul>
          <p>De igual modo, El Horno de la Abuelita Maruja excluye cualquier responsabilidad por los daños y perjuicios de toda clase que puedan deberse a la presencia de virus o a la presencia de otros elementos lesivos en los contenidos que puedan producir alteración en los sistemas informáticos así como en los documentos o sistemas almacenados en los mismos, por lo que El Horno de la Abuelita Maruja no será responsable en ningún caso cuando se produzcan:</p>
          <ul className="list-disc pl-12">
            <li>Errores o retrasos en el acceso a los servicios por parte del usuario a la hora de introducir sus datos en el formulario correspondiente o cualquier anomalía que pueda surgir cuando estas incidencias sean debidas a problemas en la red Internet, causas de caso fortuito o fuerza mayor y cualquier otra contingencia imprevisible ajena a la buena fe de El Horno de la Abuelita Maruja</li>
            <li>Fallos o incidencias que pudieran producirse en las comunicaciones, borrado o transmisiones incompletas, de manera que no se garantiza que los servicios del sitio web estén constantemente operativos.</li>
            <li>De los errores o daños producidos al sitio web por un uso del servicio ineficiente y de mala fe por parte del usuario.</li>
            <li>De la no operatividad o problemas en la dirección de email facilitada por el usuario para el envío de la información solicitada.</li>
          </ul>
          <p>En todo caso, El Horno de la Abuelita Maruja se compromete a solucionar los problemas que puedan surgir y a ofrecer todo el apoyo necesario al usuario para llegar a una solución rápida y satisfactoria de la incidencia</p>
        </div>
        <div>
          <Headline as="h3">SÉPTIMO. ENLACES A OTROS SITIOS WEB</Headline>
          <p>El Horno de la Abuelita Maruja no garantiza ni asume ningún tipo de responsabilidad por los daños y perjuicios sufridos por el acceso al Servicios/contenido de terceros a través de conexiones, vínculos o links de los sitios enlazados ni sobre la exactitud o fiabilidad de los mismos. La función de los enlaces que aparecen en El Horno de la Abuelita Maruja es exclusivamente la de informar al usuario sobre la existencia de otras fuentes de información en Internet, donde podrá ampliar los Servicios ofrecidos por el Portal. El Horno de la Abuelita Maruja no será en ningún caso responsable del resultado obtenido a través de dichos enlaces o de las consecuencias que se deriven del acceso por los usuarios a los mismos. Estos Servicios de terceros son proporcionados por éstos, por lo que El Horno de la Abuelita Maruja no puede controlar y no controla la licitud de los Servicios ni su calidad. En consecuencia, el usuario debe extremar la prudencia en la valoración y utilización de la información y servicios existentes en los contenidos de terceros.</p>
          <p>Queda expresamente prohibida la introducción de hiperenlaces con fines mercantiles en páginas web ajenas a El Horno de la Abuelita Maruja que permitan el acceso al presente portal web sin consentimiento expreso de El Horno de la Abuelita Maruja En todo caso, la existencia de hiperenlaces en sitios web ajenos a la empresa, no implicará en ningún caso la existencia de relaciones comerciales o mercantiles con el titular de la página web donde se establezca el hiperenlace, ni la aceptación por parte de El Horno de la Abuelita Maruja.</p>
        </div>
        <div>
          <Headline as="h3">OCTAVO. TRATAMIENTO DE DATOS Y UTILIZACIÓN DE COOKIES</Headline>
          <p>De acuerdo con lo establecido en la normativa de protección de datos, le informamos de que los datos personales que nos facilite a través de nuestro sitio web o mediante envíos de correos electrónicos, serán tratados por LAGUTERCRECE S.L en su calidad de responsable del tratamiento, bajo la legitimidad otorgada por el consentimiento prestado por el usuario para las finalidades descritas en la <Link href={PRIVACY_PATH}>política de privacidad</Link>, la cual debe ser leída, comprendida y aceptada para la utilización del presente portal web.</p>
          <p>El usuario responderá, en cualquier caso, de la veracidad de los datos facilitados y podrá ejercitar los derechos de acceso, supresión, rectificación, oposición, limitación del tratamiento y portabilidad, mediante escrito dirigido a la empresa, bien a su domicilio social, bien a través de correo electrónico a{" "}
            <Link
              href="info@elhornodelaabuelitamaruja.es"
              external
            >info@elhornodelaabuelitamaruja.es
            </Link> siempre y cuando acredite su identidad. Y en el caso de que lo estime oportuno, podrá acudir a la Agencia Española de Protección de Datos.
          </p>
          <p>Por su parte, El Horno de la Abuelita Maruja se compromete al cumplimiento de la obligación de secreto de los datos de carácter personal, por ello ha adoptado las medidas necesarias para evitar su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta en todo momento del estado de la tecnología.</p>
          <p>Por otra parte, El Horno de la Abuelita Maruja le informa que por visitar el presente portal web no queda registrado de forma automática ningún dato de carácter personal que identifique a un Usuario, en cambio existe determinada información de carácter no personal y no identificable con un Usuario concreto que se recoge durante la sesión en directo para a través de dispositivos denominados “cookies” que nos permiten obtener información estadística sobre el uso del portal web para luego poder realizar mejoras. Todo usuario debe consultar nuestra <Link href={COOKIES_PATH}>política de cookies</Link> para navegar por la web.</p>
        </div>
        <div>
          <Headline as="h3">NOVENO. LEY APLICABLE Y JURISDICCIÓN</Headline>
          <p>Para cuantas cuestiones interpretativas o litigiosas que pudieran plantearse será de aplicación la legislación española y en caso de controversia, ambas partes acuerdan someterse, con renuncia a cualquier otro fuero que pudiera corresponderle, a la jurisdicción de los Juzgados y Tribunales de la ciudad de Albacete (España).</p>
          <p>En cambio para resolver cuantas cuestiones interpretativas o litigiosas que pudieran plantearse por la adquisición de los productos, las partes se someterán a los juzgados y tribunales del domicilio del consumidor Por último, a los efectos legales oportunos, recordamos que la Comisión Europea ha creado una plataforma de resolución extrajudicial de litigios online que se encuentra disponible en el siguiente enlace, http://ec.europa.eu/consumers/odr/.</p>
        </div>
      </div>
    </Container>
  );
}