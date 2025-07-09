using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Estudiante
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)] // Permite usar string en lugar de ObjectId
    public string Id { get; set; }

    [BsonElement("nombre")]
    public string Nombre { get; set; }

    [BsonElement("matricula")]
    public string Matricula { get; set; }

    [BsonElement("apellido")]
    public string Apellido { get; set; }

    [BsonElement("edad")]
    public int Edad { get; set; }

    [BsonElement("carrera")]
    public string Carrera { get; set; }

    [BsonElement("cuatrimestre")]
    public string Cuatrimestre { get; set; }
}
