using Microsoft.EntityFrameworkCore;
using todolist.api.Models;

namespace todolist.api.Data
{
    public class TodoContext : DbContext
    {
        public string DbPath { get; }

        public TodoContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "todoNew.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}").UseLazyLoadingProxies();

        public DbSet<TodoList> TodoList { get; set; }

        public DbSet<TodoItem> TodoItem { get; set; }
    }
}
