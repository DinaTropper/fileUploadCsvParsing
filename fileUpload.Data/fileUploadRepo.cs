using CsvHelper;
using CsvHelper.Configuration;
using Faker;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace fileUpload.Data
{
    public class fileUploadRepo
    {
        private readonly string _connectionString;

        public fileUploadRepo(string connectionString)
        {
            _connectionString = connectionString;

        }
        public void AddPeople(List<Person> ppl)
        {
            PeopleDataContext context = new(_connectionString);
            context.People.AddRange(ppl);
            context.SaveChanges();
        }
        public void DeleteAll()
        {
            PeopleDataContext context = new(_connectionString);
            context.Database.ExecuteSqlRaw("TRUNCATE TABLE People");
            context.SaveChanges();
        }
        public List<Person> GetPeople()
        {
            PeopleDataContext context = new(_connectionString);
            return context.People.ToList();
        }



    }
}
