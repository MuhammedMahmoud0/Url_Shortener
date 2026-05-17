import Url from "../models/URL.js";
import { nanoid } from "nanoid";
import CustomError from "../utils/customError.js";

const getUrls = async (req, res, next) => {
  const urls = await Url.find();
  res.status(200).json(urls);
};

const createAlias = async (req, res, next) => {
  let { input, alias } = req.body;

  const exitingUrl = await Url.findOne({ url: input });

  if (!input) {
    return next(new CustomError("input is required", 400));
  }

  if (!alias) {
    alias = nanoid(6);
  }

  const existingAlias = await Url.findOne({ alias });

  if (existingAlias) {
    return next(new CustomError("Alias already exists", 409));
  }

  if (exitingUrl) {
    return next(new CustomError("the url already exists", 409));
  }

  await Url.create({ url: input, alias: alias });
  res.status(201).json({ msg: "Alias Created Successfully", alias: alias });
};

const aliasRedirect = async (req, res, next) => {
  const { alias } = req.params;
  const url = await Url.findOne({ alias });
  if (!url) {
    return next(new CustomError("Url doesn't exist", 404));
  }
  res.redirect(url.url);
};

export { getUrls, createAlias, aliasRedirect };
