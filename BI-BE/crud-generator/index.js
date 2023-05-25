const express = require("express");
const cors = require("cors");

const generateAuthToken = require("../utils/generate-auth-token");
const { modelName } = require("./create-route_");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
let models = {};

const createApp = (sequelize = null) => {
  if (!sequelize) throw Error("please pass sequelize in createApp function.");

  const app = express();
  app.use(express.json());
  app.use(cors(corsOptions));
  defaultMiddleware = (req, res, next) => {
    next();
  };
  const createRoute = (
    modelName,
    model,
    crudFuncs,
    middlewares = {
      onGetAll: defaultMiddleware,
      onGetSingle: defaultMiddleware,
      onPost: defaultMiddleware,
      onPut: defaultMiddleware,
      onPatch: defaultMiddleware,
      onDelete: defaultMiddleware,
    }
  ) => {
    // this.modelName = modelName
    // this.model = model;
    console.log(modelName);
    const { onGetAll, onGetSingle, onPost, onPut, onPatch, onDelete } =
      middlewares;

    const router = express.Router();
    const baseUrl = "/api/v1/" + modelName;

    let Models = null;
    if (!model) {
      Models = models[modelName];
    }

    const { GetAll, GetSingle, Post, Patch, Put, Delete } =
      require("../crud-generator/crudController")(
        modelName,
        model || Models,
        crudFuncs
      );
      
    router
      .route("/")
      .get(onGetAll || defaultMiddleware, GetAll)
      .post(onPost || defaultMiddleware, Post);
    router
      .route("/:id")
      .get(onGetSingle || defaultMiddleware, GetSingle)
      .patch(onPatch || defaultMiddleware, Patch)
      .put(onPut || defaultMiddleware, Put)
      .delete(onDelete || defaultMiddleware, Delete);


    app.use(baseUrl, router);

    return { baseUrl, model, modelName, router };
  };

  return { app, createRoute, generateAuthToken };
};
module.exports = { createApp };
