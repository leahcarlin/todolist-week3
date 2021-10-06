const User = require("./models").user;
const TodoList = require("./models").todoList;
const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(express.json());

// Create a new user account
app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || email === " ") {
      res.status(400).send("Email address required");
    } else if (!password || password === " ") {
      res.status(400).send("Password required");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

//get user by id
app.get("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const getUserById = await User.findByPk(userId);
    if (!getUserById) {
      res.status(404).send("User not found");
    } else {
      res.json(getUserById);
    }
  } catch (e) {
    next(e);
  }
});

// //updating a user
app.put("/users/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    console.log(userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.send(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});
// terminal command: http PUT :4000/user/2 name=Karla

// Delete a user
app.delete("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userToDelete = await User.findByPk(userId);
    if (!userToDelete) {
      res.status(404).send("User not found");
    } else {
      await userToDelete.destroy();
      res.send(userToDelete);
    }
  } catch (e) {
    next(e);
  }
});

// get all todo lists for one user
app.get("/users/:id/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.todoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

// Delete a user's list
// app.get("/users/:id/lists/:listId", async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const listId = parseInt(req.pararms.listId);
//     const user = await User.findByPk(userId, {
//       include: [TodoList],
//     });
//   } catch (e) {
//     next(e);
//   }
// });

// Get all todo lists
app.get("/todoLists", async (req, res, next) => {
  try {
    const todoLists = await TodoList.findAll();
    res.send(todoLists);
  } catch (e) {
    next(e);
  }
});

//// Create a new todo list
app.post("/todoLists", async (req, res, next) => {
  try {
    const newList = await TodoList.create(req.body);
    res.json(newList);
  } catch (e) {
    next(e);
  }
});

// Update an existing list
app.put("/todoLists/:id", async (req, res, next) => {
  try {
    const listId = req.params.id;
    const listToUpdate = await TodoList.findByPk(listId);
    if (!listToUpdate) {
      res.status(404).send("List not found");
    } else {
      await listToUpdate.update(req.body);
      res.send(listToUpdate);
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, console.log(`listening on: ${PORT}`));
