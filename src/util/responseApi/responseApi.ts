import { Response as expressResponse } from "express";
export class ResponseApi {
    static successResponse( res: expressResponse,  msg: string, data: any) {
        return res.status(200).json({
            status: 200,
            ok: true,
            msg,
            body: {
                
                data
            }
        });
    }
    static errorResponse(res: expressResponse, msg:string, data: any) {
        return res.status(500).json({
            status: 500,
            ok:false,
            msg,  
            body: {                
                data
            }
        });
    }
    static notFoundResponse(res: expressResponse, msg:string, data: any) {
        return res.status(404).json({
            ok: false,
            status: 404,
            msg,
            body: {
                data
            }
        });
    }
}