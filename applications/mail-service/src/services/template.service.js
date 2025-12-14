"use strict";

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const mjml = require("mjml");

const partialsDir = path.join(__dirname, "../templates/partials");

fs.readdirSync(partialsDir).forEach((file) => {
  const name = file.replace(".mjml.hbs", "");
  const content = fs.readFileSync(path.join(partialsDir, file), "utf8");
  Handlebars.registerPartial(name, content);
});

exports.render = ({ template, data }) => {
  const filePath = path.join(
    __dirname,
    `../templates/emails/${template}.mjml.hbs`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error("Template not found");
  }

  const source = fs.readFileSync(filePath, "utf8");
  const compile = Handlebars.compile(source);

  const mjmlMarkup = compile({
    ...data,
    year: new Date().getFullYear(),
  });

  const { html, errors } = mjml(mjmlMarkup);
  if (errors.length) throw new Error("MJML error");

  return html;
};
