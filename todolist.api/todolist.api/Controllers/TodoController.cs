using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todolist.api.Models;
using todolist.api.Data;

namespace todolist.api.Controllers
{
    [Route("api")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _contex;

        public TodoController(TodoContext context)
        {
            _contex = context;

            foreach (var todoList in _contex.TodoList)
            {
                Console.WriteLine(todoList.Guid);
            }
        }

        [HttpPost("TodoLists")]
        public async Task<IActionResult> PostTodoList(TodoList todoList)
        {
            // Make input model?
            todoList.Guid = Guid.NewGuid().ToString();
            todoList.CreatedTime = DateTime.Now;

            await _contex.TodoList.AddAsync(todoList);
            await _contex.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("TodoLists")]
        public async Task<IActionResult> DeleteTodoList(string id)
        {
            var foundList = await _contex.TodoList.Include(x => x.TodoItems).FirstOrDefaultAsync(x => x.Guid == id);
            if (foundList == null) return BadRequest();

            Console.WriteLine(foundList.Title + "  " + foundList.Id.ToString());

            _contex.TodoList.Remove(foundList);
            await _contex.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("TodoLists")]
        public async Task<List<TodoList>> GetTodoLists()
        {
            return await _contex.TodoList.ToListAsync();
        }

        [HttpGet("TodoList")]
        public async Task<IActionResult> GetTodoList(string id)
        {
            var foundList = await _contex.TodoList.Where(x => x.Guid == id).FirstOrDefaultAsync();
            if (foundList == null) return BadRequest();
            return Ok(foundList);
        }

        [HttpGet("TodoList/Complete")]
        public async Task<IActionResult> GetFullTodoList(string id)
        {
            var foundList = await _contex.TodoList.Include(x => x.TodoItems).FirstOrDefaultAsync(x => x.Guid == id);
            if (foundList == null) return BadRequest();
            return Ok(foundList);
        }

        [HttpPut("TodoList")]
        public async Task<IActionResult> PutTodoItem(string id, TodoItem todoItem)
        {
            // Move - repeat function?
            var foundList = await _contex.TodoList
                .Include(x => x.TodoItems)
                .FirstOrDefaultAsync(x => x.Guid == id);
            if (foundList == null) return BadRequest();

            TodoItem newTodoItem = new()
            {
                Title = todoItem.Title
            };

            foundList.TodoItems!.Add(newTodoItem);
            //await _contex.AddAsync(foundList);
            await _contex.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("TodoList/Update")]
        public async Task<IActionResult> PutItemDone(string listId, int itemId)
        {
            var foundList = await _contex.TodoList
                .Include(x => x.TodoItems)
                .FirstOrDefaultAsync(x => x.Guid == listId);
            if (foundList == null) return BadRequest();

            var foundItem = foundList.TodoItems.Where(x => x.Id == itemId).FirstOrDefault();
            if (foundItem == null) return BadRequest();

            foundItem.IsCompleted = true;
            await _contex.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("TodoList/Delete")]
        public async Task<IActionResult> DeleteListItem(string listId, int itemId)
        {
            var foundList = await _contex.TodoList
                .Include(x => x.TodoItems)
                .FirstOrDefaultAsync(x => x.Guid == listId);
            if (foundList == null) return BadRequest();

            var foundItem = foundList.TodoItems.Where(x => x.Id == itemId).FirstOrDefault();
            if (foundItem == null) return BadRequest();

            foundList.TodoItems.Remove(foundItem);
            await _contex.SaveChangesAsync();

            return Ok();
        }

    }
}
