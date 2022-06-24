using Microsoft.EntityFrameworkCore;
using todolist.api.Data;
using todolist.api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEntityFrameworkSqlite().AddDbContext<TodoContext>();

using var db = new TodoContext();

//db.RemoveRange(db.TodoList.AsEnumerable());

//db.AddRange(
//    new TodoList
//    {
//        CreatedTime = DateTime.Now,
//        Title = "Shopping List 1",
//        Guid = Guid.NewGuid().ToString(),
//        TodoItems = new List<TodoItem>()
//    },
//    new TodoList
//    {
//        CreatedTime = DateTime.Now,
//        Title = "Today's Todo 1",
//        Guid = Guid.NewGuid().ToString(),
//        TodoItems = new List<TodoItem>()
//    }
//);

//db.SaveChanges();


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));

app.UseAuthorization();

app.MapControllers();

app.Run();
