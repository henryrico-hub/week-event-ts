import type { Dayjs } from "dayjs";

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const setToken = (token: string) => {
  if (token) {
    localStorage.setItem("authToken", token);
  }
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};

export const dayjsES = (fecha: Dayjs) => {
  const fechaNueva = fecha.toDate();
  const opciones: Intl.DateTimeFormatOptions = {
    dateStyle: "full",
  };

  return fechaNueva.toLocaleDateString("es-ES", opciones);
  /* .format('dddd, DD MMMM YYYY'); */
};

export const formatearFecha = (fecha: Date | number | string): string => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  return fechaNueva.toLocaleDateString("es-ES", opciones);
};

export const formatearMesDiaHora = (fecha: Date | number | string): string => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
  };
  const fechaFormateada = fechaNueva.toLocaleDateString("es-ES", opciones);
  let horas = fechaNueva.getHours();
  const minutos = fechaNueva.getMinutes().toString().padStart(2, "0");
  const ampm = horas >= 12 ? "pm" : "am";
  horas = horas % 12 || 12;
  return `${fechaFormateada}, ${horas}:${minutos} ${ampm}`;
};

export const formatearFechalg = (fecha: Date | number | string): string => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    dateStyle: "full",
  };

  return fechaNueva.toLocaleDateString("es-ES", opciones);
};

export const formatearDayStyle = (fecha: Date | number | string) => {
  const fechaNueva = new Date(fecha);
  const dayNum: Intl.DateTimeFormatOptions = {
    day: "numeric",
  };
  return fechaNueva.toLocaleDateString("es-ES", dayNum);
};

export const formatearDayNameStyle = (fecha: Date | number | string) => {
  const fechaNueva = new Date(fecha);
  const dayNum: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  return fechaNueva.toLocaleDateString("es-ES", dayNum);
};
export const formatearMonthNameStyle = (fecha: Date | number | string) => {
  const fechaNueva = new Date(fecha);
  const dayNum: Intl.DateTimeFormatOptions = {
    month: "long",
  };
  return fechaNueva.toLocaleDateString("es-ES", dayNum);
};
export const formatearYearNameStyle = (fecha: Date | number | string) => {
  const fechaNueva = new Date(fecha);
  const dayNum: Intl.DateTimeFormatOptions = {
    year: "numeric",
  };
  return fechaNueva.toLocaleDateString("es-ES", dayNum);
};

export const formatearHora = (fecha: Date | number | string): string => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return fechaNueva.toLocaleTimeString("es-ES", opciones);
};

export const formatearPrice = (price: number) => {
  const mxnMoneda = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "MXN",
  });
  return mxnMoneda.format(price);
  //console.log(`The formated version of ${price} is ${USDollar.format(price)}`);
  // The formated version of 14340 is $14,340.00
};
