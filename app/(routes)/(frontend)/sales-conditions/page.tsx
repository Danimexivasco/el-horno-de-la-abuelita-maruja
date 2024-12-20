/* eslint-disable @stylistic/js/max-len */

import Container from "@/app/_components/container";
import Headline from "@/app/_components/headline";
import Link from "@/app/_components/link";
import { LEGAL_PATH, PRIVACY_PATH } from "@/routes";

export default function SalesConditionsPage() {
  return (
    <Container className="py-12">
      <Headline className="mb-12">Condiciones de venta, envío y devolución</Headline>
      <p>
        El presente documento establece las condiciones que se aplican a las ventas entre, las personas que quieren efectuar una compra en el presente sitio web a las que en adelante se referirá como «el cliente» y de El Horno de la abuelita Maruja, S.L.,
        (en adelante EL HORNO DE LA ABUELITA MARUJA).
      </p><br />
      <p>
        Al hacer uso de esta página web o la solicitud de compra del cliente constituye la aceptación de las condiciones de compra y nuestra política de Protección de Datos, que el cliente debe consultar y aceptar con carácter previo a la
        compra del producto. Estas condiciones de compra pueden variar. Es responsabilidad del cliente leerlas periódicamente, ya que se aplicaran en el momento de la compra las que estén vigentes. Para cualquier duda sobre las condiciones
        o la protección de datos rellene el formulario de contacto o contacte con nuestro departamento online en el correo electrónico <Link
          href="mailto:info@elhornodelaabuelitamaruja.es"
          external
        >info@elhornodelaabuelitamaruja.es
        </Link>
      </p><br />
      <div className="grid gap-8">
        <div>
          <Headline as="h3">1. Objeto y ámbito de aplicación</Headline>
          <p>
            El usuario manifiesta conocer, en el momento de la realización del pedido, las condiciones particulares de venta indicadas en la ficha de cada producto (tipo de producto, precio, alérgenos etc.) y declara expresamente aceptarlas sin
            reserva alguna. La realización del pedido y su confirmación por parte del usuario lo convierte en cliente e implica la aceptación plena y completa de las condiciones particulares de venta, solamente aplicables al pedido, así como la
            aceptación del resto de los documentos legales publicados tanto en la web como en el <Link href={LEGAL_PATH}>aviso legal</Link> y la <Link href={PRIVACY_PATH}>política de privacidad</Link>.
          </p>
        </div>
        <div>
          <Headline as="h3">2. Procesos de compra</Headline>
          <p>Para la adquisición de los productos ofertados se deberán seguir los siguientes pasos:</p><br />
          <p>
            Selección de productos: Navegue por nuestra página y pulse el botón “Añadir al Carrito” cada vez que desee incorporar un producto a la compra. El carrito de compra contiene el nombre del producto seleccionado, la cantidad y el
            precio en euros.
          </p><br />
          <p>Inicio del proceso de compra: para iniciar el proceso de compra pulse el botón “Finalizar Compra”. Se pedirá que facilite sus datos de facturación y la fecha de entrega.</p><br />
          <p>Verificación de los datos de la compra: Previamente a realizar el pago podrá verificar los datos de su compra y corregir cualquier error producido en la introducción de datos.</p><br />
          <p>
            Selección del medio de pago: Introduzca los datos de su tarjeta bancaria. Este será el único momento en que se le solicitará esta información.<br />
            En el momento en que facilite todos los datos necesarios y pulse el botón de confirmación de compra (“realizar pedido”) el contrato quedará perfeccionado a todos los efectos.
          </p><br />
          <p>Confirmación de compra: Una vez recibamos la aceptación, El horno de la abuelita Maruja emitirá una confirmación en pantalla que podrá archivar y que contendrá la siguiente información:</p>
          <ul className="grid gap-4 list-disc pl-12 py-4">
            <li>Número de pedido.</li>
            <li>Fecha de pedido.</li>
            <li>Resumen de los productos que se incluyen en la compra.</li>
          </ul>
          <br />
          <p>Durante todo el proceso de compra puede consultar las presentes Condiciones Generales de Compra así como conocer el precio final de los productos seleccionados.</p>
        </div>
        <div>
          <Headline as="h3">3. Ficha de los productos y características</Headline>
          <p>Las tartas llegarán a su domicilio tal y como aparece en la web y con el tamaño solicitado. En El horno de la abuelita Maruja, no escribimos sobre las tartas.</p><br />
          <p>Las tartas están elaboradas el día de antes para que lleguen recién hechas a sus domicilios y se mantienen en nevera en perfecto estado hasta 4 días después de su recepción.</p><br />
          <p>
            En El horno de la abuelita Maruja nos hacemos cargo de cualquier desperfecto que se pueda ocasionar a la hora del envío, por eso, si tu tarta no llega en las condiciones perfectas háznoslo saber y consulta nuestra política de cambios y devoluciones
            descrita en los siguientes apartados.
          </p><br />
          <p>Los cupones de descuento se pueden aplicar a toda la web menos a productos ya en promoción y NOVEDADES.</p><br />
          <p>
            La información que se muestra en la web pretende ser veraz y sin errores tipográficos. En el caso que en algún momento se produjera algún error de este tipo, ajeno en todo momento a la voluntad de El horno de la abuelita Maruja, se procederá inmediatamente
            a su corrección. Debes tener en cuenta que los productos ofertados son artesanales, por lo que puede haber ligeras diferencias en cuanto al producto final suministrado respecto a la foto ilustrativa publicada en la web.
          </p><br />
        </div>
        <div>
          <Headline as="h3">4. Idiomas para la adquisición de productos</Headline>
          <p>Las compras realizadas por clientes se entenderán vinculadas sólo en castellano.</p>
        </div>
        <div>
          <Headline as="h3">5. Condiciones de pago</Headline>
          <p>
            En caso de que el usuario efectúe el pago mediante tarjeta de crédito, los datos bancarios serán transmitidos mediante un protocolo seguro a nuestra entidad bancaria a través del sistema de pago Redsys, cuyos sistemas y protocolos
            de seguridad y encriptación garantizan el envío cifrado de los datos.
          </p><br />
          <p>
            Los datos de las tarjetas de crédito no serán utilizados jamás por El horno de la abuelita Maruja más que a fin de completar los procedimientos relativos a la compra, emitir los correspondientes reembolsos en caso de eventuales devoluciones y prevenir e
            informar a las fuerzas de policía en caso de que se cometiese o estuviese por ser cometido algún fraude.
          </p>
        </div>
        <div>
          <Headline as="h3">6. Precio</Headline>
          <p>
            Todos los precios se indican por defecto en euros. El precio indicado incluyen los impuestos aplicables a la transacción. El precio y las condiciones de los productos ofrecidos podrán variar, pero en cualquier caso siempre regirán
            para el usuario el precio y las condiciones que había cuando realizó el pedido.
          </p>
        </div>
        <div>
          <Headline as="h3">7. Condiciones de envío</Headline>
          <p>Dada la particularidad del tipo de transporte de frio que necesitan los productos comercializados en la web, El horno de la abuelita Maruja sólo puede ofrecer envío a España peninsular.</p><br />
          <p>
            Antes de iniciar el proceso de compra, si el reparto es el Valencia o Alicante, podrás verificar en nuestro buscador de códigos postales si tu población se encuentra en la lista. Si no se encuentra, el envío se realizará mediante un
            envío nacional.
          </p><br />
          <p>Los pedidos realizados con envío Valencia y Alicante antes del 13.00h pueden ser entregados en 24h (Ejemplo: si pides un lunes antes de las 13.00h, el pedido se podrá entregar el martes).</p><br />
          <p>
            La franja horaria de entrega será de 7:30h a 17:30h en el caso de envío Valencia y Alicante. En caso de envío nacional, el horario es gestionado por SEUR frío y desde El horno de la abuelita Maruja no podemos saberlo con antelación. En nuestra web puedes
            elegir el día de entrega hasta con un mes de antelación.
          </p><br />
          <p>
            Los pedidos realizados con envío nacional antes de las 00:00h se entregarán en 48h mediante SEUR FRÍO de martes a viernes. (Ejemplo: si pides un martes, lo más pronto que entregaremos será un jueves). El día de entrega lo selecciona
            el cliente al realizar el pedido. Si necesitas un pedido para un día en concreto a primera hora del día, te recomendamos hacer tu pedido para un día antes.
          </p><br />
          <p>Recuerda que si es FESTIVO en tu Comunidad Autónoma, es posible que no recibas el pedido el día seleccionado. En la mayoría de las Comunidades Autónomas, SEUR frío no trabaja los días festivos.</p>
        </div>
        <div>
          <Headline as="h3">7. Gastos y formas de envío</Headline>
          <p>Durante el proceso de compra, podrás ver el gasto concreto del envío dependiendo del código postal seleccionado para la entrega.</p><br />
          <p>
            <strong>ENVÍOS REALIZADOS EN VALENCIA:</strong> El horno de la abuelita Maruja se encarga con sus propios medios de los envíos realizados dentro de la ciudad mediante un sistema logístico circular, es decir, su tarta será entregada según el paso del
            repartidor. No trabajamos con franjas horarias. Los clientes no pueden elegir la hora de entrega previamente.
          </p><br />
          <p>
            Las horas de entrega solamente son de 7:30h a 17:30h de lunes a sábado. Los gastos de envío son 4€ o 5€ según zona de entrega. El horno de la abuelita maruja, estará en contacto con usted vía WhatsApp en todo momento para informales de la ruta y la
            hora aproximada de su entrega.
          </p><br />
          <p>
            <strong>ENVÍOS REALIZADOS EN ALICANTE:</strong> El horno de la abuelita Maruja se encarga con sus propios medios de los envíos realizados dentro de la ciudad mediante un sistema logístico circular, es decir, su tarta será entregada según el paso del
            repartidor. No trabajamos con franjas horarias. Los clientes no pueden elegir la hora de entrega previamente.
          </p><br />
          <p>
            Las horas de entrega solamente son de 7:30h a 17:00h de miércoles a sábado. Los gastos de envío son 5,90€. El horno de la abuelita maruja, estará en contacto con usted vía WhatsApp en todo momento para informales de la ruta y la hora aproximada de
            su entrega.
          </p><br />
          <p>
            <strong>ENVÍOS NACIONALES EN ESPAÑA PENINSULAR:</strong> Se realizan con la empresa de mensajería de SEUR frío. Ellos gestionan las horas de entrega y su forma de envío. Para saber el seguimiento del pedido, llámenos al 960 106 236
            y le enviaremos el número de seguimiento para que se ponga en contacto con ellos y poder ver la situación. Su gasto de envío son 5,90€. Desde El horno de la abuelita maruja no conocemos las horas de entrega de los pedidos de nacional gestionados por
            SEUR.
          </p><br />
          <p>
            Si tu pedido es envío nacional y lo necesitas para un día en concreto a primera hora del día, te recomendamos hacer tu pedido para que llegue un día antes.
          </p><br />
          <p>Las entregas de envíos nacionales en España peninsular se harán de martes a viernes.</p>
        </div>
        <div>
          <Headline as="h3">9. Recogida en tienda</Headline>
          <p>Si el cliente lo desea podrá recoger su pedido, sin coste adicional, en cualquiera de nuestras tiendas físicas:</p><br />
          <ul className="grid gap-4 list-disc pl-12 py-4">
            <li>Tienda El horno de la abuelita maruja Valencia. Carrer Consulat del Mar, 3. El horario de recogida es de L a S de 11:00h a 20:30h.</li>
            <li>Tienda El horno de la abuelita maruja en Alzira (Valencia) Av. del Dret de Manifestació nº 82. El horario de recogida es de L a V de 10:00h a 14:00h y de 16:00 a 19:00. Sábados de 9:00 a 14:00h</li>
          </ul>
        </div>
        <div>
          <Headline as="h3">10. Recepción de los productos</Headline>
          <p>
            Al recibir los productos deberás firmar la hoja de recepción presentada por la persona que realiza la entrega, en la que podrá incluir todas las observaciones que considere necesarias. Mediante la firma de la hoja de recepción, el
            cliente reconoce haber recibido el número de bultos indicados en la misma. Si el cliente observa productos estropeados o la falta de productos, deberá realizar una reclamación por e-mail a{" "}
            <Link
              href="mailto:info@elhornodelaabuelitamaruja.es"
              external
            >info@elhornodelaabuelitamaruja.es
            </Link> en un plazo máximo de 24 horas para poder dar parte al seguro de la compañía de transporte. Sin que por ello se limiten los derechos del consumidor.
          </p><br />
          <p>
            El cliente deberá contactar con nosotros mediante llamada telefónica o WhatsApp en el teléfono 673276813 y facilitando el número de pedido, las fotos del producto y la razón de la incidencia para que el equipo de Atención al cliente
            pueda facilitarle una solución.
          </p><br />
          <p>Si es una incidencia en el producto, se le ofrecerá al cliente la posibilidad de reembolsar el importe del pedido o el envío de un nuevo producto el día que desee.</p>
        </div>
        <div>
          <Headline as="h3">11. Cambios y devoluciones</Headline>
          <p>
            El cliente deberá realizar los cambios de pedido o cancelaciones como mínimo 48 horas antes del día programado para recibir el pedido, sin que por ello se aplique cargo alguno. Para cambiar o cancelar el pedido, el cliente deberá
            llamar o escribir al WhatsApp 673276813 e informar del cambio o cancelación que quiere realizar junto al número de pedido.
          </p>
        </div>
        <div>
          <Headline as="h3">12. Derecho de desistimiento</Headline>
          <p>Los productos comercializados en El horno de la abuelita Maruja quedan excluidos del derecho de desistimiento en base a las siguientes excepciones incluidas en el artículo 103 del Texto Refundido de los Consumidores y Usuarios:</p><br />
          <ul className="grid gap-4 list-disc pl-12 py-4">
            <li>
              (i) Cuando los bienes hayan sido confeccionados conforme a las especificaciones del consumidor y usuario o claramente personalizados conforme a lo establecido en el art. 103 c) del Texto Refundido de los Consumidores y Usuarios;
              o
            </li>
            <li>(ii) Cuando los bienes suministrados puedan deteriorarse o caducar con rapidez conforme establece el artículo 103 d) del Texto Refundido de los Consumidores y Usuarios.</li>
          </ul>
        </div>
        <div>
          <Headline as="h3">13. Quejas o reclamaciones</Headline>
          <p>
            No obstante, si cualquier cliente desea tramitar una queja o reclamación, bien podrá escribirnos al correo{" "}
            <Link
              href="mailto:info@elhornodelaabuelitamaruja.es"
              external
            >info@elhornodelaabuelitamaruja.es
            </Link> para relatar lo sucedido para buscar una solución
            satisfactoria, o podrá acceder al enlace a la plataforma ODR de resolución de litigios en línea que se encuentra establecido en el punto 15 de las presentes condiciones.
          </p>
        </div>
        <div>
          <Headline as="h3">14. Información solicitada</Headline>
          <p>
            De acuerdo con lo establecido en la normativa de protección de datos, le informamos de que los datos personales que nos facilite a través de nuestro sitio web o mediante envíos de correos electrónicos, serán tratados por
            El Horno de la abuelita Maruja, S.L. como responsable del tratamiento para poder realizar las transacciones solicitadas, así como recibir notificaciones periódicas a través de medios electrónicas. La legitimación del tratamiento
            reside en la prestación de los servicios solicitados. Puede ampliar más información sobre el tratamiento de sus datos las finalidades descritas en la{" "}
            <Link href={PRIVACY_PATH}>política de privacidad</Link>, la cual debe ser leída, comprendida y aceptada para la utilización de los servicios presente portal web.
          </p><br />
          <p>
            EL HORNO DE LA ABUELITA MARUJA se compromete al cumplimiento de la obligación de secreto de los datos de carácter personal, por ello ha adoptado las medidas necesarias para evitar su alteración, pérdida, tratamiento o acceso no autorizado,
            habida cuenta en todo momento del estado de la tecnología.
          </p><br />
          <p>
            En cualquier caso, todos los usuarios tienen derecho a ejercitar, en cualquier momento, los derechos de acceso, rectificación, limitación del tratamiento, supresión, oposición, limitación del tratamiento, y portabilidad de
            datos que le asisten, mediante escrito dirigido a, EL HORNO DE LA ABUELITA MARUJA en la dirección electrónica{" "}
            <Link
              href="mailto:info@elhornodelaabuelitamaruja.es"
              external
            >info@elhornodelaabuelitamaruja.es
            </Link>, acreditando su identidad. En el caso de que considere, puede presentar
            una reclamación ante la Agencia Española de Protección de Datos.
          </p>
        </div>
        <div>
          <Headline as="h3">15. Legislación aplicable. Sumisión a fueros</Headline>
          <p>
            La venta se entiende efectuada en territorio español, por lo que para cuantas cuestiones interpretativas o litigiosas pudieran plantearse, será de aplicación la legislación española y, en caso de controversia, ambas partes acuerdan
            someterse, con renuncia a cualquier otro fuero que pudiera corresponderle, a la jurisdicción de los Juzgados y Tribunales del domicilio del consumidor.
          </p><br />
          <p>
            Por último, recordamos a los clientes que en el caso de quieran presentar una reclamación por alguna incidencia en la relación contractual pueden presentar la reclamación oportuna rellenando el siguiente formulario electrónico:{" "}
            <Link
              href="http://ec.europa.eu/consumers/odr/"
              external
            >http://ec.europa.eu/consumers/odr/
            </Link>
          </p>
        </div>
      </div>
    </Container>

  );
}