export const usuarioAutenticado = () => localStorage.getItem('usuario-token') !== null;

export const parseJwt = () => {
    let base64 = localStorage.getItem('usuario-token').split('.')[1];

    return JSON.parse(window.atob(base64))
}