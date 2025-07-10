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

    
    [HttpGet("{matricula}")]
    public ActionResult<Estudiante> GetPorId(string matricula)
    {
        var estudiante = _coleccion.Find(x => x.Matricula == matricula).FirstOrDefault();
        return estudiante == null ? NotFound($"No se encontró ningún estudiante con la matricula: '{matricula}'.") : Ok(estudiante);
    }

    [HttpPost]
    public ActionResult Crear([FromForm] EstudiantePost dto)
    {
        
        var nuevo = new Estudiante
        {
            Matricula = dto.Matricula,
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            Edad = dto.Edad,
            Carrera = dto.Carrera,
            Cuatrimestre = dto.Cuatrimestre
        };

        _coleccion.InsertOne(nuevo);

        return Ok(MessageResponse.GetReponse(0, "Estudiante registrado exitosamente.", MessageType.Success));
    }


    [HttpDelete("{matricula}")]
    public ActionResult EliminarPorNombre(string matricula)
    {
        var resultado = _coleccion.DeleteOne(x => x.Matricula == matricula);

        if (resultado.DeletedCount == 0)
            return Ok(MessageResponse.GetReponse(0, $"No se encontró ningún estudiante con la matricula: '{matricula}'.", MessageType.Warning));

        return Ok(MessageResponse.GetReponse(0, $"Estudiante con la matricula: '{matricula}' eliminado exitosamente.", MessageType.Success));
    }


    [HttpPut("{matricula}")]
    public ActionResult ActualizarPorNombre(string matricula, [FromForm] EstudiantePost dto)
    {
        var filtro = Builders<Estudiante>.Filter.Eq(x => x.Matricula, matricula);

        var actualizacion = Builders<Estudiante>.Update
            .Set(x => x.Nombre, dto.Nombre)
            .Set(x => x.Apellido, dto.Apellido)
            .Set(x => x.Edad, dto.Edad)
            .Set(x => x.Carrera, dto.Carrera)
            .Set(x => x.Cuatrimestre, dto.Cuatrimestre);

        var resultado = _coleccion.UpdateOne(filtro, actualizacion);

        if (resultado.MatchedCount == 0)
            return Ok(MessageResponse.GetReponse(0, $"No se encontró ningún estudiante con la matricula: '{matricula}'.", MessageType.Warning));

        return Ok(MessageResponse.GetReponse(0, $"Estudiante con la matricula: '{matricula}' actualizado exitosamente.", MessageType.Success));
    }

}

