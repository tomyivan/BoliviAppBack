import path from "path";
import fs from "fs";
import { ResponseApi } from "../../util";
import { Response, Request, NextFunction } from "express";
export class EventFileMiddleware {
    static dropFile (req: Request, res: Response, next: NextFunction) {
        const { eventFile } = req.body;
        const filePath = path.join(__dirname, `../../../uploads/events/${eventFile.name}`);
        console.log(filePath);
        if (!fs.existsSync(filePath)) return ResponseApi.errorResponse(res, 'No se econtraron imagenes', false);
            fs.rm(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return ResponseApi.errorResponse(res, 'No se pudo borrar', false);
                }
                
            })
        next();
    }
}