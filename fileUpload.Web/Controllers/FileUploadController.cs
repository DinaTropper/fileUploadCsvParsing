using fileUpload.Data;
using fileUpload.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Faker;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.Text;

namespace fileUpload.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly string _connectionString;

        public FileUploadController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("upload")]
        public void Upload(UploadViewModel vm)
        {
            var base64Index = vm.Base64Data[(vm.Base64Data.IndexOf(',') + 1)..];
            byte[] bytes = Convert.FromBase64String(base64Index);
            List<Person> people = GetFromCsvBytes(bytes);

            var repo = new fileUploadRepo(_connectionString);
            repo.AddPeople(people);
        }

        [HttpGet("generate")]
        public IActionResult Generate(int amount)
        {
            var people = Enumerable.Range(1, amount).Select(_ => new Person
            {
                FirstName = Name.First(),
                LastName = Name.Last(),
                Age = RandomNumber.Next(20, 60),
                Adress = Address.StreetAddress(),
                Email = Internet.Email()
            }).ToList();

            var writer = GenerateCSV(people);
            return File(Encoding.UTF8.GetBytes(writer), "text/csv", "peopleFile.csv");
        }


        private static string GenerateCSV(List<Person> people)
        {
            var writer = new StringWriter();
            var csvWriter = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture));
            csvWriter.WriteRecords(people);
            return writer.ToString();
        }

        private List<Person> GetFromCsvBytes(byte[] bytes)
        {
            using var memoryStream = new MemoryStream(bytes);
            using var reader = new StreamReader(memoryStream);
            using var csvReader = new CsvReader(reader, CultureInfo.InvariantCulture);
            return csvReader.GetRecords<Person>().ToList();
        }

        [HttpGet("getpeople")]
        public List<Person> GetPeople()
        {
            fileUploadRepo repo = new(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost("deleteall")]
        public void DeleteAll()
        {
            fileUploadRepo repo = new(_connectionString);
            repo.DeleteAll();
        }
    }
}
