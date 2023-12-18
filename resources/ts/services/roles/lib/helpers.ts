export function rolesGuard(id: number) {
    // 1-admin,2-modificador,3-empleado, 4-cliente. No se tienen que borrar
    return [1, 2, 3, 4].includes(id);
}
