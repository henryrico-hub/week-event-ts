import type { Dayjs } from 'dayjs';

export const dayjsES = (fecha: Dayjs)  => {
  const fechaNueva = fecha.toDate()
  const opciones: Intl.DateTimeFormatOptions = {
    dateStyle: 'full'
  };

  return fechaNueva.toLocaleDateString('es-ES', opciones);
  /* .format('dddd, DD MMMM YYYY'); */
};

export const formatearFecha = (fecha: Date | number | string): string => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };

  return fechaNueva.toLocaleDateString('es-ES', opciones);
};

export const formatearFechalg = (fecha: Date | number | string ): string => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    dateStyle: 'full'
    
  };

  return fechaNueva.toLocaleDateString('es-ES', opciones);
};

export const formatearHora = (fecha: Date | number | string): string => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: '2-digit',
  };

  return fechaNueva.toLocaleTimeString('es-ES',opciones)
};


export const formatearPrice = (price : number) => {

  let mxnMoneda = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'MXN',
  });
  return mxnMoneda.format(price)
  //console.log(`The formated version of ${price} is ${USDollar.format(price)}`);
  // The formated version of 14340 is $14,340.00
}