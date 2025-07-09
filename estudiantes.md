use escuela;

db.createCollection('estudiantes')

# Insert Many

db.estudiantes.insertMany([
{  
 nombre: 'Jese Santiago',
apellido: 'Perez Salazar',
edad: 19,
carrera: 'Desarrollo Multiplataforma en Software',
cuatrimestre: '5to'

    },
    {
        nombre: 'Josue Elihu',
        apellido: 'Moreno Ramirez',
        edad: 20,
        carrera: 'Desarrollo Multiplataforma en Software',
        cuatrimestre: '5to'

    },

    {
        nombre: 'Cesar Ernesto',
        apellido: 'Solis Hernandez',
        edad: 19,
        carrera: 'Entornos Virtuales',
        cuatrimestre: '3ro'
    },
    {
        nombre: 'Angel Geovanny',
        apellido: 'Gameros Garcia',
        edad: 23,
        carrera: 'Desarrollo Multiplataforma En Software',
        cuatrimestre: '5to'
    },
    {

        nombre: 'Kerry',
        apellido: 'Garcia Cota',
        edad: 22,
        carrera: 'Desarrollo Multiplataforma En Software',
        cuatrimestre: '8vo'
    }

])

# Insert ONE

db.estudiantes.insertOne({
nombre: 'Eric Sidrac',
apellido: 'Alvarez Aguilar',
edad: 25,
carrera: 'TI',
cuatrimestre: '12vo'
})

# Update ONE

db.estudiantes.updateOne(
{nombre: "Kerry"},
{$set: {nombre: "Kerry Steven", edad: 24}}

)

# Update Many

db.estudiantes.updateMany(
{carrera: "Desarrollo Multiplataforma En Software"},
{$set: {carrera: "TI"}}
)

# FindOne

db.estudiantes.findOne({

edad: 22

})

# deleteOne

db.estudiantes.deleteOne({
carrera:"Entornos Virtuales"
})

db.estudiantes.updateMany({}, {$set: {matricula: "" }})
