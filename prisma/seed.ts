import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();  
async function main(){
    await prisma.$transaction(async (pr) => {
        await pr.tipo_categorias.createMany({
            data: [
                { tipo_categoria: "Eventos" },
                { tipo_categoria: "Historias" },                
            ]
        });
        await pr.categorias.createMany({
            data: [
                { nombre: "Academicos", id_tipo_categoria: 1 },
                { nombre: "Culturales", id_tipo_categoria: 1 },
                { nombre: "Deportivos", id_tipo_categoria: 1 },
                { nombre: "Gastronomicos", id_tipo_categoria: 1 },
            ]
        });
        await pr.medidas.createMany({
            data: [
                { medida: "Metro" },
                { medida: "Unidades" },
                { medida: "Servicios" }
            ]
        });
        await pr.patrocinadores.createMany({
            data: [
                { patrocinador: "Patrocinador 1" },
                { patrocinador: "Patrocinador 2" },
                { patrocinador: "Patrocinador 3" },
                { patrocinador: "Patrocinador 4" },
            ]
        });
        await pr.recursos.createMany({
            data: [
                { nombre: "Recurso 1", cantidad: 50, cantidad_act: 50 },
                { nombre: "Recurso 2", cantidad: 50, cantidad_act: 50 }, 
                { nombre: "Recurso 3", cantidad: 50, cantidad_act: 50 }, 
                { nombre: "Recurso 4", cantidad: 50, cantidad_act: 50 }, 
            ]
        });
        await pr.departamentos.createMany({
            data: [
                { cod_departamento: "LP", departamento: "La Paz", lat: -16.5000, lng: -68.15 },
                { cod_departamento: "CB", departamento: "Cochabamba", lat: -17.3667, lng: -66.1667 },
                { cod_departamento: "PT", departamento: "Potosi", lat: -19.5833, lng: -65.7500 },
                { cod_departamento: "SC", departamento: "Santa Cruz", lat: -17.7833, lng: -63.1833 },
                { cod_departamento: "BN", departamento: "Beni", lat: -14.8333, lng: -64.9167 },
                { cod_departamento: "PD", departamento: "Pando", lat: -11.0000, lng: -68.7500 },
                { cod_departamento: "TJ", departamento: "Tarija", lat: -21.5333, lng: -64.7333 },
                { cod_departamento: "CH", departamento: "Chuquisaca", lat: -19.0333, lng: -65.2500 },
                { cod_departamento: "OR", departamento: "Oruro", lat: -17.9667, lng: -67.1333 },
            ]
        });
    })
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
// This script seeds the database with initial data for categories, measures, sponsors, resources, and departments.