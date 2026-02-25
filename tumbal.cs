using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCleanApi.Models;

public class Article
{

    [Column(Order = 0)] 
    public int Id { get; init; }

    [Column(Order = 1)]
    [MaxLength(200)]
    public required string Title { get; set; }

    [Column(Order = 2)]
    public required string Content { get; set; }

    [Column(Order = 3)]
    [MaxLength(255)]
    public required string ImagePath { get; set; }

    [Column(Order = 4)]
    public int UserId { get; init; }
    [ForeignKey(nameof(UserId))]
    public virtual User? User { get; set; }

    [Column(Order = 5)]
    public DateTime CreatedAt { get;init; } = DateTime.UtcNow;

    [Column(Order = 6)]
    public DateTime? UpdatedAt { get; set; }

}

string query = @"
SELECT 
    a.Id,
    a.Title,
    a.Content,
    a.ImagePath,
    a.UserId,
    a.CreatedAt,
    a.UpdatedAt
FROM Articles AS a
INNER JOIN Users AS u
    ON u.Id = a.UserId
WHERE LOWER(a.Title) LIKE LOWER(CONCAT('%', @keyword, '%'))
  AND a.CreatedAt IS NOT NULL
  AND u.Id IN (
        SELECT Id FROM Users WHERE IsActive = 1
    )
ORDER BY a.CreatedAt DESC, a.Id ASC;
";

using (var connection = new SqlConnection(connectionString))
using (var command = new SqlCommand(query, connection))
{
    command.Parameters.AddWithValue("@keyword", "batik");

    connection.Open();
    using (var reader = command.ExecuteReader())
    {
        while (reader.Read())
        {
            // process rows di sini
        }
    }
}



var result = _context.Articles
    .Where(a => a.Title.ToLower().Contains(keyword.ToLower())
             && a.CreatedAt != null
             && a.User.IsActive)
    .OrderByDescending(a => a.CreatedAt)
    .ThenBy(a => a.Id)
    .ToList();



public static void Register(HttpConfiguration config)
{
    config.Routes.MapHttpRoute(
        name: "DefaultApi",//ganti dengan nama File
        routeTemplate: "api/{controller}/{id}",
        defaults: new { id = RouteParameter.Optional }
    );
    config.Formatters.Remove(config.Formatters.XmlFormatter);
    config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/json"));
}