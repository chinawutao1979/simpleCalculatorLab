const express = require("express");
const app = express();
const session = require("express-session");
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "salt for cookie",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/public/images", express.static("public/images"));

app.get("/", (req, res) => {
  res.send(`<form method="POST">
            <h1>
                <img name="logo" src="/public/images/calc.jpg" alt="calc.jpg" />
                    Calculator
            </h1>
            <div>
                <span style="color:red; ">*</span><input name="value1" pattern="^[+-]?([0-9]*[.])?[0-9]*$" title="please input number" required />
                <span style="color:red; ">*</span><input name="value2" pattern="^[+-]?([0-9]*[.])?[0-9]*$" title="please input number" required />
                <select name="calculation">
                    <option value="Add" slected>Add</option>
                    <option value="Subtract">Subtract</option>
                    <option value="Multiply">Multiply</option>
                    <option value="Divide">Divide</option>
                </select>
            </div>
            <div>
                <br>
                <input type="submit" />
            </div>       
            </form>`);
});
app.get("/view", (req, res) => {
  let value1 = parseFloat(req.session.body.value1);
  let value2 = parseFloat(req.session.body.value2);
  let calculation = req.session.body.calculation;

  let cal = 0;
  if (calculation === "Add") {
    cal = value1 + value2;
  } else if (calculation === "Subtract") {
    cal = value1 - value2;
  } else if (calculation === "Multiply") {
    cal = value1 * value2;
  } else if (calculation === "Divide") {
    cal = value1 / value2;
  }
  let view = "The Answer is: " + cal;

  view += "<br><br><a href='/'>Another calculation</a>";

  res.send(view);
});
app.post("/", (req, res) => {
  req.session.body = req.body;
  res.redirect(303, "/view");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});
app.use(function (err, req, res, next) {
  res.status(500).send("please enter from <a href='/'> the main page</a>");
});
app.listen(process.env.PORT || 3000)
