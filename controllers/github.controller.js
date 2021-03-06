const mongoose = require("mongoose");
const cheerio = require("cheerio");
const { Client } = require("node-rest-client");

// create instance client
const client = new Client({});

exports.getDataGitHub = (req, res) => {
  const technology = req.params.technology;
  const location = req.params.language;
  getHtmlPageGitHub(technology, location);
};

const getHtmlPageGitHub = (technology, location) => {
  const url = `https://github.com/search?p=0&q=language%3A${technology}+location%3A${location}&type=Users&utf8=%E2%9C%93`;

  const html = client.get(url, (data, response) => {
    const qtdUsers = GetQtdUserToTechnology(data.toString());
    const names = getName(data.toString());
    const emails = getEmail(data.toString());
    const subTitle = getSubTitle(data.toString());
  });
};

const GetQtdUserToTechnology = html => {
  const $ = cheerio.load(html);
  const qtdUsers = $(
    ".d-flex.flex-justify-between.border-bottom.pb-3 > h3"
  ).text();
  return qtdUsers;
};

const getName = html => {
  const names = [];
  const $ = cheerio.load(html);
  const name = $(
    ".user-list > div > .d-flex > .user-list-info.ml-2 > span"
  ).map((i, elem) => {
    names.push($(elem).text());
  });
  return names;
};

const getEmail = html => {
  const emails = [];
  const $ = cheerio.load(html);
  const email = $(".user-list > div > .d-flex > .user-list-info.ml-2  > p").map(
    (i, elem) => {
      console.log("aqui");
      console.log($(elem).text());
      emails.push($(elem).text());
    }
  );
  return emails;
};

const getCity = html => {
  const cities = [];
  const $ = cheerio.load(html);
  const city = $(
    ".user-list > div > .d-flex > .user-list-info.ml-2 > ul > li"
  ).map((i, elem) => {
    console.log($(elem).text());
    cities.push($(elem).text());
  });
  return cities;
};

const getSubTitle = html => {
  const titles = [];
  const $ = cheerio.load(html);
  const title = $(".user-list > div > .d-flex > .user-list-info.ml-2  > p").map(
    (i, elem) => {
      titles.push($(elem).text());
    }
  );
  return titles;
};
