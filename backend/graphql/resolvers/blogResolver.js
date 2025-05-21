const { getDb } = require("../../config/db");
const { ObjectId } = require("mongodb");

const blogResolver = {
  Query: {
    getAllBlogs: async () => {
      try {
        const db = getDb();
        const blogs = await db.collection("blogs").find().toArray();
         if (!blogs) return [];
        return blogs.map(blog => ({
          id: blog._id.toString(),
          title: blog.title,
          content: blog.content,
          author: blog.author,
        }));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return [];
      }
    },
    getBlogById: async (_, { id }) => {
      try {
        const db = getDb();
        const objectId = ObjectId.createFromHexString(id);
        const blog = await db.collection("blogs").findOne({ _id: objectId });
        return {
          id: blog._id.toString(),
          title: blog.title,
          content: blog.content,
          author: blog.author,
        };
      } catch (error) {
        console.error("Failed to fetch blog by id:", error);
        return null;
      }
    },
  },

  Mutation: {
    createBlog: async (_, { title, content, author }) => {
      try {
        const db = getDb();
        const result = await db.collection("blogs").insertOne({ title, content, author });
        return {
          id: result.insertedId.toString(),
          title,
          content,
          author,
        };
      } catch (error) {
        console.error("Failed to create blog:", error);
        throw new Error("Could not create blog");
      }
    },

    updateBlog: async (_, { id, title, content, author }) => {
      try {
        const db = getDb();
        const objectId = ObjectId.createFromHexString(id);
        const result = await db.collection("blogs").findOneAndUpdate(
          { _id: objectId },
          { $set: { title, content, author } },
          { returnDocument: 'after' }
        );
        if (!result.value) throw new Error("Blog not found");
        return {
          id: result.value._id.toString(),
          title: result.value.title,
          content: result.value.content,
          author: result.value.author,
        };
      } catch (error) {
        console.error("Failed to update blog:", error);
        throw new Error("Could not update blog");
      }
    },

    deleteBlog: async (_, { id }) => {
      try {
        const db = getDb();        
        const objectId = ObjectId.createFromHexString(id);
        const result = await db.collection("blogs").deleteOne({ _id: objectId });
        return result.deletedCount === 1;
      } catch (error) {
        console.error("Failed to delete blog:", error);
        throw new Error("Could not delete blog");
      }
    }
  },
};

module.exports = blogResolver;
