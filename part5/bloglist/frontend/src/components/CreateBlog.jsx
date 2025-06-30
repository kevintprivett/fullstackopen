const CreateBlog = ({ handleCreate }) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <label htmlFor="title">title:</label>
      <input type="text" id="title" name="title"/><br />
      <label htmlFor="author">author:</label>
      <input type="text" id="author" name="author"/><br />
      <label htmlFor="url">url:</label>
      <input type="text" id="url" name="url"/><br />
      <input type="submit" value="create"/>
    </form>
  </div>  
)

export default CreateBlog
