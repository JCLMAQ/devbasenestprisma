
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 2.16.1
 * Query Engine version: 8b74ad57aaf2cc6c155f382a18a8e3ba95aceb03
 */
Prisma.prismaVersion = {
  client: "2.16.1",
  engine: "8b74ad57aaf2cc6c155f382a18a8e3ba95aceb03"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */

Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  numSeq: 'numSeq',
  email: 'email',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastName: 'lastName',
  firstName: 'firstName',
  title: 'title',
  Roles: 'Roles',
  nickName: 'nickName',
  Gender: 'Gender',
  pwdHash: 'pwdHash',
  salt: 'salt',
  social: 'social',
  language: 'language',
  dob: 'dob',
  address: 'address',
  isValidated: 'isValidated',
  isSuspended: 'isSuspended',
  isDeleted: 'isDeleted',
  isAdmin: 'isAdmin',
  managerId: 'managerId'
});

exports.Prisma.TokenScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  type: 'type',
  emailToken: 'emailToken',
  valid: 'valid',
  expiration: 'expiration',
  userId: 'userId'
});

exports.Prisma.ProfileScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  orderProfile: 'orderProfile',
  bio: 'bio',
  isDeleted: 'isDeleted'
});

exports.Prisma.GroupScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  orderGroup: 'orderGroup',
  name: 'name',
  isDeleted: 'isDeleted'
});

exports.Prisma.TodoScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  orderTodo: 'orderTodo',
  title: 'title',
  content: 'content',
  state: 'state',
  published: 'published',
  public: 'public',
  mainTodoId: 'mainTodoId',
  isDeleted: 'isDeleted'
});

exports.Prisma.UserTodoLinkScalarFieldEnum = makeEnum({
  userId: 'userId',
  todoId: 'todoId',
  isAuthor: 'isAuthor',
  isAssigned: 'isAssigned',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.FileScalarFieldEnum = makeEnum({
  id: 'id',
  numSeq: 'numSeq',
  name: 'name',
  storageName: 'storageName',
  type: 'type',
  data: 'data',
  owner: 'owner',
  size: 'size',
  isDeleted: 'isDeleted',
  isArchived: 'isArchived'
});

exports.Prisma.ChangesTrackingScalarFieldEnum = makeEnum({
  id: 'id',
  doneAt: 'doneAt',
  authorId: 'authorId',
  modelName: 'modelName',
  recordId: 'recordId',
  operation: 'operation',
  newData: 'newData',
  oldData: 'oldData'
});

exports.Prisma.PostScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  orderPost: 'orderPost',
  published: 'published',
  title: 'title',
  content: 'content',
  authorId: 'authorId',
  isDeleted: 'isDeleted'
});

exports.Prisma.CategoryScalarFieldEnum = makeEnum({
  id: 'id',
  orderCategory: 'orderCategory',
  name: 'name',
  isDeleted: 'isDeleted'
});

exports.Prisma.CommentScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  orderComment: 'orderComment',
  published: 'published',
  content: 'content',
  postId: 'postId',
  authorId: 'authorId'
});

exports.Prisma.ConfigParamScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  name: 'name',
  value: 'value',
  utility: 'utility'
});

exports.Prisma.EmaildomainScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  domain: 'domain',
  allowed: 'allowed'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.Gender = makeEnum({
  MALE: 'MALE',
  FEMELE: 'FEMELE',
  UNKNOWN: 'UNKNOWN'
});

exports.Role = makeEnum({
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN'
});

exports.TokenType = makeEnum({
  EMAIL: 'EMAIL',
  API: 'API',
  FORGOT: 'FORGOT'
});

exports.TodoState = makeEnum({
  CREATION: 'CREATION',
  STANDBY: 'STANDBY',
  RUNNING: 'RUNNING',
  DONE: 'DONE'
});

exports.Prisma.ModelName = makeEnum({
  User: 'User',
  Token: 'Token',
  Profile: 'Profile',
  Group: 'Group',
  Todo: 'Todo',
  UserTodoLink: 'UserTodoLink',
  File: 'File',
  ChangesTracking: 'ChangesTracking',
  Post: 'Post',
  Category: 'Category',
  Comment: 'Comment',
  ConfigParam: 'ConfigParam',
  Emaildomain: 'Emaildomain'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma-client-js/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
