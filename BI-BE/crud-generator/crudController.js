const { createCustomAPIError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const getMsg = require("../utils/get-msg");
const crudController = (
  modelName,
  Model,
  // sequelize,
  {
    onDelete = () => {},
    onGetAll = () => {},
    onGetSingle = () => {},
    onPost = () => {},
    onPut = () => {},
    onPatch = () => {},
    ...customRequests
  }
) => {
// utils-start
// const getMsg = (c) => {
//   const name = `${modelName[0].toLocaleUpperCase() + modelName.slice(1).slice(0,-1)}`
//   switch(c) {
//     case 'post' : return `${name} Added`
//     case 'get' : return `${name} List Fetched`
//     case 'get-single' : return `${name} fetched`
//     case 'put' : return `${name} Updated`
//     case 'delete' : return `${name} Deleted`
//     case '404' : return `${name} Not Found`
//   }
// }
// utils-end
const msg = getMsg(modelName);

  const GetAll = async (req, res,) => {
    await onGetAll(req,res);
    const all = await Model.findAll();
    res.status(StatusCodes.OK).json({ data: all, success: true, msg : msg('get') });
  };

  const GetSingle = async (req, res, sendJSON = true) => {
    await onGetSingle(req,res);
    const model = await Model.findOne({ where: { id: req.params.id } });
    if (!model) {
      throw createCustomAPIError(StatusCodes.NOT_FOUND, msg('404'));
    }
    if (sendJSON)
      res.status(StatusCodes.OK).json({ data: model, success: true , msg : msg('get-single')});
    return model;
  };

  const Post = async (req, res) => {
    await onPost(req,res); 
    const model = await Model.create(req.body);
    res.status(StatusCodes.CREATED).json({ data: model, success: true ,msg : msg('post')});
  };
  const Put = async (req, res) => {
    await onPut(req,res);
    const existModel =await GetSingle(req,res,false);
    const model = await Model.update(req.body, {
      where: { id: req.params.id },
    });
    if (!existModel) throw Error(msg('404'));
    res.status(StatusCodes.ACCEPTED).json({ data: req.body, success: true ,msg : msg('put')});
  };

  const Patch = async (req, res) => {
    await onPatch(req,res);
    const existModel = await GetSingle(req,res,false);
    const model = await Model.update(req.body, {
      where: { id: req.params.id },
    });
    if (!existModel) throw Error(msg('404'));
    res.status(StatusCodes.ACCEPTED).json({ data: req.body, success: true ,msg : msg('put')});
  };

 

  const Delete = async (req, res) => {
    await onDelete(req,res);
    const existModel =await GetSingle(req,res,false);
    const model = await Model.destroy({ where: { id: req.params.id } });
    if (!existModel) throw Error(msg('404'));
    res.status(StatusCodes.ACCEPTED).json({ data: existModel, success: true,msg : msg('delete') });
  };

  return {
    GetAll,
    GetSingle,
    Post,
    Patch,
    Put,
    Delete,
    getMsg,
    ...customRequests,
  };
};

module.exports = crudController;

