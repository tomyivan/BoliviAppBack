import { PresidentApplication } from "../../../../app";
import { Request, Response } from "express";
import { ResponseApi } from "../../../../util";
export class PresidentController {
    constructor( private readonly _presidentApplication: PresidentApplication ) {}
    async getPresidents( req: Request, res: Response ) {
        try {
            const response = await this._presidentApplication.getPresidents({type: 'simplify'});
            return response.length > 0 ? ResponseApi.successResponse( res, 'Presidentes obtenidos', response ) :
            ResponseApi.notFoundResponse( res, 'No se econtraron presidentes', [] );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async getPresidentById( req: Request, res: Response ) {
        try {
            const { idPresident } = req.params;
            const response = await this._presidentApplication.getPresidentById( Number(idPresident) );
            return response ? ResponseApi.successResponse( res, 'Presidente obtenido', response ) :
            ResponseApi.notFoundResponse( res, 'No se econtraron presidentes', [] );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async createPresident( req: Request, res: Response ) {
        try {
            const { idUser } = req;
            console.log( "user", idUser );
            const { president } = req.body;
            if( !president?.mandates || president.mandates.length === 0) return ResponseApi.errorResponse( res, 'El presidente debe tener al menos un mandato', [] );
            const response = await this._presidentApplication.createPresident( president, Number(idUser) );
            return response ? ResponseApi.successResponse( res, 'Presidente creado', response ) :
            ResponseApi.errorResponse( res, 'Presidente no creado', response );
        } catch ( error ) {
            console.log(error)
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }

    async updatePresident( req: Request, res: Response ) {
        try {
            const { idUser } = req;
            
            const { president } = req.body;
            if( !president?.mandates || president.mandates.length === 0) return ResponseApi.errorResponse( res, 'El presidente debe tener al menos un mandato', [] );
            const response = await this._presidentApplication.updatePresident( president,Number(idUser) );
            return response ? ResponseApi.successResponse( res, 'Presidente actualizado', response ) :
            ResponseApi.errorResponse( res, 'Presidente no actualizado', response );
        } catch ( error ) {
            return res.status(500).json({ message: 'Error en el servidor', error });
        }
    }

    async deletePresident( req: Request, res: Response ) {
        try {
            const { idUser } = req;
            const { president } = req.body;
            const response = await this._presidentApplication.deletePresident( Number(president.idPresident), Number(idUser) );
            return response ? ResponseApi.successResponse( res, 'Presidente eliminado', response ) :
            ResponseApi.errorResponse( res, 'Presidente no eliminado', response );
        } catch ( error ) {
            return res.status(500).json({ message: 'Error en el servidor', error });
        }
    }

    async getPresidentImages( req: Request, res: Response ) {
        try {
            const { idPresident } = req.params;
            const response = await this._presidentApplication.getPresidentImagesByIdPresident( Number(idPresident) );
            return response.length > 0 ? ResponseApi.successResponse( res, 'Imagenes obtenidas', response ) :
            ResponseApi.notFoundResponse( res, 'No se econtraron imagenes', [] );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async createPresidentImage( req: Request, res: Response ) {
        try {
            const { params, file, idUser } = req;
            const response = await this._presidentApplication.createPresidentImage( file as Express.Multer.File, Number(params.idPresident), Number(idUser) );
            return response ? ResponseApi.successResponse( res, 'Imagen creada', response ) :
            ResponseApi.errorResponse( res, 'Imagen no creada', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async deletePresidentImage( req: Request, res: Response ) {
        try {
            const { idUser } = req;
            const { president } = req.body;
            const response = await this._presidentApplication.deletePresidentImage( Number(president.idFile), Number(idUser) );
            return response ? ResponseApi.successResponse( res, 'Imagen eliminada', response ) :
            ResponseApi.errorResponse( res, 'Imagen no eliminada', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async isFacePageImage( req: Request, res: Response ) {
        try {
            const { president } = req.body;
            const response = await this._presidentApplication.isFacePageImage( Number(president.idFile), Number(president.idPresident) );
            return response ? ResponseApi.successResponse( res, 'Imagen de portada', response ) :
            ResponseApi.errorResponse( res, 'No es imagen de portada', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
}
