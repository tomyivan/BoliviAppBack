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
    static createCode = () => `INSERT INTO codigos ( codigo, correo, fecha_expiracion ) VALUES (@code, @email, DATEADD(MINUTE, 5, GETDATE()))`;
    static updateCode = () => `UPDATE codigos SET fecha_expiracion = DATEADD(MINUTE, 5, GETDATE()), codigo = @code WHERE correo = @email `;
    static deleteCode = () => `DELETE FROM codigos WHERE correo = @email AND codigo = @code AND fecha_expiracion >= GETDATE()`;
}