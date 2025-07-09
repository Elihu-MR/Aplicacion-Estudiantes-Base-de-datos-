using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class EstudiantesController : ControllerBase
{
    private readonly IMongoCollection<Estudiante> _coleccion;

    public EstudiantesController()
    {
        var context = new MongoDbContext();
        _coleccion = context.GetCollection<Estudiante>("estudiantes");
    }

    // GET: api/estudiantes
    [HttpGet]
    public ActionResult<List<Estudiante>> GetTodos()
    {
        return _coleccion.Find(_ => true).ToList();
    }

    
    [HttpGet("{nombre}")]
    public ActionResult<Estudiante> GetPorId(string nombre)
    {
        var estudiante = _coleccion.Find(x => x.Nombre == nombre).FirstOrDefault();
        return estudiante == null ? NotFound() : Ok(estudiante);
    }

    [HttpPost]
    public ActionResult Crear([FromForm] EstudiantePost dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nombre) || string.IsNullOrWhiteSpace(dto.Apellido))
            return BadRequest("Nombre y apellido son obligatorios.");

        var nuevo = new Estudiante
        {
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            Edad = dto.Edad,
            Carrera = dto.Carrera,
            Cuatrimestre = dto.Cuatrimestre
        };

        _coleccion.InsertOne(nuevo);

        return Ok(MessageResponse.GetReponse(0, "Estudiante registrado exitosamente.", MessageType.Success));
    }


    [HttpDelete("nombre/{nombre}")]
    public ActionResult EliminarPorNombre(string nombre)
    {
        var resultado = _coleccion.DeleteOne(x => x.Nombre == nombre);

        if (resultado.DeletedCount == 0)
            return NotFound($"No se encontró ningún estudiante con el nombre '{nombre}'.");

        return Ok(MessageResponse.GetReponse(0, $"Estudiante con nombre '{nombre}' eliminado exitosamente.", MessageType.Success));
    }


    [HttpPut("nombre/{nombre}")]
    public ActionResult ActualizarPorNombre(string nombre, [FromForm] EstudiantePost dto)
    {
        var filtro = Builders<Estudiante>.Filter.Eq(x => x.Nombre, nombre);

        var actualizacion = Builders<Estudiante>.Update
            .Set(x => x.Apellido, dto.Apellido)
            .Set(x => x.Edad, dto.Edad)
            .Set(x => x.Carrera, dto.Carrera)
            .Set(x => x.Cuatrimestre, dto.Cuatrimestre);

        var resultado = _coleccion.UpdateOne(filtro, actualizacion);

        if (resultado.MatchedCount == 0)
            return NotFound($"No se encontró ningún estudiante con el nombre '{nombre}'.");

        return Ok(MessageResponse.GetReponse(0, $"Estudiante con nombre '{nombre}' actualizado exitosamente.", MessageType.Success));
    }

}

