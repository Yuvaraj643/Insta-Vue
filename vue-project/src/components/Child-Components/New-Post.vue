<template>
  <section>
    <div class="main-post" v-for="post in posts" :key="post.id">
      <span class="user-details" @click="$router.push({ path: `/profile/${post.postedBy._id}` })">

        <img v-bind:src="post.postedBy.pic" class="user-logo" alt="logo" />
        <p class="user-name">{{ post.postedBy.name }}</p>
      </span>
      <img  :src="post.photo" alt="logo" class="post-image" />
      <span class="int-section">
        <img
          v-if="post.likes.includes(id)"
          @:click="unlikePost(post._id)"
          src="../assets/like.svg"
          class="like-image"
          alt="like"
        />
        <img
          v-else
          src="../assets/!like.svg"
          @:click="likePost(post._id)"
          class="like-image"
          alt="unlike"
        />
        <img
          src="../assets/comment.svg"
          class="like-image"
          alt="comment"
        />
      </span>
      <span class="post-desc">
        <p>{{ post.likes.length }} Likes</p>
        <span class="comment-section">
          <input
            ref="comment"
            type="text"
            class="comment-input"
            v-model="text"
            placeholder="Add a comment..."
            @keyup.enter="commentPost(text, post._id)"
          />
        </span>
        <p>{{ post.comments.length }} Comments</p>

        <p
          v-for="comment in post.comments"
          :key="comment.id"
          class="comment-section1"
        >
          <span>
            <strong>{{ comment.postedBy.name }}: </strong>
            <span> {{ comment.text }}</span>
          </span>
          <!-- <img
            src="../assets/delete.svg"
            @:click="DeletePost(comment._id,post._id)"
            class="delete"
            alt="comment"
          /> -->
        </p>
      </span>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      id: localStorage.getItem("id"),
    };
  },
  methods: {
    likePost(id) {
      fetch("https://instagram-83t5.onrender.com/like", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          postId: id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.$toast.success("Post liked successfully");
          window.location.reload();
        });
    },
    unlikePost(id) {
      fetch("https://instagram-83t5.onrender.com/unlike", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          postId: id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.$toast.success("Post unliked successfully");
          window.location.reload();
        });
    },
    commentPost(text, id) {
      fetch("https://instagram-83t5.onrender.com/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          postId: id,
          text: text,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.$toast.success("Comment added successfully");
          this.text = "";
          window.location.reload();
        });
    },
    DeletePost(id, postId) {
      fetch(`https://instagram-83t5.onrender.com/delete-comment/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          postId: postId,
          commentId: id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.$toast.success("Comment deleted successfully");
          window.location.reload();
        });
    },
  },
  components: {
    Function,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.comment-section {
  display: flex;
  align-items: center;
  /* gap: 10px; */
}

.comment-section1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment-input {
  width: 85%;
  height: 30px;
  border-radius: 15px;
  border: 2px solid rgb(121, 120, 202);
  padding: 5px 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.like-image {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.delete {
  width: 30px;
  cursor: pointer;
}
section {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.main-post {
  width: 500px;
  margin: 15px auto;
  border-radius: 15px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.post-image {
  width: 100%;
  height: 500px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.user-name {
  font-size: 18px;
  font-weight: 550;
}
.user-details {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 15px;
  padding: 5px 5px;
  cursor: pointer;
}

.user-logo {
  width: 60px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  background-position: center;
  background-image: cove;
}

.int-section {
  padding: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-desc p {
  padding-left: 8px;
  font-size: 16px;
  margin: 5px 0px;
}

/* Responsive Styles */

@media (max-width: 550px) { 
  .main-post {
    width: 95%;
    padding: 10px;
  }

  .post-image {
    height: 300px;
  }

}

</style>
