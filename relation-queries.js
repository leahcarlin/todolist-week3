const { user, todoItem, todoList } = require("./models");

// // get todoLists with name of person who owns them
const listWithUsers = async () => {
  const lists = await todoList.findAll({
    include: [{ model: user, attributes: ["name"] }],
  });
  return lists.map((list) => list.toJSON());
};

listWithUsers().then((lists) => console.log(lists));

//get user with name of list they own
const getUsers = async () => {
  const allUsers = await user.findAll({
    include: { model: todoList, attributes: ["name"] },
  });
  return allUsers.map((user) => user.toJSON());
};

getUsers().then((users) => console.log(users));

//Get one user by id with his lists
const getOneUser = async (id) => {
  const oneUser = await user.findByPk(id, {
    include: { model: todoList, attributes: ["name"] },
  });
  return oneUser.toJSON();
};
getOneUser(2).then((user) => console.log(user));

// Get important TodoItems with the name of the list they belong to
const getImportant = async () => {
  try {
    const todos = await todoItem.findAll({
      where: { important: true },
      include: { model: todoList, attributes: ["name"] },
    });
    return todos.map((item) => item.toJSON());
  } catch (e) {
    return e;
  }
};
getImportant().then((items) => console.log(items));

// Get one user by id with his lists, which also contain their belonging TodoItem's task attribute
const getUserData = async (id) => {
  try {
    const data = await user.findByPk(id, {
      include: [
        {
          model: todoList,
          attributes: ["name"],
          include: { model: todoItem, attributes: ["name"] },
        },
      ],
    });
    return data.toJSON();
  } catch (e) {
    return e.message;
  }
};
getUserData(2).then((user) => console.log(user));
