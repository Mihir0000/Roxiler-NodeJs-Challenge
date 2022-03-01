const express = require("express");
const app = express();
const fetch = require("node-fetch");
app.use(express.json());

// todos route
app.get("/todos", async (req, res) => {
    const url = `https://jsonplaceholder.typicode.com/todos`;
    const option = {
        method: "GET",
    };

    const response = await fetch(url, option)
        .then((res) => res.json())
        .catch((e) => {
            console.error({
                message: "error from todos",
                error: e,
            });
        });
    response.map((item) => {
        delete item.userId;
    });
    res.send(response);
});

// every single user route

app.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    const url1 = `https://jsonplaceholder.typicode.com/todos`;
    const option = {
        method: "GET",
    };

    const res1 = await fetch(url1, option)
        .then((res) => res.json())
        .catch((e) => {
            console.error({
                message: "error from single user -- res1",
                error: e,
            });
        });

    const url2 = `https://jsonplaceholder.typicode.com/users/${id}`;
    const res2 = await fetch(url2, option)
        .then((res) => res.json())
        .catch((e) => {
            console.error({
                message: "error from single user  -- res2",
                error: e,
            });
        });

    const tempTodos = [];
    res1.map((item) => {
        if (item.userId === res2.id) {
            tempTodos.push(item);
        }
    });

    let allTodos = {
        id: res2.id,
        name: res2.name,
        email: res2.email,
        phone: res2.phone,
        todos: tempTodos,
    };
    res.send(allTodos);
});

module.exports = app;
