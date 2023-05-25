require("express-async-errors");
require("dotenv").config();
const NotFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const { createApp } = require("./crud-generator");
const {VerifyToken} = require('./middlewares/auth');
const morgan = require('morgan');
//Models For Generating through sequalize
const user = require("./models/user");
const role = require("./models/role");

const sequelize = require("./utils/database");
const { StatusCodes } = require("http-status-codes");
const fileUpload = require("./middlewares/file-upload");
const getMsg = require("./utils/get-msg");
const PlReport = require("./models/reports/pl-report");
const { postPlReport, putPlReport , getPlReport} = require("./controllers/pl-report");
const User = require("./models/user");
const Role = require("./models/role");
const pagination = require("./middlewares/pagination");
const {app, createRoute } = createApp(sequelize);
const authRouter = require('./routers/authRouter');
const Permission = require("./models/permissions");

app.get('/',(__,res) => res.status(StatusCodes.ACCEPTED).json({success : true,msg : 'Crud Generator API'}))
// app.use(morgan('combined'))
app.post('/c',async (req,res) => {
  const permission = await Permission.create({user_id : 12})
  res.json({permission})
})
// router middleware
app.use('/auth',authRouter)

app.use(VerifyToken);
// use for authentication

app.get('/api/v1/roles-list' , async (req, res) => {
  const { page } = req.query;
  const {count, rows } = await pagination(Role,page)
  res.status(200).json({ count, rows });
});

const { baseUrl : roleBaseUrl } = createRoute("roles", role, {
  onDelete :async (req) =>
     await user
      .destroy({ where: { role: req.params.id } })
      .then((res) =>
        console.log("res --", res).catch((err) => ("err --", err.response))
      ),
});

app.get( roleBaseUrl + '-list' , async (req, res) => {
  const { page } = req.query;
  const {count, rows } = await pagination(Role,page);
  res.status(200).json({ count, rows });
});


const { baseUrl : userBaseUrl } = createRoute("users",user,() =>({
  onGetAll : async(req, res) => {
    const user = await User.findAll({ include : Role})
    res.send({data : user})
  }
}));

app.get( userBaseUrl + '-list' , async (req, res) => {
  const { page } = req.query;
  const {count, rows } = await pagination(User,page);
  res.status(200).json({ count, rows });
});

createRoute("reports/pl", PlReport , {
  onGetAll : (req) => console.log('get all'),
  onPost : postPlReport,
  onPut  : putPlReport,
  onGetSingle : getPlReport
  },
  {
    onPost : fileUpload('file','reports/pl',["xls", "xlsx"]),
    onPut : fileUpload('file','reports/pl',["xls", "xlsx"])
  });

  // User.hasOne(Permission,{foreignKey : 'user_id'});
  // Permission.hasOne(User,{foreignKey : "user_id"});
sequelize.sync({}).then(
  async () => {
    const SuperAdminRole = await Role.create({role_name : 'Super Admin'})
    const adminRole = await Role.create({role_name : 'Admin'})
  }
).then(
  async () => {
    const superAdminUser = await User.create({username : 'Arbaj Ansari', email : 'root@gmail.com',role_id : 1, password : 'root'})

  }
)



app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT,()=>console.log(`Server is running on PORT : ${process.env.PORT}`));


