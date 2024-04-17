<template>
  <div class="container">
    <h1>DreamGuard</h1>
    <div class="create-post">
      <label for="create-post">Enter Bed Time:</label>
      <input
        type="text"
        id="create-post"
        v-model="text"
        placeholder="Bed Time:"
      />
      <button v-on:click="createPost">Post</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        {{
          `${
            post.createdAt.getMonth() + 1
          }/${post.createdAt.getDate()}/${post.createdAt.getFullYear()}`
        }}
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
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 20px;
  box-shadow: -8px -8px 20px #fff, 8px 8px 20px #babecc;
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
  background-color: #5bd658;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4ec247;
}

hr {
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

div.post {
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 2px 2px 5px #babecc, -2px -2px 5px #fff;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

div.post:hover {
  transform: translateY(-5px);
  box-shadow: 5px 5px 15px #babecc, -5px -5px 15px #fff;
}

p.text {
  font-size: 18px;
  color: #333;
  font-weight: 400;
  margin-bottom: 10px;
  white-space: pre-wrap; /* Preserves spaces and line breaks */
}

/* For the date, if you add it back */
span.date {
  display: block;
  text-align: right;
  color: #666;
  font-size: 0.8em;
  margin-top: -10px;
}
</style>
