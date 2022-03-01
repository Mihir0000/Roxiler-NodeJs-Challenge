const app = require("./app");
app.get("/", (req, res, next) => {
    res.end("Hello from the other side");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
