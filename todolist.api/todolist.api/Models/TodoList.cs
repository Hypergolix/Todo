namespace todolist.api.Models
{
    public class TodoList
    {
        public int Id { get; set; }

        public string Guid { get; set; }

        public string Title { get; set; }

        public virtual ICollection<TodoItem> TodoItems { get; set; } = new List<TodoItem>();

        public DateTime CreatedTime { get; set; }
    }
}
