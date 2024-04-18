<template>
  <div class="container">
    <h1>DreamGuard</h1>
    <div class="create-post">
      <label for="create-post">Enter Bed Time:</label>
      <input
        type="text"
        id="create-post"
        v-model="text"
        placeholder="Bed Time"
      />
      <button @click="createPost">Enter</button>
    </div>
    <hr class="divider" />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div v-if="posts.length === 0" class="empty-message">No posts yet.</div>
      <div
        class="post"
        v-for="post in posts"
        :key="post._id"
        @dblclick="deletePost(post._id)"
      >
        <div class="post-header">
          <span class="date">{{ formatDate(post.createdAt) }}</span>
          <span class="delete-icon" @click.stop="deletePost(post._id)">
            &#x2715;
          </span>
        </div>
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      try {
        await PostService.insertPost(this.text);
        this.text = ""; // Clear input after posting
        this.posts = await PostService.getPosts();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deletePost(id) {
      try {
        await PostService.deletePost(id);
        this.posts = await PostService.getPosts();
      } catch (err) {
        this.error = err.message;
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 20px;
}

h1 {
  text-align: center;
  color: #333;
  font-weight: 600;
}

.create-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

#create-post {
  border: none;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  box-shadow: inset -2px -2px 5px #fff, inset 2px 2px 5px #babecc;
  outline: none;
  width: 100%;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #6a54c3;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4b30b6;
}

.divider {
  border: none;
  height: 1px;
  background: linear-gradient(to right, #f0f0f0, #ccc, #f0f0f0);
  margin: 20px 0;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  color: #5d1919;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.post {
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 2px 2px 5px #babecc, -2px -2px 5px #fff;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post:hover {
  transform: translateY(-5px);
  box-shadow: 5px 5px 15px #babecc, -5px -5px 15px #fff;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.delete-icon {
  font-size: 1.2em;
  color: #ff5b5f;
  cursor: pointer;
}

.text {
  font-size: 18px;
  color: #333;
  font-weight: 400;
  margin-bottom: 10px;
  white-space: pre-wrap;
}

.date {
  color: #666;
  font-size: 0.8em;
}

.empty-message {
  text-align: center;
  color: #666;
}
</style>
