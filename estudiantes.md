use escuela;

db.createCollection('estudiantes')

# Insert Many

db.estudiantes.insertMany([
{
    matricula: "",
    nombre: 'Jese Santiago',
    apellido: 'Perez Salazar',
    edad: 19,
    carrera: 'Desarrollo Multiplataforma en Software',
    cuatrimestre: '5to'
    },
    {
        matricula: "",
        nombre: 'Josue Elihu',
        apellido: 'Moreno Ramirez',
        edad: 20,
        carrera: 'Desarrollo Multiplataforma en Software',
        cuatrimestre: '5to'

    },

    {
        matricula: "",
        nombre: 'Cesar Ernesto',
        apellido: 'Solis Hernandez',
        edad: 19,
        carrera: 'Entornos Virtuales',
        cuatrimestre: '3ro'
    },
    {
        matricula: "",
        nombre: 'Angel Geovanny',
        apellido: 'Gameros Garcia',
        edad: 23,
        carrera: 'Desarrollo Multiplataforma En Software',
        cuatrimestre: '5to'
    },
    {
        matricula: "",
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
{$set: {matricula: "1"}}
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
