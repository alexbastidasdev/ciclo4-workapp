const generarId = () => {
    const random = Math.random().toString(32).substring(2); //substring(2) para quitar el 0. del principio
    const fecha = Date.now().toString(32);
    return random + fecha;
};

export default generarId;