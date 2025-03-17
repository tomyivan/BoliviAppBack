import { AuthQuery } from "../../../domain";

export class AuthQuerys {
    static getUser = ( q : AuthQuery ) => {
        let query = `SELECT id_usuario idUser, nombre name, apellidos lastname, alias nickname, correo email, num_cel phoneNumber,
            cod_cel codPhone, genero gender,  pass, editor issuer, rol, verificado isVerify    
        FROM usuarios WHERE activo = 1`;
        if (q?.email) query += ` AND correo = '${q.email}'`;
        if (q?.nickname) query += ` AND alias = '${q.nickname}'`;
        if (q?.issuer) query += ` AND editor = '${q.issuer}'`;
        // if (q?.city) query += ` AND ciudad = '${q.city}'`;
        return query;
    }
    static register = () => `INSERT INTO usuarios (token, nombre, apellidos, alias, correo, num_cel, cod_cel, genero, pass, editor, verificado) 
        VALUES (@token, @name, @lastname, @nickname, @email, @phoneNumber, @codPhone, @gender, @pass, @issuer, @isVerify)`;
}