
/**
 * Client
**/

import * as runtime from './runtime';


/**
 * Model User
 */

export type User = {
  id: string
  numSeq: number
  email: string
  createdAt: Date
  updatedAt: Date
  lastName: string | null
  firstName: string | null
  title: string | null
  Roles: Role[]
  nickName: string | null
  Gender: Gender | null
  pwdHash: string | null
  salt: string | null
  social: Prisma.JsonValue | null
  language: string | null
  dob: Date | null
  address: Prisma.JsonValue | null
  isValidated: Date | null
  isSuspended: Date | null
  isDeleted: Date | null
  isAdmin: boolean | null
  managerId: string | null
}

/**
 * Model Token
 */

export type Token = {
  id: number
  createdAt: Date
  updatedAt: Date
  type: TokenType
  emailToken: string | null
  valid: boolean
  expiration: Date
  userId: string
}

/**
 * Model Profile
 */

export type Profile = {
  id: string
  createdAt: Date
  updatedAt: Date
  orderProfile: number
  bio: string
  isDeleted: Date | null
}

/**
 * Model Group
 */

export type Group = {
  id: string
  createdAt: Date
  updatedAt: Date
  orderGroup: number
  name: string
  isDeleted: Date | null
}

/**
 * Model Todo
 */

export type Todo = {
  id: string
  createdAt: Date
  updatedAt: Date
  orderTodo: number
  title: string
  content: string | null
  state: TodoState
  published: boolean
  public: boolean
  mainTodoId: string | null
  isDeleted: Date | null
}

/**
 * Model UserTodoLink
 */

export type UserTodoLink = {
  userId: string
  todoId: string
  isAuthor: boolean
  isAssigned: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Model File
 */

export type File = {
  id: string
  numSeq: number
  name: string
  storageName: string
  type: string | null
  data: string | null
  owner: string | null
  size: number | null
  isDeleted: Date | null
  isArchived: Date | null
}

/**
 * Model ChangesTracking
 */

export type ChangesTracking = {
  id: number
  doneAt: Date
  authorId: string
  modelName: string
  recordId: string
  operation: string
  newData: Prisma.JsonValue
  oldData: Prisma.JsonValue
}

/**
 * Model Post
 */

export type Post = {
  id: string
  createdAt: Date
  updatedAt: Date
  orderPost: number | null
  published: boolean
  title: string
  content: string | null
  authorId: string
  isDeleted: Date | null
}

/**
 * Model Category
 */

export type Category = {
  id: string
  orderCategory: number
  name: string
  isDeleted: Date | null
}

/**
 * Model Comment
 */

export type Comment = {
  id: string
  createdAt: Date
  updatedAt: Date
  isDeleted: Date | null
  orderComment: number
  published: boolean
  content: string | null
  postId: string
  authorId: string
}

/**
 * Model ConfigParam
 */

export type ConfigParam = {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  value: string
  utility: string
}

/**
 * Model Emaildomain
 */

export type Emaildomain = {
  id: number
  createdAt: Date
  updatedAt: Date
  domain: string
  allowed: boolean
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Gender: {
  MALE: 'MALE',
  FEMELE: 'FEMELE',
  UNKNOWN: 'UNKNOWN'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const Role: {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TokenType: {
  EMAIL: 'EMAIL',
  API: 'API',
  FORGOT: 'FORGOT'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]


export const TodoState: {
  CREATION: 'CREATION',
  STANDBY: 'STANDBY',
  RUNNING: 'RUNNING',
  DONE: 'DONE'
};

export type TodoState = (typeof TodoState)[keyof typeof TodoState]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<GlobalReject>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<GlobalReject>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<GlobalReject>;

  /**
   * `prisma.todo`: Exposes CRUD operations for the **Todo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Todos
    * const todos = await prisma.todo.findMany()
    * ```
    */
  get todo(): Prisma.TodoDelegate<GlobalReject>;

  /**
   * `prisma.userTodoLink`: Exposes CRUD operations for the **UserTodoLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserTodoLinks
    * const userTodoLinks = await prisma.userTodoLink.findMany()
    * ```
    */
  get userTodoLink(): Prisma.UserTodoLinkDelegate<GlobalReject>;

  /**
   * `prisma.file`: Exposes CRUD operations for the **File** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Files
    * const files = await prisma.file.findMany()
    * ```
    */
  get file(): Prisma.FileDelegate<GlobalReject>;

  /**
   * `prisma.changesTracking`: Exposes CRUD operations for the **ChangesTracking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChangesTrackings
    * const changesTrackings = await prisma.changesTracking.findMany()
    * ```
    */
  get changesTracking(): Prisma.ChangesTrackingDelegate<GlobalReject>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<GlobalReject>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<GlobalReject>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<GlobalReject>;

  /**
   * `prisma.configParam`: Exposes CRUD operations for the **ConfigParam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConfigParams
    * const configParams = await prisma.configParam.findMany()
    * ```
    */
  get configParam(): Prisma.ConfigParamDelegate<GlobalReject>;

  /**
   * `prisma.emaildomain`: Exposes CRUD operations for the **Emaildomain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Emaildomains
    * const emaildomains = await prisma.emaildomain.findMany()
    * ```
    */
  get emaildomain(): Prisma.EmaildomainDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 2.16.1
   * Query Engine version: 8b74ad57aaf2cc6c155f382a18a8e3ba95aceb03
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  export type Union = any

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  /**
   * Allows creating `select` or `include` outside of the main statement
   * From https://github.com/prisma/prisma/issues/3372#issuecomment-762296484
   */

  type Cast<A1, A2> = A1 extends A2 ? A1 : A2;

  /**
   * `Exact` forces a type to comply by another type. It will need to be a subset
   * and must have exactly the same properties, no more, no less.
   */
  type Exact<A, W> = A & Cast<{
    [K in keyof A]: K extends keyof W ? A[K] : never
  }, W>;

  type Narrow<A, W = unknown> =
      A & {[K in keyof A]: NarrowAt<A, W, K>};

  type NarrowAt<A, W, K extends keyof A, AK = A[K], WK = Att<W, K>> =
      WK extends Widen<infer T> ? T :
      AK extends Narrowable ? AK & WK :
      Narrow<AK, WK>;

  type Att<O, K> = K extends keyof O ? O[K] : unknown;

  type Widen<A> = {[type]: A};

  type Narrowable =
  | string
  | number
  | bigint
  | boolean
  | [];

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<Narrow<S, V>, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
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
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }


  /**
   * Model User
   */


  export type AggregateUser = {
    count: UserCountAggregateOutputType | null
    avg: UserAvgAggregateOutputType | null
    sum: UserSumAggregateOutputType | null
    min: UserMinAggregateOutputType | null
    max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    numSeq: number
  }

  export type UserSumAggregateOutputType = {
    numSeq: number
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    numSeq: number
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastName: string | null
    firstName: string | null
    title: string | null
    nickName: string | null
    Gender: Gender | null
    pwdHash: string | null
    salt: string | null
    language: string | null
    dob: Date | null
    isValidated: Date | null
    isSuspended: Date | null
    isDeleted: Date | null
    isAdmin: boolean | null
    managerId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    numSeq: number
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastName: string | null
    firstName: string | null
    title: string | null
    nickName: string | null
    Gender: Gender | null
    pwdHash: string | null
    salt: string | null
    language: string | null
    dob: Date | null
    isValidated: Date | null
    isSuspended: Date | null
    isDeleted: Date | null
    isAdmin: boolean | null
    managerId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number | null
    numSeq: number
    email: number | null
    createdAt: number | null
    updatedAt: number | null
    lastName: number | null
    firstName: number | null
    title: number | null
    Roles: number | null
    nickName: number | null
    Gender: number | null
    pwdHash: number | null
    salt: number | null
    social: number | null
    language: number | null
    dob: number | null
    address: number | null
    isValidated: number | null
    isSuspended: number | null
    isDeleted: number | null
    isAdmin: number | null
    managerId: number | null
    _all: number
  }


  export type UserAvgAggregateInputType = {
    numSeq?: true
  }

  export type UserSumAggregateInputType = {
    numSeq?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    numSeq?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    lastName?: true
    firstName?: true
    title?: true
    nickName?: true
    Gender?: true
    pwdHash?: true
    salt?: true
    language?: true
    dob?: true
    isValidated?: true
    isSuspended?: true
    isDeleted?: true
    isAdmin?: true
    managerId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    numSeq?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    lastName?: true
    firstName?: true
    title?: true
    nickName?: true
    Gender?: true
    pwdHash?: true
    salt?: true
    language?: true
    dob?: true
    isValidated?: true
    isSuspended?: true
    isDeleted?: true
    isAdmin?: true
    managerId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    numSeq?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    lastName?: true
    firstName?: true
    title?: true
    Roles?: true
    nickName?: true
    Gender?: true
    pwdHash?: true
    salt?: true
    social?: true
    language?: true
    dob?: true
    address?: true
    isValidated?: true
    isSuspended?: true
    isDeleted?: true
    isAdmin?: true
    managerId?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
    **/
    where?: UserWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }



  export type UserSelect = {
    id?: boolean
    numSeq?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastName?: boolean
    firstName?: boolean
    title?: boolean
    Roles?: boolean
    nickName?: boolean
    Gender?: boolean
    pwdHash?: boolean
    salt?: boolean
    social?: boolean
    language?: boolean
    dob?: boolean
    address?: boolean
    isValidated?: boolean
    isSuspended?: boolean
    isDeleted?: boolean
    isAdmin?: boolean
    manager?: boolean | UserArgs
    managerId?: boolean
    Team?: boolean | UserFindManyArgs
    Profile?: boolean | ProfileFindManyArgs
    Group?: boolean | GroupFindManyArgs
    Post?: boolean | PostFindManyArgs
    Comment?: boolean | CommentFindManyArgs
    Todo?: boolean | TodoFindManyArgs
    UserTodoLink?: boolean | UserTodoLinkFindManyArgs
    ChangesLog?: boolean | ChangesTrackingFindManyArgs
    Token?: boolean | TokenFindManyArgs
  }

  export type UserInclude = {
    manager?: boolean | UserArgs
    Team?: boolean | UserFindManyArgs
    Profile?: boolean | ProfileFindManyArgs
    Group?: boolean | GroupFindManyArgs
    Post?: boolean | PostFindManyArgs
    Comment?: boolean | CommentFindManyArgs
    Todo?: boolean | TodoFindManyArgs
    UserTodoLink?: boolean | UserTodoLinkFindManyArgs
    ChangesLog?: boolean | ChangesTrackingFindManyArgs
    Token?: boolean | TokenFindManyArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'manager'
        ? UserGetPayload<S['include'][P]> | null :
        P extends 'Team'
        ? Array < UserGetPayload<S['include'][P]>>  :
        P extends 'Profile'
        ? Array < ProfileGetPayload<S['include'][P]>>  :
        P extends 'Group'
        ? Array < GroupGetPayload<S['include'][P]>>  :
        P extends 'Post'
        ? Array < PostGetPayload<S['include'][P]>>  :
        P extends 'Comment'
        ? Array < CommentGetPayload<S['include'][P]>>  :
        P extends 'Todo'
        ? Array < TodoGetPayload<S['include'][P]>>  :
        P extends 'UserTodoLink'
        ? Array < UserTodoLinkGetPayload<S['include'][P]>>  :
        P extends 'ChangesLog'
        ? Array < ChangesTrackingGetPayload<S['include'][P]>>  :
        P extends 'Token'
        ? Array < TokenGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof User ?User [P]
  : 
          P extends 'manager'
        ? UserGetPayload<S['select'][P]> | null :
        P extends 'Team'
        ? Array < UserGetPayload<S['select'][P]>>  :
        P extends 'Profile'
        ? Array < ProfileGetPayload<S['select'][P]>>  :
        P extends 'Group'
        ? Array < GroupGetPayload<S['select'][P]>>  :
        P extends 'Post'
        ? Array < PostGetPayload<S['select'][P]>>  :
        P extends 'Comment'
        ? Array < CommentGetPayload<S['select'][P]>>  :
        P extends 'Todo'
        ? Array < TodoGetPayload<S['select'][P]>>  :
        P extends 'UserTodoLink'
        ? Array < UserTodoLinkGetPayload<S['select'][P]>>  :
        P extends 'ChangesLog'
        ? Array < ChangesTrackingGetPayload<S['select'][P]>>  :
        P extends 'Token'
        ? Array < TokenGetPayload<S['select'][P]>>  : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Users.
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Promise<GetUserAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    manager<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    Team<T extends UserFindManyArgs = {}>(args?: Subset<T, UserFindManyArgs>): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>;

    Profile<T extends ProfileFindManyArgs = {}>(args?: Subset<T, ProfileFindManyArgs>): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>;

    Group<T extends GroupFindManyArgs = {}>(args?: Subset<T, GroupFindManyArgs>): CheckSelect<T, Promise<Array<Group>>, Promise<Array<GroupGetPayload<T>>>>;

    Post<T extends PostFindManyArgs = {}>(args?: Subset<T, PostFindManyArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

    Comment<T extends CommentFindManyArgs = {}>(args?: Subset<T, CommentFindManyArgs>): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>;

    Todo<T extends TodoFindManyArgs = {}>(args?: Subset<T, TodoFindManyArgs>): CheckSelect<T, Promise<Array<Todo>>, Promise<Array<TodoGetPayload<T>>>>;

    UserTodoLink<T extends UserTodoLinkFindManyArgs = {}>(args?: Subset<T, UserTodoLinkFindManyArgs>): CheckSelect<T, Promise<Array<UserTodoLink>>, Promise<Array<UserTodoLinkGetPayload<T>>>>;

    ChangesLog<T extends ChangesTrackingFindManyArgs = {}>(args?: Subset<T, ChangesTrackingFindManyArgs>): CheckSelect<T, Promise<Array<ChangesTracking>>, Promise<Array<ChangesTrackingGetPayload<T>>>>;

    Token<T extends TokenFindManyArgs = {}>(args?: Subset<T, TokenFindManyArgs>): CheckSelect<T, Promise<Array<Token>>, Promise<Array<TokenGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
    **/
    where?: UserWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Users.
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
    **/
    where?: UserWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
    **/
    data: XOR<UserUncheckedCreateInput, UserCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
    **/
    data: XOR<UserUncheckedUpdateInput, UserUpdateInput>
    /**
     * Choose, which User to update.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    data: XOR<UserUncheckedUpdateManyInput, UserUpdateManyMutationInput>
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
    **/
    create: XOR<UserUncheckedCreateInput, UserCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<UserUncheckedUpdateInput, UserUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
  }



  /**
   * Model Token
   */


  export type AggregateToken = {
    count: TokenCountAggregateOutputType | null
    avg: TokenAvgAggregateOutputType | null
    sum: TokenSumAggregateOutputType | null
    min: TokenMinAggregateOutputType | null
    max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    id: number
  }

  export type TokenSumAggregateOutputType = {
    id: number
  }

  export type TokenMinAggregateOutputType = {
    id: number
    createdAt: Date | null
    updatedAt: Date | null
    type: TokenType | null
    emailToken: string | null
    valid: boolean | null
    expiration: Date | null
    userId: string | null
  }

  export type TokenMaxAggregateOutputType = {
    id: number
    createdAt: Date | null
    updatedAt: Date | null
    type: TokenType | null
    emailToken: string | null
    valid: boolean | null
    expiration: Date | null
    userId: string | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    createdAt: number | null
    updatedAt: number | null
    type: number | null
    emailToken: number | null
    valid: number | null
    expiration: number | null
    userId: number | null
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    id?: true
  }

  export type TokenSumAggregateInputType = {
    id?: true
  }

  export type TokenMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    type?: true
    emailToken?: true
    valid?: true
    expiration?: true
    userId?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    type?: true
    emailToken?: true
    valid?: true
    expiration?: true
    userId?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    type?: true
    emailToken?: true
    valid?: true
    expiration?: true
    userId?: true
    _all?: true
  }

  export type TokenAggregateArgs = {
    /**
     * Filter which Token to aggregate.
    **/
    where?: TokenWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Tokens to fetch.
    **/
    orderBy?: Enumerable<TokenOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
    [P in keyof T & keyof AggregateToken]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }



  export type TokenSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    type?: boolean
    emailToken?: boolean
    valid?: boolean
    expiration?: boolean
    user?: boolean | UserArgs
    userId?: boolean
  }

  export type TokenInclude = {
    user?: boolean | UserArgs
  }

  export type TokenGetPayload<
    S extends boolean | null | undefined | TokenArgs,
    U = keyof S
      > = S extends true
        ? Token
    : S extends undefined
    ? never
    : S extends TokenArgs | TokenFindManyArgs
    ?'include' extends U
    ? Token  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Token ?Token [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> : never
  } 
    : Token
  : Token


  type TokenCountArgs = Merge<
    Omit<TokenFindManyArgs, 'select' | 'include'> & {
      select?: TokenCountAggregateInputType | true
    }
  >

  export interface TokenDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Token'> extends True ? CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>> : CheckSelect<T, Prisma__TokenClient<Token | null >, Prisma__TokenClient<TokenGetPayload<T> | null >>

    /**
     * Find the first Token that matches the filter.
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Token'> extends True ? CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>> : CheckSelect<T, Prisma__TokenClient<Token | null >, Prisma__TokenClient<TokenGetPayload<T> | null >>

    /**
     * Find zero or more Tokens that matches the filter.
     * @param {TokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TokenFindManyArgs>(
      args?: SelectSubset<T, TokenFindManyArgs>
    ): CheckSelect<T, Promise<Array<Token>>, Promise<Array<TokenGetPayload<T>>>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
    **/
    create<T extends TokenCreateArgs>(
      args: SelectSubset<T, TokenCreateArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Create many Tokens.
     *     @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     *     @example
     *     // Create many Tokens
     *     const token = await prisma.token.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TokenCreateManyArgs>(
      args?: SelectSubset<T, TokenCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
    **/
    delete<T extends TokenDeleteArgs>(
      args: SelectSubset<T, TokenDeleteArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TokenUpdateArgs>(
      args: SelectSubset<T, TokenUpdateArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TokenDeleteManyArgs>(
      args?: SelectSubset<T, TokenDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TokenUpdateManyArgs>(
      args: SelectSubset<T, TokenUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
    **/
    upsert<T extends TokenUpsertArgs>(
      args: SelectSubset<T, TokenUpsertArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Count the number of Tokens.
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Promise<GetTokenAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TokenClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Token
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TokenInclude | null
    /**
     * Throw an Error if a Token can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Token to fetch.
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Token
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TokenInclude | null
    /**
     * Throw an Error if a Token can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Token to fetch.
    **/
    where?: TokenWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Tokens to fetch.
    **/
    orderBy?: Enumerable<TokenOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Tokens.
    **/
    distinct?: Enumerable<TokenScalarFieldEnum>
  }


  /**
   * Token findMany
   */
  export type TokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the Token
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Tokens to fetch.
    **/
    where?: TokenWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Tokens to fetch.
    **/
    orderBy?: Enumerable<TokenOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
    **/
    skip?: number
    distinct?: Enumerable<TokenScalarFieldEnum>
  }


  /**
   * Token create
   */
  export type TokenCreateArgs = {
    /**
     * Select specific fields to fetch from the Token
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TokenInclude | null
    /**
     * The data needed to create a Token.
    **/
    data: XOR<TokenUncheckedCreateInput, TokenCreateInput>
  }


  /**
   * Token createMany
   */
  export type TokenCreateManyArgs = {
    data: Enumerable<TokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Token update
   */
  export type TokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the Token
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TokenInclude | null
    /**
     * The data needed to update a Token.
    **/
    data: XOR<TokenUncheckedUpdateInput, TokenUpdateInput>
    /**
     * Choose, which Token to update.
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs = {
    data: XOR<TokenUncheckedUpdateManyInput, TokenUpdateManyMutationInput>
    where?: TokenWhereInput
  }


  /**
   * Token upsert
   */
  export type TokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the Token
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TokenInclude | null
    /**
     * The filter to search for the Token to update in case it exists.
    **/
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
    **/
    create: XOR<TokenUncheckedCreateInput, TokenCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<TokenUncheckedUpdateInput, TokenUpdateInput>
  }


  /**
   * Token delete
   */
  export type TokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the Token
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TokenInclude | null
    /**
     * Filter which Token to delete.
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs = {
    where?: TokenWhereInput
  }


  /**
   * Token without action
   */
  export type TokenArgs = {
    /**
     * Select specific fields to fetch from the Token
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TokenInclude | null
  }



  /**
   * Model Profile
   */


  export type AggregateProfile = {
    count: ProfileCountAggregateOutputType | null
    avg: ProfileAvgAggregateOutputType | null
    sum: ProfileSumAggregateOutputType | null
    min: ProfileMinAggregateOutputType | null
    max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    orderProfile: number
  }

  export type ProfileSumAggregateOutputType = {
    orderProfile: number
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    orderProfile: number
    bio: string | null
    isDeleted: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    orderProfile: number
    bio: string | null
    isDeleted: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number | null
    createdAt: number | null
    updatedAt: number | null
    orderProfile: number
    bio: number | null
    isDeleted: number | null
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    orderProfile?: true
  }

  export type ProfileSumAggregateInputType = {
    orderProfile?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderProfile?: true
    bio?: true
    isDeleted?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderProfile?: true
    bio?: true
    isDeleted?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderProfile?: true
    bio?: true
    isDeleted?: true
    _all?: true
  }

  export type ProfileAggregateArgs = {
    /**
     * Filter which Profile to aggregate.
    **/
    where?: ProfileWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Profiles to fetch.
    **/
    orderBy?: Enumerable<ProfileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateProfile]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }



  export type ProfileSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orderProfile?: boolean
    User?: boolean | UserFindManyArgs
    bio?: boolean
    isDeleted?: boolean
  }

  export type ProfileInclude = {
    User?: boolean | UserFindManyArgs
  }

  export type ProfileGetPayload<
    S extends boolean | null | undefined | ProfileArgs,
    U = keyof S
      > = S extends true
        ? Profile
    : S extends undefined
    ? never
    : S extends ProfileArgs | ProfileFindManyArgs
    ?'include' extends U
    ? Profile  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'User'
        ? Array < UserGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Profile ?Profile [P]
  : 
          P extends 'User'
        ? Array < UserGetPayload<S['select'][P]>>  : never
  } 
    : Profile
  : Profile


  type ProfileCountArgs = Merge<
    Omit<ProfileFindManyArgs, 'select' | 'include'> & {
      select?: ProfileCountAggregateInputType | true
    }
  >

  export interface ProfileDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProfileFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProfileFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Profile'> extends True ? CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>> : CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>

    /**
     * Find the first Profile that matches the filter.
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProfileFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProfileFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Profile'> extends True ? CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>> : CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>

    /**
     * Find zero or more Profiles that matches the filter.
     * @param {ProfileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProfileFindManyArgs>(
      args?: SelectSubset<T, ProfileFindManyArgs>
    ): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
    **/
    create<T extends ProfileCreateArgs>(
      args: SelectSubset<T, ProfileCreateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Create many Profiles.
     *     @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     *     @example
     *     // Create many Profiles
     *     const profile = await prisma.profile.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProfileCreateManyArgs>(
      args?: SelectSubset<T, ProfileCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
    **/
    delete<T extends ProfileDeleteArgs>(
      args: SelectSubset<T, ProfileDeleteArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProfileUpdateArgs>(
      args: SelectSubset<T, ProfileUpdateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProfileDeleteManyArgs>(
      args?: SelectSubset<T, ProfileDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProfileUpdateManyArgs>(
      args: SelectSubset<T, ProfileUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
    **/
    upsert<T extends ProfileUpsertArgs>(
      args: SelectSubset<T, ProfileUpsertArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Count the number of Profiles.
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Promise<GetProfileAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProfileClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends UserFindManyArgs = {}>(args?: Subset<T, UserFindManyArgs>): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * Throw an Error if a Profile can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Profile to fetch.
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * Throw an Error if a Profile can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Profile to fetch.
    **/
    where?: ProfileWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Profiles to fetch.
    **/
    orderBy?: Enumerable<ProfileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Profiles.
    **/
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profiles to fetch.
    **/
    where?: ProfileWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Profiles to fetch.
    **/
    orderBy?: Enumerable<ProfileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
    **/
    skip?: number
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile create
   */
  export type ProfileCreateArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to create a Profile.
    **/
    data: XOR<ProfileUncheckedCreateInput, ProfileCreateInput>
  }


  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs = {
    data: Enumerable<ProfileCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Profile update
   */
  export type ProfileUpdateArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to update a Profile.
    **/
    data: XOR<ProfileUncheckedUpdateInput, ProfileUpdateInput>
    /**
     * Choose, which Profile to update.
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs = {
    data: XOR<ProfileUncheckedUpdateManyInput, ProfileUpdateManyMutationInput>
    where?: ProfileWhereInput
  }


  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * The filter to search for the Profile to update in case it exists.
    **/
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
    **/
    create: XOR<ProfileUncheckedCreateInput, ProfileCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<ProfileUncheckedUpdateInput, ProfileUpdateInput>
  }


  /**
   * Profile delete
   */
  export type ProfileDeleteArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * Filter which Profile to delete.
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs = {
    where?: ProfileWhereInput
  }


  /**
   * Profile without action
   */
  export type ProfileArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
  }



  /**
   * Model Group
   */


  export type AggregateGroup = {
    count: GroupCountAggregateOutputType | null
    avg: GroupAvgAggregateOutputType | null
    sum: GroupSumAggregateOutputType | null
    min: GroupMinAggregateOutputType | null
    max: GroupMaxAggregateOutputType | null
  }

  export type GroupAvgAggregateOutputType = {
    orderGroup: number
  }

  export type GroupSumAggregateOutputType = {
    orderGroup: number
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    orderGroup: number
    name: string | null
    isDeleted: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    orderGroup: number
    name: string | null
    isDeleted: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number | null
    createdAt: number | null
    updatedAt: number | null
    orderGroup: number
    name: number | null
    isDeleted: number | null
    _all: number
  }


  export type GroupAvgAggregateInputType = {
    orderGroup?: true
  }

  export type GroupSumAggregateInputType = {
    orderGroup?: true
  }

  export type GroupMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderGroup?: true
    name?: true
    isDeleted?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderGroup?: true
    name?: true
    isDeleted?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderGroup?: true
    name?: true
    isDeleted?: true
    _all?: true
  }

  export type GroupAggregateArgs = {
    /**
     * Filter which Group to aggregate.
    **/
    where?: GroupWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Groups to fetch.
    **/
    orderBy?: Enumerable<GroupOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: GroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: GroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
    [P in keyof T & keyof AggregateGroup]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }



  export type GroupSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orderGroup?: boolean
    name?: boolean
    User?: boolean | UserFindManyArgs
    Todo?: boolean | TodoFindManyArgs
    isDeleted?: boolean
  }

  export type GroupInclude = {
    User?: boolean | UserFindManyArgs
    Todo?: boolean | TodoFindManyArgs
  }

  export type GroupGetPayload<
    S extends boolean | null | undefined | GroupArgs,
    U = keyof S
      > = S extends true
        ? Group
    : S extends undefined
    ? never
    : S extends GroupArgs | GroupFindManyArgs
    ?'include' extends U
    ? Group  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'User'
        ? Array < UserGetPayload<S['include'][P]>>  :
        P extends 'Todo'
        ? Array < TodoGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Group ?Group [P]
  : 
          P extends 'User'
        ? Array < UserGetPayload<S['select'][P]>>  :
        P extends 'Todo'
        ? Array < TodoGetPayload<S['select'][P]>>  : never
  } 
    : Group
  : Group


  type GroupCountArgs = Merge<
    Omit<GroupFindManyArgs, 'select' | 'include'> & {
      select?: GroupCountAggregateInputType | true
    }
  >

  export interface GroupDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GroupFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, GroupFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Group'> extends True ? CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>> : CheckSelect<T, Prisma__GroupClient<Group | null >, Prisma__GroupClient<GroupGetPayload<T> | null >>

    /**
     * Find the first Group that matches the filter.
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GroupFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, GroupFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Group'> extends True ? CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>> : CheckSelect<T, Prisma__GroupClient<Group | null >, Prisma__GroupClient<GroupGetPayload<T> | null >>

    /**
     * Find zero or more Groups that matches the filter.
     * @param {GroupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GroupFindManyArgs>(
      args?: SelectSubset<T, GroupFindManyArgs>
    ): CheckSelect<T, Promise<Array<Group>>, Promise<Array<GroupGetPayload<T>>>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
    **/
    create<T extends GroupCreateArgs>(
      args: SelectSubset<T, GroupCreateArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Create many Groups.
     *     @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     *     @example
     *     // Create many Groups
     *     const group = await prisma.group.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends GroupCreateManyArgs>(
      args?: SelectSubset<T, GroupCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
    **/
    delete<T extends GroupDeleteArgs>(
      args: SelectSubset<T, GroupDeleteArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GroupUpdateArgs>(
      args: SelectSubset<T, GroupUpdateArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GroupDeleteManyArgs>(
      args?: SelectSubset<T, GroupDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Groups.
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GroupUpdateManyArgs>(
      args: SelectSubset<T, GroupUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
    **/
    upsert<T extends GroupUpsertArgs>(
      args: SelectSubset<T, GroupUpsertArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Count the number of Groups.
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Promise<GetGroupAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__GroupClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends UserFindManyArgs = {}>(args?: Subset<T, UserFindManyArgs>): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>;

    Todo<T extends TodoFindManyArgs = {}>(args?: Subset<T, TodoFindManyArgs>): CheckSelect<T, Promise<Array<Todo>>, Promise<Array<TodoGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Group
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: GroupInclude | null
    /**
     * Throw an Error if a Group can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Group to fetch.
    **/
    where: GroupWhereUniqueInput
  }


  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Group
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: GroupInclude | null
    /**
     * Throw an Error if a Group can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Group to fetch.
    **/
    where?: GroupWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Groups to fetch.
    **/
    orderBy?: Enumerable<GroupOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
    **/
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Groups.
    **/
    distinct?: Enumerable<GroupScalarFieldEnum>
  }


  /**
   * Group findMany
   */
  export type GroupFindManyArgs = {
    /**
     * Select specific fields to fetch from the Group
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: GroupInclude | null
    /**
     * Filter, which Groups to fetch.
    **/
    where?: GroupWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Groups to fetch.
    **/
    orderBy?: Enumerable<GroupOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
    **/
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
    **/
    skip?: number
    distinct?: Enumerable<GroupScalarFieldEnum>
  }


  /**
   * Group create
   */
  export type GroupCreateArgs = {
    /**
     * Select specific fields to fetch from the Group
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: GroupInclude | null
    /**
     * The data needed to create a Group.
    **/
    data: XOR<GroupUncheckedCreateInput, GroupCreateInput>
  }


  /**
   * Group createMany
   */
  export type GroupCreateManyArgs = {
    data: Enumerable<GroupCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Group update
   */
  export type GroupUpdateArgs = {
    /**
     * Select specific fields to fetch from the Group
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: GroupInclude | null
    /**
     * The data needed to update a Group.
    **/
    data: XOR<GroupUncheckedUpdateInput, GroupUpdateInput>
    /**
     * Choose, which Group to update.
    **/
    where: GroupWhereUniqueInput
  }


  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs = {
    data: XOR<GroupUncheckedUpdateManyInput, GroupUpdateManyMutationInput>
    where?: GroupWhereInput
  }


  /**
   * Group upsert
   */
  export type GroupUpsertArgs = {
    /**
     * Select specific fields to fetch from the Group
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: GroupInclude | null
    /**
     * The filter to search for the Group to update in case it exists.
    **/
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
    **/
    create: XOR<GroupUncheckedCreateInput, GroupCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<GroupUncheckedUpdateInput, GroupUpdateInput>
  }


  /**
   * Group delete
   */
  export type GroupDeleteArgs = {
    /**
     * Select specific fields to fetch from the Group
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: GroupInclude | null
    /**
     * Filter which Group to delete.
    **/
    where: GroupWhereUniqueInput
  }


  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs = {
    where?: GroupWhereInput
  }


  /**
   * Group without action
   */
  export type GroupArgs = {
    /**
     * Select specific fields to fetch from the Group
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: GroupInclude | null
  }



  /**
   * Model Todo
   */


  export type AggregateTodo = {
    count: TodoCountAggregateOutputType | null
    avg: TodoAvgAggregateOutputType | null
    sum: TodoSumAggregateOutputType | null
    min: TodoMinAggregateOutputType | null
    max: TodoMaxAggregateOutputType | null
  }

  export type TodoAvgAggregateOutputType = {
    orderTodo: number
  }

  export type TodoSumAggregateOutputType = {
    orderTodo: number
  }

  export type TodoMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    orderTodo: number
    title: string | null
    content: string | null
    state: TodoState | null
    published: boolean | null
    public: boolean | null
    mainTodoId: string | null
    isDeleted: Date | null
  }

  export type TodoMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    orderTodo: number
    title: string | null
    content: string | null
    state: TodoState | null
    published: boolean | null
    public: boolean | null
    mainTodoId: string | null
    isDeleted: Date | null
  }

  export type TodoCountAggregateOutputType = {
    id: number | null
    createdAt: number | null
    updatedAt: number | null
    orderTodo: number
    title: number | null
    content: number | null
    state: number | null
    published: number | null
    public: number | null
    mainTodoId: number | null
    isDeleted: number | null
    _all: number
  }


  export type TodoAvgAggregateInputType = {
    orderTodo?: true
  }

  export type TodoSumAggregateInputType = {
    orderTodo?: true
  }

  export type TodoMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderTodo?: true
    title?: true
    content?: true
    state?: true
    published?: true
    public?: true
    mainTodoId?: true
    isDeleted?: true
  }

  export type TodoMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderTodo?: true
    title?: true
    content?: true
    state?: true
    published?: true
    public?: true
    mainTodoId?: true
    isDeleted?: true
  }

  export type TodoCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderTodo?: true
    title?: true
    content?: true
    state?: true
    published?: true
    public?: true
    mainTodoId?: true
    isDeleted?: true
    _all?: true
  }

  export type TodoAggregateArgs = {
    /**
     * Filter which Todo to aggregate.
    **/
    where?: TodoWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Todos to fetch.
    **/
    orderBy?: Enumerable<TodoOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Todos
    **/
    count?: true | TodoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: TodoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: TodoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: TodoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: TodoMaxAggregateInputType
  }

  export type GetTodoAggregateType<T extends TodoAggregateArgs> = {
    [P in keyof T & keyof AggregateTodo]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTodo[P]>
      : GetScalarType<T[P], AggregateTodo[P]>
  }



  export type TodoSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orderTodo?: boolean
    title?: boolean
    content?: boolean
    state?: boolean
    published?: boolean
    public?: boolean
    mainTodo?: boolean | TodoArgs
    mainTodoId?: boolean
    SubTodo?: boolean | TodoFindManyArgs
    User?: boolean | UserFindManyArgs
    Group?: boolean | GroupFindManyArgs
    UserTodoLink?: boolean | UserTodoLinkFindManyArgs
    isDeleted?: boolean
  }

  export type TodoInclude = {
    mainTodo?: boolean | TodoArgs
    SubTodo?: boolean | TodoFindManyArgs
    User?: boolean | UserFindManyArgs
    Group?: boolean | GroupFindManyArgs
    UserTodoLink?: boolean | UserTodoLinkFindManyArgs
  }

  export type TodoGetPayload<
    S extends boolean | null | undefined | TodoArgs,
    U = keyof S
      > = S extends true
        ? Todo
    : S extends undefined
    ? never
    : S extends TodoArgs | TodoFindManyArgs
    ?'include' extends U
    ? Todo  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'mainTodo'
        ? TodoGetPayload<S['include'][P]> | null :
        P extends 'SubTodo'
        ? Array < TodoGetPayload<S['include'][P]>>  :
        P extends 'User'
        ? Array < UserGetPayload<S['include'][P]>>  :
        P extends 'Group'
        ? Array < GroupGetPayload<S['include'][P]>>  :
        P extends 'UserTodoLink'
        ? Array < UserTodoLinkGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Todo ?Todo [P]
  : 
          P extends 'mainTodo'
        ? TodoGetPayload<S['select'][P]> | null :
        P extends 'SubTodo'
        ? Array < TodoGetPayload<S['select'][P]>>  :
        P extends 'User'
        ? Array < UserGetPayload<S['select'][P]>>  :
        P extends 'Group'
        ? Array < GroupGetPayload<S['select'][P]>>  :
        P extends 'UserTodoLink'
        ? Array < UserTodoLinkGetPayload<S['select'][P]>>  : never
  } 
    : Todo
  : Todo


  type TodoCountArgs = Merge<
    Omit<TodoFindManyArgs, 'select' | 'include'> & {
      select?: TodoCountAggregateInputType | true
    }
  >

  export interface TodoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Todo that matches the filter.
     * @param {TodoFindUniqueArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TodoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TodoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Todo'> extends True ? CheckSelect<T, Prisma__TodoClient<Todo>, Prisma__TodoClient<TodoGetPayload<T>>> : CheckSelect<T, Prisma__TodoClient<Todo | null >, Prisma__TodoClient<TodoGetPayload<T> | null >>

    /**
     * Find the first Todo that matches the filter.
     * @param {TodoFindFirstArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TodoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TodoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Todo'> extends True ? CheckSelect<T, Prisma__TodoClient<Todo>, Prisma__TodoClient<TodoGetPayload<T>>> : CheckSelect<T, Prisma__TodoClient<Todo | null >, Prisma__TodoClient<TodoGetPayload<T> | null >>

    /**
     * Find zero or more Todos that matches the filter.
     * @param {TodoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Todos
     * const todos = await prisma.todo.findMany()
     * 
     * // Get first 10 Todos
     * const todos = await prisma.todo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const todoWithIdOnly = await prisma.todo.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TodoFindManyArgs>(
      args?: SelectSubset<T, TodoFindManyArgs>
    ): CheckSelect<T, Promise<Array<Todo>>, Promise<Array<TodoGetPayload<T>>>>

    /**
     * Create a Todo.
     * @param {TodoCreateArgs} args - Arguments to create a Todo.
     * @example
     * // Create one Todo
     * const Todo = await prisma.todo.create({
     *   data: {
     *     // ... data to create a Todo
     *   }
     * })
     * 
    **/
    create<T extends TodoCreateArgs>(
      args: SelectSubset<T, TodoCreateArgs>
    ): CheckSelect<T, Prisma__TodoClient<Todo>, Prisma__TodoClient<TodoGetPayload<T>>>

    /**
     * Create many Todos.
     *     @param {TodoCreateManyArgs} args - Arguments to create many Todos.
     *     @example
     *     // Create many Todos
     *     const todo = await prisma.todo.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TodoCreateManyArgs>(
      args?: SelectSubset<T, TodoCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a Todo.
     * @param {TodoDeleteArgs} args - Arguments to delete one Todo.
     * @example
     * // Delete one Todo
     * const Todo = await prisma.todo.delete({
     *   where: {
     *     // ... filter to delete one Todo
     *   }
     * })
     * 
    **/
    delete<T extends TodoDeleteArgs>(
      args: SelectSubset<T, TodoDeleteArgs>
    ): CheckSelect<T, Prisma__TodoClient<Todo>, Prisma__TodoClient<TodoGetPayload<T>>>

    /**
     * Update one Todo.
     * @param {TodoUpdateArgs} args - Arguments to update one Todo.
     * @example
     * // Update one Todo
     * const todo = await prisma.todo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TodoUpdateArgs>(
      args: SelectSubset<T, TodoUpdateArgs>
    ): CheckSelect<T, Prisma__TodoClient<Todo>, Prisma__TodoClient<TodoGetPayload<T>>>

    /**
     * Delete zero or more Todos.
     * @param {TodoDeleteManyArgs} args - Arguments to filter Todos to delete.
     * @example
     * // Delete a few Todos
     * const { count } = await prisma.todo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TodoDeleteManyArgs>(
      args?: SelectSubset<T, TodoDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Todos.
     * @param {TodoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Todos
     * const todo = await prisma.todo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TodoUpdateManyArgs>(
      args: SelectSubset<T, TodoUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Todo.
     * @param {TodoUpsertArgs} args - Arguments to update or create a Todo.
     * @example
     * // Update or create a Todo
     * const todo = await prisma.todo.upsert({
     *   create: {
     *     // ... data to create a Todo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Todo we want to update
     *   }
     * })
    **/
    upsert<T extends TodoUpsertArgs>(
      args: SelectSubset<T, TodoUpsertArgs>
    ): CheckSelect<T, Prisma__TodoClient<Todo>, Prisma__TodoClient<TodoGetPayload<T>>>

    /**
     * Count the number of Todos.
     * @param {TodoCountArgs} args - Arguments to filter Todos to count.
     * @example
     * // Count the number of Todos
     * const count = await prisma.todo.count({
     *   where: {
     *     // ... the filter for the Todos we want to count
     *   }
     * })
    **/
    count<T extends TodoCountArgs>(
      args?: Subset<T, TodoCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TodoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Todo.
     * @param {TodoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TodoAggregateArgs>(args: Subset<T, TodoAggregateArgs>): Promise<GetTodoAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Todo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TodoClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    mainTodo<T extends TodoArgs = {}>(args?: Subset<T, TodoArgs>): CheckSelect<T, Prisma__TodoClient<Todo | null >, Prisma__TodoClient<TodoGetPayload<T> | null >>;

    SubTodo<T extends TodoFindManyArgs = {}>(args?: Subset<T, TodoFindManyArgs>): CheckSelect<T, Promise<Array<Todo>>, Promise<Array<TodoGetPayload<T>>>>;

    User<T extends UserFindManyArgs = {}>(args?: Subset<T, UserFindManyArgs>): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>;

    Group<T extends GroupFindManyArgs = {}>(args?: Subset<T, GroupFindManyArgs>): CheckSelect<T, Promise<Array<Group>>, Promise<Array<GroupGetPayload<T>>>>;

    UserTodoLink<T extends UserTodoLinkFindManyArgs = {}>(args?: Subset<T, UserTodoLinkFindManyArgs>): CheckSelect<T, Promise<Array<UserTodoLink>>, Promise<Array<UserTodoLinkGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Todo findUnique
   */
  export type TodoFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Todo
    **/
    select?: TodoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TodoInclude | null
    /**
     * Throw an Error if a Todo can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Todo to fetch.
    **/
    where: TodoWhereUniqueInput
  }


  /**
   * Todo findFirst
   */
  export type TodoFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Todo
    **/
    select?: TodoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TodoInclude | null
    /**
     * Throw an Error if a Todo can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Todo to fetch.
    **/
    where?: TodoWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Todos to fetch.
    **/
    orderBy?: Enumerable<TodoOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Todos.
    **/
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Todos.
    **/
    distinct?: Enumerable<TodoScalarFieldEnum>
  }


  /**
   * Todo findMany
   */
  export type TodoFindManyArgs = {
    /**
     * Select specific fields to fetch from the Todo
    **/
    select?: TodoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TodoInclude | null
    /**
     * Filter, which Todos to fetch.
    **/
    where?: TodoWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Todos to fetch.
    **/
    orderBy?: Enumerable<TodoOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Todos.
    **/
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
    **/
    skip?: number
    distinct?: Enumerable<TodoScalarFieldEnum>
  }


  /**
   * Todo create
   */
  export type TodoCreateArgs = {
    /**
     * Select specific fields to fetch from the Todo
    **/
    select?: TodoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TodoInclude | null
    /**
     * The data needed to create a Todo.
    **/
    data: XOR<TodoUncheckedCreateInput, TodoCreateInput>
  }


  /**
   * Todo createMany
   */
  export type TodoCreateManyArgs = {
    data: Enumerable<TodoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Todo update
   */
  export type TodoUpdateArgs = {
    /**
     * Select specific fields to fetch from the Todo
    **/
    select?: TodoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TodoInclude | null
    /**
     * The data needed to update a Todo.
    **/
    data: XOR<TodoUncheckedUpdateInput, TodoUpdateInput>
    /**
     * Choose, which Todo to update.
    **/
    where: TodoWhereUniqueInput
  }


  /**
   * Todo updateMany
   */
  export type TodoUpdateManyArgs = {
    data: XOR<TodoUncheckedUpdateManyInput, TodoUpdateManyMutationInput>
    where?: TodoWhereInput
  }


  /**
   * Todo upsert
   */
  export type TodoUpsertArgs = {
    /**
     * Select specific fields to fetch from the Todo
    **/
    select?: TodoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TodoInclude | null
    /**
     * The filter to search for the Todo to update in case it exists.
    **/
    where: TodoWhereUniqueInput
    /**
     * In case the Todo found by the `where` argument doesn't exist, create a new Todo with this data.
    **/
    create: XOR<TodoUncheckedCreateInput, TodoCreateInput>
    /**
     * In case the Todo was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<TodoUncheckedUpdateInput, TodoUpdateInput>
  }


  /**
   * Todo delete
   */
  export type TodoDeleteArgs = {
    /**
     * Select specific fields to fetch from the Todo
    **/
    select?: TodoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TodoInclude | null
    /**
     * Filter which Todo to delete.
    **/
    where: TodoWhereUniqueInput
  }


  /**
   * Todo deleteMany
   */
  export type TodoDeleteManyArgs = {
    where?: TodoWhereInput
  }


  /**
   * Todo without action
   */
  export type TodoArgs = {
    /**
     * Select specific fields to fetch from the Todo
    **/
    select?: TodoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TodoInclude | null
  }



  /**
   * Model UserTodoLink
   */


  export type AggregateUserTodoLink = {
    count: UserTodoLinkCountAggregateOutputType | null
    min: UserTodoLinkMinAggregateOutputType | null
    max: UserTodoLinkMaxAggregateOutputType | null
  }

  export type UserTodoLinkMinAggregateOutputType = {
    userId: string | null
    todoId: string | null
    isAuthor: boolean | null
    isAssigned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserTodoLinkMaxAggregateOutputType = {
    userId: string | null
    todoId: string | null
    isAuthor: boolean | null
    isAssigned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserTodoLinkCountAggregateOutputType = {
    userId: number | null
    todoId: number | null
    isAuthor: number | null
    isAssigned: number | null
    createdAt: number | null
    updatedAt: number | null
    _all: number
  }


  export type UserTodoLinkMinAggregateInputType = {
    userId?: true
    todoId?: true
    isAuthor?: true
    isAssigned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserTodoLinkMaxAggregateInputType = {
    userId?: true
    todoId?: true
    isAuthor?: true
    isAssigned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserTodoLinkCountAggregateInputType = {
    userId?: true
    todoId?: true
    isAuthor?: true
    isAssigned?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserTodoLinkAggregateArgs = {
    /**
     * Filter which UserTodoLink to aggregate.
    **/
    where?: UserTodoLinkWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of UserTodoLinks to fetch.
    **/
    orderBy?: Enumerable<UserTodoLinkOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: UserTodoLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTodoLinks from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTodoLinks.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserTodoLinks
    **/
    count?: true | UserTodoLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: UserTodoLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: UserTodoLinkMaxAggregateInputType
  }

  export type GetUserTodoLinkAggregateType<T extends UserTodoLinkAggregateArgs> = {
    [P in keyof T & keyof AggregateUserTodoLink]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserTodoLink[P]>
      : GetScalarType<T[P], AggregateUserTodoLink[P]>
  }



  export type UserTodoLinkSelect = {
    userId?: boolean
    user?: boolean | UserArgs
    todoId?: boolean
    todo?: boolean | TodoArgs
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserTodoLinkInclude = {
    user?: boolean | UserArgs
    todo?: boolean | TodoArgs
  }

  export type UserTodoLinkGetPayload<
    S extends boolean | null | undefined | UserTodoLinkArgs,
    U = keyof S
      > = S extends true
        ? UserTodoLink
    : S extends undefined
    ? never
    : S extends UserTodoLinkArgs | UserTodoLinkFindManyArgs
    ?'include' extends U
    ? UserTodoLink  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> :
        P extends 'todo'
        ? TodoGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof UserTodoLink ?UserTodoLink [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> :
        P extends 'todo'
        ? TodoGetPayload<S['select'][P]> : never
  } 
    : UserTodoLink
  : UserTodoLink


  type UserTodoLinkCountArgs = Merge<
    Omit<UserTodoLinkFindManyArgs, 'select' | 'include'> & {
      select?: UserTodoLinkCountAggregateInputType | true
    }
  >

  export interface UserTodoLinkDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one UserTodoLink that matches the filter.
     * @param {UserTodoLinkFindUniqueArgs} args - Arguments to find a UserTodoLink
     * @example
     * // Get one UserTodoLink
     * const userTodoLink = await prisma.userTodoLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserTodoLinkFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserTodoLinkFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserTodoLink'> extends True ? CheckSelect<T, Prisma__UserTodoLinkClient<UserTodoLink>, Prisma__UserTodoLinkClient<UserTodoLinkGetPayload<T>>> : CheckSelect<T, Prisma__UserTodoLinkClient<UserTodoLink | null >, Prisma__UserTodoLinkClient<UserTodoLinkGetPayload<T> | null >>

    /**
     * Find the first UserTodoLink that matches the filter.
     * @param {UserTodoLinkFindFirstArgs} args - Arguments to find a UserTodoLink
     * @example
     * // Get one UserTodoLink
     * const userTodoLink = await prisma.userTodoLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserTodoLinkFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserTodoLinkFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserTodoLink'> extends True ? CheckSelect<T, Prisma__UserTodoLinkClient<UserTodoLink>, Prisma__UserTodoLinkClient<UserTodoLinkGetPayload<T>>> : CheckSelect<T, Prisma__UserTodoLinkClient<UserTodoLink | null >, Prisma__UserTodoLinkClient<UserTodoLinkGetPayload<T> | null >>

    /**
     * Find zero or more UserTodoLinks that matches the filter.
     * @param {UserTodoLinkFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserTodoLinks
     * const userTodoLinks = await prisma.userTodoLink.findMany()
     * 
     * // Get first 10 UserTodoLinks
     * const userTodoLinks = await prisma.userTodoLink.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userTodoLinkWithUserIdOnly = await prisma.userTodoLink.findMany({ select: { userId: true } })
     * 
    **/
    findMany<T extends UserTodoLinkFindManyArgs>(
      args?: SelectSubset<T, UserTodoLinkFindManyArgs>
    ): CheckSelect<T, Promise<Array<UserTodoLink>>, Promise<Array<UserTodoLinkGetPayload<T>>>>

    /**
     * Create a UserTodoLink.
     * @param {UserTodoLinkCreateArgs} args - Arguments to create a UserTodoLink.
     * @example
     * // Create one UserTodoLink
     * const UserTodoLink = await prisma.userTodoLink.create({
     *   data: {
     *     // ... data to create a UserTodoLink
     *   }
     * })
     * 
    **/
    create<T extends UserTodoLinkCreateArgs>(
      args: SelectSubset<T, UserTodoLinkCreateArgs>
    ): CheckSelect<T, Prisma__UserTodoLinkClient<UserTodoLink>, Prisma__UserTodoLinkClient<UserTodoLinkGetPayload<T>>>

    /**
     * Create many UserTodoLinks.
     *     @param {UserTodoLinkCreateManyArgs} args - Arguments to create many UserTodoLinks.
     *     @example
     *     // Create many UserTodoLinks
     *     const userTodoLink = await prisma.userTodoLink.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserTodoLinkCreateManyArgs>(
      args?: SelectSubset<T, UserTodoLinkCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a UserTodoLink.
     * @param {UserTodoLinkDeleteArgs} args - Arguments to delete one UserTodoLink.
     * @example
     * // Delete one UserTodoLink
     * const UserTodoLink = await prisma.userTodoLink.delete({
     *   where: {
     *     // ... filter to delete one UserTodoLink
     *   }
     * })
     * 
    **/
    delete<T extends UserTodoLinkDeleteArgs>(
      args: SelectSubset<T, UserTodoLinkDeleteArgs>
    ): CheckSelect<T, Prisma__UserTodoLinkClient<UserTodoLink>, Prisma__UserTodoLinkClient<UserTodoLinkGetPayload<T>>>

    /**
     * Update one UserTodoLink.
     * @param {UserTodoLinkUpdateArgs} args - Arguments to update one UserTodoLink.
     * @example
     * // Update one UserTodoLink
     * const userTodoLink = await prisma.userTodoLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserTodoLinkUpdateArgs>(
      args: SelectSubset<T, UserTodoLinkUpdateArgs>
    ): CheckSelect<T, Prisma__UserTodoLinkClient<UserTodoLink>, Prisma__UserTodoLinkClient<UserTodoLinkGetPayload<T>>>

    /**
     * Delete zero or more UserTodoLinks.
     * @param {UserTodoLinkDeleteManyArgs} args - Arguments to filter UserTodoLinks to delete.
     * @example
     * // Delete a few UserTodoLinks
     * const { count } = await prisma.userTodoLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserTodoLinkDeleteManyArgs>(
      args?: SelectSubset<T, UserTodoLinkDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more UserTodoLinks.
     * @param {UserTodoLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserTodoLinks
     * const userTodoLink = await prisma.userTodoLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserTodoLinkUpdateManyArgs>(
      args: SelectSubset<T, UserTodoLinkUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one UserTodoLink.
     * @param {UserTodoLinkUpsertArgs} args - Arguments to update or create a UserTodoLink.
     * @example
     * // Update or create a UserTodoLink
     * const userTodoLink = await prisma.userTodoLink.upsert({
     *   create: {
     *     // ... data to create a UserTodoLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserTodoLink we want to update
     *   }
     * })
    **/
    upsert<T extends UserTodoLinkUpsertArgs>(
      args: SelectSubset<T, UserTodoLinkUpsertArgs>
    ): CheckSelect<T, Prisma__UserTodoLinkClient<UserTodoLink>, Prisma__UserTodoLinkClient<UserTodoLinkGetPayload<T>>>

    /**
     * Count the number of UserTodoLinks.
     * @param {UserTodoLinkCountArgs} args - Arguments to filter UserTodoLinks to count.
     * @example
     * // Count the number of UserTodoLinks
     * const count = await prisma.userTodoLink.count({
     *   where: {
     *     // ... the filter for the UserTodoLinks we want to count
     *   }
     * })
    **/
    count<T extends UserTodoLinkCountArgs>(
      args?: Subset<T, UserTodoLinkCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserTodoLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserTodoLink.
     * @param {UserTodoLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserTodoLinkAggregateArgs>(args: Subset<T, UserTodoLinkAggregateArgs>): Promise<GetUserTodoLinkAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for UserTodoLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserTodoLinkClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    todo<T extends TodoArgs = {}>(args?: Subset<T, TodoArgs>): CheckSelect<T, Prisma__TodoClient<Todo | null >, Prisma__TodoClient<TodoGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * UserTodoLink findUnique
   */
  export type UserTodoLinkFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the UserTodoLink
    **/
    select?: UserTodoLinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserTodoLinkInclude | null
    /**
     * Throw an Error if a UserTodoLink can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UserTodoLink to fetch.
    **/
    where: UserTodoLinkWhereUniqueInput
  }


  /**
   * UserTodoLink findFirst
   */
  export type UserTodoLinkFindFirstArgs = {
    /**
     * Select specific fields to fetch from the UserTodoLink
    **/
    select?: UserTodoLinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserTodoLinkInclude | null
    /**
     * Throw an Error if a UserTodoLink can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UserTodoLink to fetch.
    **/
    where?: UserTodoLinkWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of UserTodoLinks to fetch.
    **/
    orderBy?: Enumerable<UserTodoLinkOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTodoLinks.
    **/
    cursor?: UserTodoLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTodoLinks from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTodoLinks.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of UserTodoLinks.
    **/
    distinct?: Enumerable<UserTodoLinkScalarFieldEnum>
  }


  /**
   * UserTodoLink findMany
   */
  export type UserTodoLinkFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserTodoLink
    **/
    select?: UserTodoLinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserTodoLinkInclude | null
    /**
     * Filter, which UserTodoLinks to fetch.
    **/
    where?: UserTodoLinkWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of UserTodoLinks to fetch.
    **/
    orderBy?: Enumerable<UserTodoLinkOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserTodoLinks.
    **/
    cursor?: UserTodoLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTodoLinks from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTodoLinks.
    **/
    skip?: number
    distinct?: Enumerable<UserTodoLinkScalarFieldEnum>
  }


  /**
   * UserTodoLink create
   */
  export type UserTodoLinkCreateArgs = {
    /**
     * Select specific fields to fetch from the UserTodoLink
    **/
    select?: UserTodoLinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserTodoLinkInclude | null
    /**
     * The data needed to create a UserTodoLink.
    **/
    data: XOR<UserTodoLinkUncheckedCreateInput, UserTodoLinkCreateInput>
  }


  /**
   * UserTodoLink createMany
   */
  export type UserTodoLinkCreateManyArgs = {
    data: Enumerable<UserTodoLinkCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserTodoLink update
   */
  export type UserTodoLinkUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserTodoLink
    **/
    select?: UserTodoLinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserTodoLinkInclude | null
    /**
     * The data needed to update a UserTodoLink.
    **/
    data: XOR<UserTodoLinkUncheckedUpdateInput, UserTodoLinkUpdateInput>
    /**
     * Choose, which UserTodoLink to update.
    **/
    where: UserTodoLinkWhereUniqueInput
  }


  /**
   * UserTodoLink updateMany
   */
  export type UserTodoLinkUpdateManyArgs = {
    data: XOR<UserTodoLinkUncheckedUpdateManyInput, UserTodoLinkUpdateManyMutationInput>
    where?: UserTodoLinkWhereInput
  }


  /**
   * UserTodoLink upsert
   */
  export type UserTodoLinkUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserTodoLink
    **/
    select?: UserTodoLinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserTodoLinkInclude | null
    /**
     * The filter to search for the UserTodoLink to update in case it exists.
    **/
    where: UserTodoLinkWhereUniqueInput
    /**
     * In case the UserTodoLink found by the `where` argument doesn't exist, create a new UserTodoLink with this data.
    **/
    create: XOR<UserTodoLinkUncheckedCreateInput, UserTodoLinkCreateInput>
    /**
     * In case the UserTodoLink was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<UserTodoLinkUncheckedUpdateInput, UserTodoLinkUpdateInput>
  }


  /**
   * UserTodoLink delete
   */
  export type UserTodoLinkDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserTodoLink
    **/
    select?: UserTodoLinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserTodoLinkInclude | null
    /**
     * Filter which UserTodoLink to delete.
    **/
    where: UserTodoLinkWhereUniqueInput
  }


  /**
   * UserTodoLink deleteMany
   */
  export type UserTodoLinkDeleteManyArgs = {
    where?: UserTodoLinkWhereInput
  }


  /**
   * UserTodoLink without action
   */
  export type UserTodoLinkArgs = {
    /**
     * Select specific fields to fetch from the UserTodoLink
    **/
    select?: UserTodoLinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserTodoLinkInclude | null
  }



  /**
   * Model File
   */


  export type AggregateFile = {
    count: FileCountAggregateOutputType | null
    avg: FileAvgAggregateOutputType | null
    sum: FileSumAggregateOutputType | null
    min: FileMinAggregateOutputType | null
    max: FileMaxAggregateOutputType | null
  }

  export type FileAvgAggregateOutputType = {
    numSeq: number
    size: number | null
  }

  export type FileSumAggregateOutputType = {
    numSeq: number
    size: number | null
  }

  export type FileMinAggregateOutputType = {
    id: string | null
    numSeq: number
    name: string | null
    storageName: string | null
    type: string | null
    data: string | null
    owner: string | null
    size: number | null
    isDeleted: Date | null
    isArchived: Date | null
  }

  export type FileMaxAggregateOutputType = {
    id: string | null
    numSeq: number
    name: string | null
    storageName: string | null
    type: string | null
    data: string | null
    owner: string | null
    size: number | null
    isDeleted: Date | null
    isArchived: Date | null
  }

  export type FileCountAggregateOutputType = {
    id: number | null
    numSeq: number
    name: number | null
    storageName: number | null
    type: number | null
    data: number | null
    owner: number | null
    size: number | null
    isDeleted: number | null
    isArchived: number | null
    _all: number
  }


  export type FileAvgAggregateInputType = {
    numSeq?: true
    size?: true
  }

  export type FileSumAggregateInputType = {
    numSeq?: true
    size?: true
  }

  export type FileMinAggregateInputType = {
    id?: true
    numSeq?: true
    name?: true
    storageName?: true
    type?: true
    data?: true
    owner?: true
    size?: true
    isDeleted?: true
    isArchived?: true
  }

  export type FileMaxAggregateInputType = {
    id?: true
    numSeq?: true
    name?: true
    storageName?: true
    type?: true
    data?: true
    owner?: true
    size?: true
    isDeleted?: true
    isArchived?: true
  }

  export type FileCountAggregateInputType = {
    id?: true
    numSeq?: true
    name?: true
    storageName?: true
    type?: true
    data?: true
    owner?: true
    size?: true
    isDeleted?: true
    isArchived?: true
    _all?: true
  }

  export type FileAggregateArgs = {
    /**
     * Filter which File to aggregate.
    **/
    where?: FileWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Files to fetch.
    **/
    orderBy?: Enumerable<FileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Files
    **/
    count?: true | FileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: FileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: FileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: FileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: FileMaxAggregateInputType
  }

  export type GetFileAggregateType<T extends FileAggregateArgs> = {
    [P in keyof T & keyof AggregateFile]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFile[P]>
      : GetScalarType<T[P], AggregateFile[P]>
  }



  export type FileSelect = {
    id?: boolean
    numSeq?: boolean
    name?: boolean
    storageName?: boolean
    type?: boolean
    data?: boolean
    owner?: boolean
    size?: boolean
    isDeleted?: boolean
    isArchived?: boolean
  }

  export type FileGetPayload<
    S extends boolean | null | undefined | FileArgs,
    U = keyof S
      > = S extends true
        ? File
    : S extends undefined
    ? never
    : S extends FileArgs | FileFindManyArgs
    ?'include' extends U
    ? File 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof File ?File [P]
  : 
     never
  } 
    : File
  : File


  type FileCountArgs = Merge<
    Omit<FileFindManyArgs, 'select' | 'include'> & {
      select?: FileCountAggregateInputType | true
    }
  >

  export interface FileDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one File that matches the filter.
     * @param {FileFindUniqueArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FileFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FileFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'File'> extends True ? CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>> : CheckSelect<T, Prisma__FileClient<File | null >, Prisma__FileClient<FileGetPayload<T> | null >>

    /**
     * Find the first File that matches the filter.
     * @param {FileFindFirstArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FileFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FileFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'File'> extends True ? CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>> : CheckSelect<T, Prisma__FileClient<File | null >, Prisma__FileClient<FileGetPayload<T> | null >>

    /**
     * Find zero or more Files that matches the filter.
     * @param {FileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Files
     * const files = await prisma.file.findMany()
     * 
     * // Get first 10 Files
     * const files = await prisma.file.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileWithIdOnly = await prisma.file.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FileFindManyArgs>(
      args?: SelectSubset<T, FileFindManyArgs>
    ): CheckSelect<T, Promise<Array<File>>, Promise<Array<FileGetPayload<T>>>>

    /**
     * Create a File.
     * @param {FileCreateArgs} args - Arguments to create a File.
     * @example
     * // Create one File
     * const File = await prisma.file.create({
     *   data: {
     *     // ... data to create a File
     *   }
     * })
     * 
    **/
    create<T extends FileCreateArgs>(
      args: SelectSubset<T, FileCreateArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Create many Files.
     *     @param {FileCreateManyArgs} args - Arguments to create many Files.
     *     @example
     *     // Create many Files
     *     const file = await prisma.file.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FileCreateManyArgs>(
      args?: SelectSubset<T, FileCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a File.
     * @param {FileDeleteArgs} args - Arguments to delete one File.
     * @example
     * // Delete one File
     * const File = await prisma.file.delete({
     *   where: {
     *     // ... filter to delete one File
     *   }
     * })
     * 
    **/
    delete<T extends FileDeleteArgs>(
      args: SelectSubset<T, FileDeleteArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Update one File.
     * @param {FileUpdateArgs} args - Arguments to update one File.
     * @example
     * // Update one File
     * const file = await prisma.file.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FileUpdateArgs>(
      args: SelectSubset<T, FileUpdateArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Delete zero or more Files.
     * @param {FileDeleteManyArgs} args - Arguments to filter Files to delete.
     * @example
     * // Delete a few Files
     * const { count } = await prisma.file.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FileDeleteManyArgs>(
      args?: SelectSubset<T, FileDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Files.
     * @param {FileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Files
     * const file = await prisma.file.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FileUpdateManyArgs>(
      args: SelectSubset<T, FileUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one File.
     * @param {FileUpsertArgs} args - Arguments to update or create a File.
     * @example
     * // Update or create a File
     * const file = await prisma.file.upsert({
     *   create: {
     *     // ... data to create a File
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the File we want to update
     *   }
     * })
    **/
    upsert<T extends FileUpsertArgs>(
      args: SelectSubset<T, FileUpsertArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Count the number of Files.
     * @param {FileCountArgs} args - Arguments to filter Files to count.
     * @example
     * // Count the number of Files
     * const count = await prisma.file.count({
     *   where: {
     *     // ... the filter for the Files we want to count
     *   }
     * })
    **/
    count<T extends FileCountArgs>(
      args?: Subset<T, FileCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a File.
     * @param {FileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileAggregateArgs>(args: Subset<T, FileAggregateArgs>): Promise<GetFileAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for File.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FileClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * File findUnique
   */
  export type FileFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the File
    **/
    select?: FileSelect | null
    /**
     * Throw an Error if a File can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which File to fetch.
    **/
    where: FileWhereUniqueInput
  }


  /**
   * File findFirst
   */
  export type FileFindFirstArgs = {
    /**
     * Select specific fields to fetch from the File
    **/
    select?: FileSelect | null
    /**
     * Throw an Error if a File can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which File to fetch.
    **/
    where?: FileWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Files to fetch.
    **/
    orderBy?: Enumerable<FileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
    **/
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Files.
    **/
    distinct?: Enumerable<FileScalarFieldEnum>
  }


  /**
   * File findMany
   */
  export type FileFindManyArgs = {
    /**
     * Select specific fields to fetch from the File
    **/
    select?: FileSelect | null
    /**
     * Filter, which Files to fetch.
    **/
    where?: FileWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Files to fetch.
    **/
    orderBy?: Enumerable<FileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Files.
    **/
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
    **/
    skip?: number
    distinct?: Enumerable<FileScalarFieldEnum>
  }


  /**
   * File create
   */
  export type FileCreateArgs = {
    /**
     * Select specific fields to fetch from the File
    **/
    select?: FileSelect | null
    /**
     * The data needed to create a File.
    **/
    data: XOR<FileUncheckedCreateInput, FileCreateInput>
  }


  /**
   * File createMany
   */
  export type FileCreateManyArgs = {
    data: Enumerable<FileCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * File update
   */
  export type FileUpdateArgs = {
    /**
     * Select specific fields to fetch from the File
    **/
    select?: FileSelect | null
    /**
     * The data needed to update a File.
    **/
    data: XOR<FileUncheckedUpdateInput, FileUpdateInput>
    /**
     * Choose, which File to update.
    **/
    where: FileWhereUniqueInput
  }


  /**
   * File updateMany
   */
  export type FileUpdateManyArgs = {
    data: XOR<FileUncheckedUpdateManyInput, FileUpdateManyMutationInput>
    where?: FileWhereInput
  }


  /**
   * File upsert
   */
  export type FileUpsertArgs = {
    /**
     * Select specific fields to fetch from the File
    **/
    select?: FileSelect | null
    /**
     * The filter to search for the File to update in case it exists.
    **/
    where: FileWhereUniqueInput
    /**
     * In case the File found by the `where` argument doesn't exist, create a new File with this data.
    **/
    create: XOR<FileUncheckedCreateInput, FileCreateInput>
    /**
     * In case the File was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<FileUncheckedUpdateInput, FileUpdateInput>
  }


  /**
   * File delete
   */
  export type FileDeleteArgs = {
    /**
     * Select specific fields to fetch from the File
    **/
    select?: FileSelect | null
    /**
     * Filter which File to delete.
    **/
    where: FileWhereUniqueInput
  }


  /**
   * File deleteMany
   */
  export type FileDeleteManyArgs = {
    where?: FileWhereInput
  }


  /**
   * File without action
   */
  export type FileArgs = {
    /**
     * Select specific fields to fetch from the File
    **/
    select?: FileSelect | null
  }



  /**
   * Model ChangesTracking
   */


  export type AggregateChangesTracking = {
    count: ChangesTrackingCountAggregateOutputType | null
    avg: ChangesTrackingAvgAggregateOutputType | null
    sum: ChangesTrackingSumAggregateOutputType | null
    min: ChangesTrackingMinAggregateOutputType | null
    max: ChangesTrackingMaxAggregateOutputType | null
  }

  export type ChangesTrackingAvgAggregateOutputType = {
    id: number
  }

  export type ChangesTrackingSumAggregateOutputType = {
    id: number
  }

  export type ChangesTrackingMinAggregateOutputType = {
    id: number
    doneAt: Date | null
    authorId: string | null
    modelName: string | null
    recordId: string | null
    operation: string | null
  }

  export type ChangesTrackingMaxAggregateOutputType = {
    id: number
    doneAt: Date | null
    authorId: string | null
    modelName: string | null
    recordId: string | null
    operation: string | null
  }

  export type ChangesTrackingCountAggregateOutputType = {
    id: number
    doneAt: number | null
    authorId: number | null
    modelName: number | null
    recordId: number | null
    operation: number | null
    newData: number | null
    oldData: number | null
    _all: number
  }


  export type ChangesTrackingAvgAggregateInputType = {
    id?: true
  }

  export type ChangesTrackingSumAggregateInputType = {
    id?: true
  }

  export type ChangesTrackingMinAggregateInputType = {
    id?: true
    doneAt?: true
    authorId?: true
    modelName?: true
    recordId?: true
    operation?: true
  }

  export type ChangesTrackingMaxAggregateInputType = {
    id?: true
    doneAt?: true
    authorId?: true
    modelName?: true
    recordId?: true
    operation?: true
  }

  export type ChangesTrackingCountAggregateInputType = {
    id?: true
    doneAt?: true
    authorId?: true
    modelName?: true
    recordId?: true
    operation?: true
    newData?: true
    oldData?: true
    _all?: true
  }

  export type ChangesTrackingAggregateArgs = {
    /**
     * Filter which ChangesTracking to aggregate.
    **/
    where?: ChangesTrackingWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of ChangesTrackings to fetch.
    **/
    orderBy?: Enumerable<ChangesTrackingOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: ChangesTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangesTrackings from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangesTrackings.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChangesTrackings
    **/
    count?: true | ChangesTrackingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: ChangesTrackingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: ChangesTrackingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: ChangesTrackingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: ChangesTrackingMaxAggregateInputType
  }

  export type GetChangesTrackingAggregateType<T extends ChangesTrackingAggregateArgs> = {
    [P in keyof T & keyof AggregateChangesTracking]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChangesTracking[P]>
      : GetScalarType<T[P], AggregateChangesTracking[P]>
  }



  export type ChangesTrackingSelect = {
    id?: boolean
    doneAt?: boolean
    modifiedBy?: boolean | UserArgs
    authorId?: boolean
    modelName?: boolean
    recordId?: boolean
    operation?: boolean
    newData?: boolean
    oldData?: boolean
  }

  export type ChangesTrackingInclude = {
    modifiedBy?: boolean | UserArgs
  }

  export type ChangesTrackingGetPayload<
    S extends boolean | null | undefined | ChangesTrackingArgs,
    U = keyof S
      > = S extends true
        ? ChangesTracking
    : S extends undefined
    ? never
    : S extends ChangesTrackingArgs | ChangesTrackingFindManyArgs
    ?'include' extends U
    ? ChangesTracking  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'modifiedBy'
        ? UserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ChangesTracking ?ChangesTracking [P]
  : 
          P extends 'modifiedBy'
        ? UserGetPayload<S['select'][P]> : never
  } 
    : ChangesTracking
  : ChangesTracking


  type ChangesTrackingCountArgs = Merge<
    Omit<ChangesTrackingFindManyArgs, 'select' | 'include'> & {
      select?: ChangesTrackingCountAggregateInputType | true
    }
  >

  export interface ChangesTrackingDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ChangesTracking that matches the filter.
     * @param {ChangesTrackingFindUniqueArgs} args - Arguments to find a ChangesTracking
     * @example
     * // Get one ChangesTracking
     * const changesTracking = await prisma.changesTracking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChangesTrackingFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ChangesTrackingFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ChangesTracking'> extends True ? CheckSelect<T, Prisma__ChangesTrackingClient<ChangesTracking>, Prisma__ChangesTrackingClient<ChangesTrackingGetPayload<T>>> : CheckSelect<T, Prisma__ChangesTrackingClient<ChangesTracking | null >, Prisma__ChangesTrackingClient<ChangesTrackingGetPayload<T> | null >>

    /**
     * Find the first ChangesTracking that matches the filter.
     * @param {ChangesTrackingFindFirstArgs} args - Arguments to find a ChangesTracking
     * @example
     * // Get one ChangesTracking
     * const changesTracking = await prisma.changesTracking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChangesTrackingFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ChangesTrackingFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ChangesTracking'> extends True ? CheckSelect<T, Prisma__ChangesTrackingClient<ChangesTracking>, Prisma__ChangesTrackingClient<ChangesTrackingGetPayload<T>>> : CheckSelect<T, Prisma__ChangesTrackingClient<ChangesTracking | null >, Prisma__ChangesTrackingClient<ChangesTrackingGetPayload<T> | null >>

    /**
     * Find zero or more ChangesTrackings that matches the filter.
     * @param {ChangesTrackingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChangesTrackings
     * const changesTrackings = await prisma.changesTracking.findMany()
     * 
     * // Get first 10 ChangesTrackings
     * const changesTrackings = await prisma.changesTracking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const changesTrackingWithIdOnly = await prisma.changesTracking.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ChangesTrackingFindManyArgs>(
      args?: SelectSubset<T, ChangesTrackingFindManyArgs>
    ): CheckSelect<T, Promise<Array<ChangesTracking>>, Promise<Array<ChangesTrackingGetPayload<T>>>>

    /**
     * Create a ChangesTracking.
     * @param {ChangesTrackingCreateArgs} args - Arguments to create a ChangesTracking.
     * @example
     * // Create one ChangesTracking
     * const ChangesTracking = await prisma.changesTracking.create({
     *   data: {
     *     // ... data to create a ChangesTracking
     *   }
     * })
     * 
    **/
    create<T extends ChangesTrackingCreateArgs>(
      args: SelectSubset<T, ChangesTrackingCreateArgs>
    ): CheckSelect<T, Prisma__ChangesTrackingClient<ChangesTracking>, Prisma__ChangesTrackingClient<ChangesTrackingGetPayload<T>>>

    /**
     * Create many ChangesTrackings.
     *     @param {ChangesTrackingCreateManyArgs} args - Arguments to create many ChangesTrackings.
     *     @example
     *     // Create many ChangesTrackings
     *     const changesTracking = await prisma.changesTracking.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChangesTrackingCreateManyArgs>(
      args?: SelectSubset<T, ChangesTrackingCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a ChangesTracking.
     * @param {ChangesTrackingDeleteArgs} args - Arguments to delete one ChangesTracking.
     * @example
     * // Delete one ChangesTracking
     * const ChangesTracking = await prisma.changesTracking.delete({
     *   where: {
     *     // ... filter to delete one ChangesTracking
     *   }
     * })
     * 
    **/
    delete<T extends ChangesTrackingDeleteArgs>(
      args: SelectSubset<T, ChangesTrackingDeleteArgs>
    ): CheckSelect<T, Prisma__ChangesTrackingClient<ChangesTracking>, Prisma__ChangesTrackingClient<ChangesTrackingGetPayload<T>>>

    /**
     * Update one ChangesTracking.
     * @param {ChangesTrackingUpdateArgs} args - Arguments to update one ChangesTracking.
     * @example
     * // Update one ChangesTracking
     * const changesTracking = await prisma.changesTracking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChangesTrackingUpdateArgs>(
      args: SelectSubset<T, ChangesTrackingUpdateArgs>
    ): CheckSelect<T, Prisma__ChangesTrackingClient<ChangesTracking>, Prisma__ChangesTrackingClient<ChangesTrackingGetPayload<T>>>

    /**
     * Delete zero or more ChangesTrackings.
     * @param {ChangesTrackingDeleteManyArgs} args - Arguments to filter ChangesTrackings to delete.
     * @example
     * // Delete a few ChangesTrackings
     * const { count } = await prisma.changesTracking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChangesTrackingDeleteManyArgs>(
      args?: SelectSubset<T, ChangesTrackingDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more ChangesTrackings.
     * @param {ChangesTrackingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChangesTrackings
     * const changesTracking = await prisma.changesTracking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChangesTrackingUpdateManyArgs>(
      args: SelectSubset<T, ChangesTrackingUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one ChangesTracking.
     * @param {ChangesTrackingUpsertArgs} args - Arguments to update or create a ChangesTracking.
     * @example
     * // Update or create a ChangesTracking
     * const changesTracking = await prisma.changesTracking.upsert({
     *   create: {
     *     // ... data to create a ChangesTracking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChangesTracking we want to update
     *   }
     * })
    **/
    upsert<T extends ChangesTrackingUpsertArgs>(
      args: SelectSubset<T, ChangesTrackingUpsertArgs>
    ): CheckSelect<T, Prisma__ChangesTrackingClient<ChangesTracking>, Prisma__ChangesTrackingClient<ChangesTrackingGetPayload<T>>>

    /**
     * Count the number of ChangesTrackings.
     * @param {ChangesTrackingCountArgs} args - Arguments to filter ChangesTrackings to count.
     * @example
     * // Count the number of ChangesTrackings
     * const count = await prisma.changesTracking.count({
     *   where: {
     *     // ... the filter for the ChangesTrackings we want to count
     *   }
     * })
    **/
    count<T extends ChangesTrackingCountArgs>(
      args?: Subset<T, ChangesTrackingCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChangesTrackingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChangesTracking.
     * @param {ChangesTrackingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChangesTrackingAggregateArgs>(args: Subset<T, ChangesTrackingAggregateArgs>): Promise<GetChangesTrackingAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for ChangesTracking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ChangesTrackingClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    modifiedBy<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ChangesTracking findUnique
   */
  export type ChangesTrackingFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ChangesTracking
    **/
    select?: ChangesTrackingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ChangesTrackingInclude | null
    /**
     * Throw an Error if a ChangesTracking can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ChangesTracking to fetch.
    **/
    where: ChangesTrackingWhereUniqueInput
  }


  /**
   * ChangesTracking findFirst
   */
  export type ChangesTrackingFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ChangesTracking
    **/
    select?: ChangesTrackingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ChangesTrackingInclude | null
    /**
     * Throw an Error if a ChangesTracking can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ChangesTracking to fetch.
    **/
    where?: ChangesTrackingWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of ChangesTrackings to fetch.
    **/
    orderBy?: Enumerable<ChangesTrackingOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChangesTrackings.
    **/
    cursor?: ChangesTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangesTrackings from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangesTrackings.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of ChangesTrackings.
    **/
    distinct?: Enumerable<ChangesTrackingScalarFieldEnum>
  }


  /**
   * ChangesTracking findMany
   */
  export type ChangesTrackingFindManyArgs = {
    /**
     * Select specific fields to fetch from the ChangesTracking
    **/
    select?: ChangesTrackingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ChangesTrackingInclude | null
    /**
     * Filter, which ChangesTrackings to fetch.
    **/
    where?: ChangesTrackingWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of ChangesTrackings to fetch.
    **/
    orderBy?: Enumerable<ChangesTrackingOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChangesTrackings.
    **/
    cursor?: ChangesTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangesTrackings from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangesTrackings.
    **/
    skip?: number
    distinct?: Enumerable<ChangesTrackingScalarFieldEnum>
  }


  /**
   * ChangesTracking create
   */
  export type ChangesTrackingCreateArgs = {
    /**
     * Select specific fields to fetch from the ChangesTracking
    **/
    select?: ChangesTrackingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ChangesTrackingInclude | null
    /**
     * The data needed to create a ChangesTracking.
    **/
    data: XOR<ChangesTrackingUncheckedCreateInput, ChangesTrackingCreateInput>
  }


  /**
   * ChangesTracking createMany
   */
  export type ChangesTrackingCreateManyArgs = {
    data: Enumerable<ChangesTrackingCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ChangesTracking update
   */
  export type ChangesTrackingUpdateArgs = {
    /**
     * Select specific fields to fetch from the ChangesTracking
    **/
    select?: ChangesTrackingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ChangesTrackingInclude | null
    /**
     * The data needed to update a ChangesTracking.
    **/
    data: XOR<ChangesTrackingUncheckedUpdateInput, ChangesTrackingUpdateInput>
    /**
     * Choose, which ChangesTracking to update.
    **/
    where: ChangesTrackingWhereUniqueInput
  }


  /**
   * ChangesTracking updateMany
   */
  export type ChangesTrackingUpdateManyArgs = {
    data: XOR<ChangesTrackingUncheckedUpdateManyInput, ChangesTrackingUpdateManyMutationInput>
    where?: ChangesTrackingWhereInput
  }


  /**
   * ChangesTracking upsert
   */
  export type ChangesTrackingUpsertArgs = {
    /**
     * Select specific fields to fetch from the ChangesTracking
    **/
    select?: ChangesTrackingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ChangesTrackingInclude | null
    /**
     * The filter to search for the ChangesTracking to update in case it exists.
    **/
    where: ChangesTrackingWhereUniqueInput
    /**
     * In case the ChangesTracking found by the `where` argument doesn't exist, create a new ChangesTracking with this data.
    **/
    create: XOR<ChangesTrackingUncheckedCreateInput, ChangesTrackingCreateInput>
    /**
     * In case the ChangesTracking was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<ChangesTrackingUncheckedUpdateInput, ChangesTrackingUpdateInput>
  }


  /**
   * ChangesTracking delete
   */
  export type ChangesTrackingDeleteArgs = {
    /**
     * Select specific fields to fetch from the ChangesTracking
    **/
    select?: ChangesTrackingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ChangesTrackingInclude | null
    /**
     * Filter which ChangesTracking to delete.
    **/
    where: ChangesTrackingWhereUniqueInput
  }


  /**
   * ChangesTracking deleteMany
   */
  export type ChangesTrackingDeleteManyArgs = {
    where?: ChangesTrackingWhereInput
  }


  /**
   * ChangesTracking without action
   */
  export type ChangesTrackingArgs = {
    /**
     * Select specific fields to fetch from the ChangesTracking
    **/
    select?: ChangesTrackingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ChangesTrackingInclude | null
  }



  /**
   * Model Post
   */


  export type AggregatePost = {
    count: PostCountAggregateOutputType | null
    avg: PostAvgAggregateOutputType | null
    sum: PostSumAggregateOutputType | null
    min: PostMinAggregateOutputType | null
    max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    orderPost: number | null
  }

  export type PostSumAggregateOutputType = {
    orderPost: number | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    orderPost: number | null
    published: boolean | null
    title: string | null
    content: string | null
    authorId: string | null
    isDeleted: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    orderPost: number | null
    published: boolean | null
    title: string | null
    content: string | null
    authorId: string | null
    isDeleted: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number | null
    createdAt: number | null
    updatedAt: number | null
    orderPost: number | null
    published: number | null
    title: number | null
    content: number | null
    authorId: number | null
    isDeleted: number | null
    _all: number
  }


  export type PostAvgAggregateInputType = {
    orderPost?: true
  }

  export type PostSumAggregateInputType = {
    orderPost?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderPost?: true
    published?: true
    title?: true
    content?: true
    authorId?: true
    isDeleted?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderPost?: true
    published?: true
    title?: true
    content?: true
    authorId?: true
    isDeleted?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    orderPost?: true
    published?: true
    title?: true
    content?: true
    authorId?: true
    isDeleted?: true
    _all?: true
  }

  export type PostAggregateArgs = {
    /**
     * Filter which Post to aggregate.
    **/
    where?: PostWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Posts to fetch.
    **/
    orderBy?: Enumerable<PostOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
    [P in keyof T & keyof AggregatePost]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }



  export type PostSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orderPost?: boolean
    published?: boolean
    title?: boolean
    content?: boolean
    author?: boolean | UserArgs
    authorId?: boolean
    Category?: boolean | CategoryFindManyArgs
    Comment?: boolean | CommentFindManyArgs
    isDeleted?: boolean
  }

  export type PostInclude = {
    author?: boolean | UserArgs
    Category?: boolean | CategoryFindManyArgs
    Comment?: boolean | CommentFindManyArgs
  }

  export type PostGetPayload<
    S extends boolean | null | undefined | PostArgs,
    U = keyof S
      > = S extends true
        ? Post
    : S extends undefined
    ? never
    : S extends PostArgs | PostFindManyArgs
    ?'include' extends U
    ? Post  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'author'
        ? UserGetPayload<S['include'][P]> :
        P extends 'Category'
        ? Array < CategoryGetPayload<S['include'][P]>>  :
        P extends 'Comment'
        ? Array < CommentGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Post ?Post [P]
  : 
          P extends 'author'
        ? UserGetPayload<S['select'][P]> :
        P extends 'Category'
        ? Array < CategoryGetPayload<S['select'][P]>>  :
        P extends 'Comment'
        ? Array < CommentGetPayload<S['select'][P]>>  : never
  } 
    : Post
  : Post


  type PostCountArgs = Merge<
    Omit<PostFindManyArgs, 'select' | 'include'> & {
      select?: PostCountAggregateInputType | true
    }
  >

  export interface PostDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Post'> extends True ? CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>> : CheckSelect<T, Prisma__PostClient<Post | null >, Prisma__PostClient<PostGetPayload<T> | null >>

    /**
     * Find the first Post that matches the filter.
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Post'> extends True ? CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>> : CheckSelect<T, Prisma__PostClient<Post | null >, Prisma__PostClient<PostGetPayload<T> | null >>

    /**
     * Find zero or more Posts that matches the filter.
     * @param {PostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PostFindManyArgs>(
      args?: SelectSubset<T, PostFindManyArgs>
    ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
    **/
    create<T extends PostCreateArgs>(
      args: SelectSubset<T, PostCreateArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Create many Posts.
     *     @param {PostCreateManyArgs} args - Arguments to create many Posts.
     *     @example
     *     // Create many Posts
     *     const post = await prisma.post.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PostCreateManyArgs>(
      args?: SelectSubset<T, PostCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
    **/
    delete<T extends PostDeleteArgs>(
      args: SelectSubset<T, PostDeleteArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PostUpdateArgs>(
      args: SelectSubset<T, PostUpdateArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PostDeleteManyArgs>(
      args?: SelectSubset<T, PostDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Posts.
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PostUpdateManyArgs>(
      args: SelectSubset<T, PostUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
    **/
    upsert<T extends PostUpsertArgs>(
      args: SelectSubset<T, PostUpsertArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Count the number of Posts.
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Promise<GetPostAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PostClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    Category<T extends CategoryFindManyArgs = {}>(args?: Subset<T, CategoryFindManyArgs>): CheckSelect<T, Promise<Array<Category>>, Promise<Array<CategoryGetPayload<T>>>>;

    Comment<T extends CommentFindManyArgs = {}>(args?: Subset<T, CommentFindManyArgs>): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * Throw an Error if a Post can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Post to fetch.
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post findFirst
   */
  export type PostFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * Throw an Error if a Post can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Post to fetch.
    **/
    where?: PostWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Posts to fetch.
    **/
    orderBy?: Enumerable<PostOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Posts.
    **/
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post findMany
   */
  export type PostFindManyArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * Filter, which Posts to fetch.
    **/
    where?: PostWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Posts to fetch.
    **/
    orderBy?: Enumerable<PostOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
    **/
    skip?: number
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post create
   */
  export type PostCreateArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * The data needed to create a Post.
    **/
    data: XOR<PostUncheckedCreateInput, PostCreateInput>
  }


  /**
   * Post createMany
   */
  export type PostCreateManyArgs = {
    data: Enumerable<PostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Post update
   */
  export type PostUpdateArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * The data needed to update a Post.
    **/
    data: XOR<PostUncheckedUpdateInput, PostUpdateInput>
    /**
     * Choose, which Post to update.
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs = {
    data: XOR<PostUncheckedUpdateManyInput, PostUpdateManyMutationInput>
    where?: PostWhereInput
  }


  /**
   * Post upsert
   */
  export type PostUpsertArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * The filter to search for the Post to update in case it exists.
    **/
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
    **/
    create: XOR<PostUncheckedCreateInput, PostCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<PostUncheckedUpdateInput, PostUpdateInput>
  }


  /**
   * Post delete
   */
  export type PostDeleteArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * Filter which Post to delete.
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs = {
    where?: PostWhereInput
  }


  /**
   * Post without action
   */
  export type PostArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
  }



  /**
   * Model Category
   */


  export type AggregateCategory = {
    count: CategoryCountAggregateOutputType | null
    avg: CategoryAvgAggregateOutputType | null
    sum: CategorySumAggregateOutputType | null
    min: CategoryMinAggregateOutputType | null
    max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    orderCategory: number
  }

  export type CategorySumAggregateOutputType = {
    orderCategory: number
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    orderCategory: number
    name: string | null
    isDeleted: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    orderCategory: number
    name: string | null
    isDeleted: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number | null
    orderCategory: number
    name: number | null
    isDeleted: number | null
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    orderCategory?: true
  }

  export type CategorySumAggregateInputType = {
    orderCategory?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    orderCategory?: true
    name?: true
    isDeleted?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    orderCategory?: true
    name?: true
    isDeleted?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    orderCategory?: true
    name?: true
    isDeleted?: true
    _all?: true
  }

  export type CategoryAggregateArgs = {
    /**
     * Filter which Category to aggregate.
    **/
    where?: CategoryWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Categories to fetch.
    **/
    orderBy?: Enumerable<CategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCategory]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }



  export type CategorySelect = {
    id?: boolean
    orderCategory?: boolean
    name?: boolean
    Post?: boolean | PostFindManyArgs
    isDeleted?: boolean
  }

  export type CategoryInclude = {
    Post?: boolean | PostFindManyArgs
  }

  export type CategoryGetPayload<
    S extends boolean | null | undefined | CategoryArgs,
    U = keyof S
      > = S extends true
        ? Category
    : S extends undefined
    ? never
    : S extends CategoryArgs | CategoryFindManyArgs
    ?'include' extends U
    ? Category  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Post'
        ? Array < PostGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Category ?Category [P]
  : 
          P extends 'Post'
        ? Array < PostGetPayload<S['select'][P]>>  : never
  } 
    : Category
  : Category


  type CategoryCountArgs = Merge<
    Omit<CategoryFindManyArgs, 'select' | 'include'> & {
      select?: CategoryCountAggregateInputType | true
    }
  >

  export interface CategoryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Category'> extends True ? CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>> : CheckSelect<T, Prisma__CategoryClient<Category | null >, Prisma__CategoryClient<CategoryGetPayload<T> | null >>

    /**
     * Find the first Category that matches the filter.
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Category'> extends True ? CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>> : CheckSelect<T, Prisma__CategoryClient<Category | null >, Prisma__CategoryClient<CategoryGetPayload<T> | null >>

    /**
     * Find zero or more Categories that matches the filter.
     * @param {CategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CategoryFindManyArgs>(
      args?: SelectSubset<T, CategoryFindManyArgs>
    ): CheckSelect<T, Promise<Array<Category>>, Promise<Array<CategoryGetPayload<T>>>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
    **/
    create<T extends CategoryCreateArgs>(
      args: SelectSubset<T, CategoryCreateArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Create many Categories.
     *     @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     *     @example
     *     // Create many Categories
     *     const category = await prisma.category.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CategoryCreateManyArgs>(
      args?: SelectSubset<T, CategoryCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
    **/
    delete<T extends CategoryDeleteArgs>(
      args: SelectSubset<T, CategoryDeleteArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CategoryUpdateArgs>(
      args: SelectSubset<T, CategoryUpdateArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CategoryDeleteManyArgs>(
      args?: SelectSubset<T, CategoryDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Categories.
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CategoryUpdateManyArgs>(
      args: SelectSubset<T, CategoryUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
    **/
    upsert<T extends CategoryUpsertArgs>(
      args: SelectSubset<T, CategoryUpsertArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Count the number of Categories.
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Promise<GetCategoryAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CategoryClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Post<T extends PostFindManyArgs = {}>(args?: Subset<T, PostFindManyArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Throw an Error if a Category can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Category to fetch.
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Throw an Error if a Category can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Category to fetch.
    **/
    where?: CategoryWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Categories to fetch.
    **/
    orderBy?: Enumerable<CategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Categories.
    **/
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category findMany
   */
  export type CategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Categories to fetch.
    **/
    where?: CategoryWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Categories to fetch.
    **/
    orderBy?: Enumerable<CategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
    **/
    skip?: number
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category create
   */
  export type CategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * The data needed to create a Category.
    **/
    data: XOR<CategoryUncheckedCreateInput, CategoryCreateInput>
  }


  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs = {
    data: Enumerable<CategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Category update
   */
  export type CategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * The data needed to update a Category.
    **/
    data: XOR<CategoryUncheckedUpdateInput, CategoryUpdateInput>
    /**
     * Choose, which Category to update.
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs = {
    data: XOR<CategoryUncheckedUpdateManyInput, CategoryUpdateManyMutationInput>
    where?: CategoryWhereInput
  }


  /**
   * Category upsert
   */
  export type CategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * The filter to search for the Category to update in case it exists.
    **/
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
    **/
    create: XOR<CategoryUncheckedCreateInput, CategoryCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<CategoryUncheckedUpdateInput, CategoryUpdateInput>
  }


  /**
   * Category delete
   */
  export type CategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Filter which Category to delete.
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs = {
    where?: CategoryWhereInput
  }


  /**
   * Category without action
   */
  export type CategoryArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
  }



  /**
   * Model Comment
   */


  export type AggregateComment = {
    count: CommentCountAggregateOutputType | null
    avg: CommentAvgAggregateOutputType | null
    sum: CommentSumAggregateOutputType | null
    min: CommentMinAggregateOutputType | null
    max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    orderComment: number
  }

  export type CommentSumAggregateOutputType = {
    orderComment: number
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: Date | null
    orderComment: number
    published: boolean | null
    content: string | null
    postId: string | null
    authorId: string | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isDeleted: Date | null
    orderComment: number
    published: boolean | null
    content: string | null
    postId: string | null
    authorId: string | null
  }

  export type CommentCountAggregateOutputType = {
    id: number | null
    createdAt: number | null
    updatedAt: number | null
    isDeleted: number | null
    orderComment: number
    published: number | null
    content: number | null
    postId: number | null
    authorId: number | null
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    orderComment?: true
  }

  export type CommentSumAggregateInputType = {
    orderComment?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    orderComment?: true
    published?: true
    content?: true
    postId?: true
    authorId?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    orderComment?: true
    published?: true
    content?: true
    postId?: true
    authorId?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    isDeleted?: true
    orderComment?: true
    published?: true
    content?: true
    postId?: true
    authorId?: true
    _all?: true
  }

  export type CommentAggregateArgs = {
    /**
     * Filter which Comment to aggregate.
    **/
    where?: CommentWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Comments to fetch.
    **/
    orderBy?: Enumerable<CommentOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
    [P in keyof T & keyof AggregateComment]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }



  export type CommentSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isDeleted?: boolean
    orderComment?: boolean
    published?: boolean
    content?: boolean
    post?: boolean | PostArgs
    postId?: boolean
    author?: boolean | UserArgs
    authorId?: boolean
  }

  export type CommentInclude = {
    post?: boolean | PostArgs
    author?: boolean | UserArgs
  }

  export type CommentGetPayload<
    S extends boolean | null | undefined | CommentArgs,
    U = keyof S
      > = S extends true
        ? Comment
    : S extends undefined
    ? never
    : S extends CommentArgs | CommentFindManyArgs
    ?'include' extends U
    ? Comment  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'post'
        ? PostGetPayload<S['include'][P]> :
        P extends 'author'
        ? UserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Comment ?Comment [P]
  : 
          P extends 'post'
        ? PostGetPayload<S['select'][P]> :
        P extends 'author'
        ? UserGetPayload<S['select'][P]> : never
  } 
    : Comment
  : Comment


  type CommentCountArgs = Merge<
    Omit<CommentFindManyArgs, 'select' | 'include'> & {
      select?: CommentCountAggregateInputType | true
    }
  >

  export interface CommentDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CommentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CommentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Comment'> extends True ? CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>> : CheckSelect<T, Prisma__CommentClient<Comment | null >, Prisma__CommentClient<CommentGetPayload<T> | null >>

    /**
     * Find the first Comment that matches the filter.
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CommentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CommentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Comment'> extends True ? CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>> : CheckSelect<T, Prisma__CommentClient<Comment | null >, Prisma__CommentClient<CommentGetPayload<T> | null >>

    /**
     * Find zero or more Comments that matches the filter.
     * @param {CommentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CommentFindManyArgs>(
      args?: SelectSubset<T, CommentFindManyArgs>
    ): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
    **/
    create<T extends CommentCreateArgs>(
      args: SelectSubset<T, CommentCreateArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Create many Comments.
     *     @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     *     @example
     *     // Create many Comments
     *     const comment = await prisma.comment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CommentCreateManyArgs>(
      args?: SelectSubset<T, CommentCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
    **/
    delete<T extends CommentDeleteArgs>(
      args: SelectSubset<T, CommentDeleteArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CommentUpdateArgs>(
      args: SelectSubset<T, CommentUpdateArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CommentDeleteManyArgs>(
      args?: SelectSubset<T, CommentDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Comments.
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CommentUpdateManyArgs>(
      args: SelectSubset<T, CommentUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
    **/
    upsert<T extends CommentUpsertArgs>(
      args: SelectSubset<T, CommentUpsertArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Count the number of Comments.
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Promise<GetCommentAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CommentClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, Prisma__PostClient<Post | null >, Prisma__PostClient<PostGetPayload<T> | null >>;

    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Comment
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CommentInclude | null
    /**
     * Throw an Error if a Comment can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Comment to fetch.
    **/
    where: CommentWhereUniqueInput
  }


  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Comment
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CommentInclude | null
    /**
     * Throw an Error if a Comment can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Comment to fetch.
    **/
    where?: CommentWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Comments to fetch.
    **/
    orderBy?: Enumerable<CommentOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
    **/
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Comments.
    **/
    distinct?: Enumerable<CommentScalarFieldEnum>
  }


  /**
   * Comment findMany
   */
  export type CommentFindManyArgs = {
    /**
     * Select specific fields to fetch from the Comment
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CommentInclude | null
    /**
     * Filter, which Comments to fetch.
    **/
    where?: CommentWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Comments to fetch.
    **/
    orderBy?: Enumerable<CommentOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
    **/
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
    **/
    skip?: number
    distinct?: Enumerable<CommentScalarFieldEnum>
  }


  /**
   * Comment create
   */
  export type CommentCreateArgs = {
    /**
     * Select specific fields to fetch from the Comment
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CommentInclude | null
    /**
     * The data needed to create a Comment.
    **/
    data: XOR<CommentUncheckedCreateInput, CommentCreateInput>
  }


  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs = {
    data: Enumerable<CommentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Comment update
   */
  export type CommentUpdateArgs = {
    /**
     * Select specific fields to fetch from the Comment
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CommentInclude | null
    /**
     * The data needed to update a Comment.
    **/
    data: XOR<CommentUncheckedUpdateInput, CommentUpdateInput>
    /**
     * Choose, which Comment to update.
    **/
    where: CommentWhereUniqueInput
  }


  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs = {
    data: XOR<CommentUncheckedUpdateManyInput, CommentUpdateManyMutationInput>
    where?: CommentWhereInput
  }


  /**
   * Comment upsert
   */
  export type CommentUpsertArgs = {
    /**
     * Select specific fields to fetch from the Comment
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CommentInclude | null
    /**
     * The filter to search for the Comment to update in case it exists.
    **/
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
    **/
    create: XOR<CommentUncheckedCreateInput, CommentCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<CommentUncheckedUpdateInput, CommentUpdateInput>
  }


  /**
   * Comment delete
   */
  export type CommentDeleteArgs = {
    /**
     * Select specific fields to fetch from the Comment
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CommentInclude | null
    /**
     * Filter which Comment to delete.
    **/
    where: CommentWhereUniqueInput
  }


  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs = {
    where?: CommentWhereInput
  }


  /**
   * Comment without action
   */
  export type CommentArgs = {
    /**
     * Select specific fields to fetch from the Comment
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CommentInclude | null
  }



  /**
   * Model ConfigParam
   */


  export type AggregateConfigParam = {
    count: ConfigParamCountAggregateOutputType | null
    avg: ConfigParamAvgAggregateOutputType | null
    sum: ConfigParamSumAggregateOutputType | null
    min: ConfigParamMinAggregateOutputType | null
    max: ConfigParamMaxAggregateOutputType | null
  }

  export type ConfigParamAvgAggregateOutputType = {
    id: number
  }

  export type ConfigParamSumAggregateOutputType = {
    id: number
  }

  export type ConfigParamMinAggregateOutputType = {
    id: number
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    value: string | null
    utility: string | null
  }

  export type ConfigParamMaxAggregateOutputType = {
    id: number
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    value: string | null
    utility: string | null
  }

  export type ConfigParamCountAggregateOutputType = {
    id: number
    createdAt: number | null
    updatedAt: number | null
    name: number | null
    value: number | null
    utility: number | null
    _all: number
  }


  export type ConfigParamAvgAggregateInputType = {
    id?: true
  }

  export type ConfigParamSumAggregateInputType = {
    id?: true
  }

  export type ConfigParamMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    value?: true
    utility?: true
  }

  export type ConfigParamMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    value?: true
    utility?: true
  }

  export type ConfigParamCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    value?: true
    utility?: true
    _all?: true
  }

  export type ConfigParamAggregateArgs = {
    /**
     * Filter which ConfigParam to aggregate.
    **/
    where?: ConfigParamWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of ConfigParams to fetch.
    **/
    orderBy?: Enumerable<ConfigParamOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: ConfigParamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfigParams from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfigParams.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConfigParams
    **/
    count?: true | ConfigParamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: ConfigParamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: ConfigParamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: ConfigParamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: ConfigParamMaxAggregateInputType
  }

  export type GetConfigParamAggregateType<T extends ConfigParamAggregateArgs> = {
    [P in keyof T & keyof AggregateConfigParam]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfigParam[P]>
      : GetScalarType<T[P], AggregateConfigParam[P]>
  }



  export type ConfigParamSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    value?: boolean
    utility?: boolean
  }

  export type ConfigParamGetPayload<
    S extends boolean | null | undefined | ConfigParamArgs,
    U = keyof S
      > = S extends true
        ? ConfigParam
    : S extends undefined
    ? never
    : S extends ConfigParamArgs | ConfigParamFindManyArgs
    ?'include' extends U
    ? ConfigParam 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ConfigParam ?ConfigParam [P]
  : 
     never
  } 
    : ConfigParam
  : ConfigParam


  type ConfigParamCountArgs = Merge<
    Omit<ConfigParamFindManyArgs, 'select' | 'include'> & {
      select?: ConfigParamCountAggregateInputType | true
    }
  >

  export interface ConfigParamDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ConfigParam that matches the filter.
     * @param {ConfigParamFindUniqueArgs} args - Arguments to find a ConfigParam
     * @example
     * // Get one ConfigParam
     * const configParam = await prisma.configParam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ConfigParamFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ConfigParamFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ConfigParam'> extends True ? CheckSelect<T, Prisma__ConfigParamClient<ConfigParam>, Prisma__ConfigParamClient<ConfigParamGetPayload<T>>> : CheckSelect<T, Prisma__ConfigParamClient<ConfigParam | null >, Prisma__ConfigParamClient<ConfigParamGetPayload<T> | null >>

    /**
     * Find the first ConfigParam that matches the filter.
     * @param {ConfigParamFindFirstArgs} args - Arguments to find a ConfigParam
     * @example
     * // Get one ConfigParam
     * const configParam = await prisma.configParam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ConfigParamFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ConfigParamFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ConfigParam'> extends True ? CheckSelect<T, Prisma__ConfigParamClient<ConfigParam>, Prisma__ConfigParamClient<ConfigParamGetPayload<T>>> : CheckSelect<T, Prisma__ConfigParamClient<ConfigParam | null >, Prisma__ConfigParamClient<ConfigParamGetPayload<T> | null >>

    /**
     * Find zero or more ConfigParams that matches the filter.
     * @param {ConfigParamFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConfigParams
     * const configParams = await prisma.configParam.findMany()
     * 
     * // Get first 10 ConfigParams
     * const configParams = await prisma.configParam.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const configParamWithIdOnly = await prisma.configParam.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ConfigParamFindManyArgs>(
      args?: SelectSubset<T, ConfigParamFindManyArgs>
    ): CheckSelect<T, Promise<Array<ConfigParam>>, Promise<Array<ConfigParamGetPayload<T>>>>

    /**
     * Create a ConfigParam.
     * @param {ConfigParamCreateArgs} args - Arguments to create a ConfigParam.
     * @example
     * // Create one ConfigParam
     * const ConfigParam = await prisma.configParam.create({
     *   data: {
     *     // ... data to create a ConfigParam
     *   }
     * })
     * 
    **/
    create<T extends ConfigParamCreateArgs>(
      args: SelectSubset<T, ConfigParamCreateArgs>
    ): CheckSelect<T, Prisma__ConfigParamClient<ConfigParam>, Prisma__ConfigParamClient<ConfigParamGetPayload<T>>>

    /**
     * Create many ConfigParams.
     *     @param {ConfigParamCreateManyArgs} args - Arguments to create many ConfigParams.
     *     @example
     *     // Create many ConfigParams
     *     const configParam = await prisma.configParam.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ConfigParamCreateManyArgs>(
      args?: SelectSubset<T, ConfigParamCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a ConfigParam.
     * @param {ConfigParamDeleteArgs} args - Arguments to delete one ConfigParam.
     * @example
     * // Delete one ConfigParam
     * const ConfigParam = await prisma.configParam.delete({
     *   where: {
     *     // ... filter to delete one ConfigParam
     *   }
     * })
     * 
    **/
    delete<T extends ConfigParamDeleteArgs>(
      args: SelectSubset<T, ConfigParamDeleteArgs>
    ): CheckSelect<T, Prisma__ConfigParamClient<ConfigParam>, Prisma__ConfigParamClient<ConfigParamGetPayload<T>>>

    /**
     * Update one ConfigParam.
     * @param {ConfigParamUpdateArgs} args - Arguments to update one ConfigParam.
     * @example
     * // Update one ConfigParam
     * const configParam = await prisma.configParam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ConfigParamUpdateArgs>(
      args: SelectSubset<T, ConfigParamUpdateArgs>
    ): CheckSelect<T, Prisma__ConfigParamClient<ConfigParam>, Prisma__ConfigParamClient<ConfigParamGetPayload<T>>>

    /**
     * Delete zero or more ConfigParams.
     * @param {ConfigParamDeleteManyArgs} args - Arguments to filter ConfigParams to delete.
     * @example
     * // Delete a few ConfigParams
     * const { count } = await prisma.configParam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ConfigParamDeleteManyArgs>(
      args?: SelectSubset<T, ConfigParamDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more ConfigParams.
     * @param {ConfigParamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConfigParams
     * const configParam = await prisma.configParam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ConfigParamUpdateManyArgs>(
      args: SelectSubset<T, ConfigParamUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one ConfigParam.
     * @param {ConfigParamUpsertArgs} args - Arguments to update or create a ConfigParam.
     * @example
     * // Update or create a ConfigParam
     * const configParam = await prisma.configParam.upsert({
     *   create: {
     *     // ... data to create a ConfigParam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConfigParam we want to update
     *   }
     * })
    **/
    upsert<T extends ConfigParamUpsertArgs>(
      args: SelectSubset<T, ConfigParamUpsertArgs>
    ): CheckSelect<T, Prisma__ConfigParamClient<ConfigParam>, Prisma__ConfigParamClient<ConfigParamGetPayload<T>>>

    /**
     * Count the number of ConfigParams.
     * @param {ConfigParamCountArgs} args - Arguments to filter ConfigParams to count.
     * @example
     * // Count the number of ConfigParams
     * const count = await prisma.configParam.count({
     *   where: {
     *     // ... the filter for the ConfigParams we want to count
     *   }
     * })
    **/
    count<T extends ConfigParamCountArgs>(
      args?: Subset<T, ConfigParamCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfigParamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConfigParam.
     * @param {ConfigParamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfigParamAggregateArgs>(args: Subset<T, ConfigParamAggregateArgs>): Promise<GetConfigParamAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for ConfigParam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ConfigParamClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ConfigParam findUnique
   */
  export type ConfigParamFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ConfigParam
    **/
    select?: ConfigParamSelect | null
    /**
     * Throw an Error if a ConfigParam can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ConfigParam to fetch.
    **/
    where: ConfigParamWhereUniqueInput
  }


  /**
   * ConfigParam findFirst
   */
  export type ConfigParamFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ConfigParam
    **/
    select?: ConfigParamSelect | null
    /**
     * Throw an Error if a ConfigParam can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ConfigParam to fetch.
    **/
    where?: ConfigParamWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of ConfigParams to fetch.
    **/
    orderBy?: Enumerable<ConfigParamOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConfigParams.
    **/
    cursor?: ConfigParamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfigParams from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfigParams.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of ConfigParams.
    **/
    distinct?: Enumerable<ConfigParamScalarFieldEnum>
  }


  /**
   * ConfigParam findMany
   */
  export type ConfigParamFindManyArgs = {
    /**
     * Select specific fields to fetch from the ConfigParam
    **/
    select?: ConfigParamSelect | null
    /**
     * Filter, which ConfigParams to fetch.
    **/
    where?: ConfigParamWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of ConfigParams to fetch.
    **/
    orderBy?: Enumerable<ConfigParamOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConfigParams.
    **/
    cursor?: ConfigParamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfigParams from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfigParams.
    **/
    skip?: number
    distinct?: Enumerable<ConfigParamScalarFieldEnum>
  }


  /**
   * ConfigParam create
   */
  export type ConfigParamCreateArgs = {
    /**
     * Select specific fields to fetch from the ConfigParam
    **/
    select?: ConfigParamSelect | null
    /**
     * The data needed to create a ConfigParam.
    **/
    data: XOR<ConfigParamUncheckedCreateInput, ConfigParamCreateInput>
  }


  /**
   * ConfigParam createMany
   */
  export type ConfigParamCreateManyArgs = {
    data: Enumerable<ConfigParamCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ConfigParam update
   */
  export type ConfigParamUpdateArgs = {
    /**
     * Select specific fields to fetch from the ConfigParam
    **/
    select?: ConfigParamSelect | null
    /**
     * The data needed to update a ConfigParam.
    **/
    data: XOR<ConfigParamUncheckedUpdateInput, ConfigParamUpdateInput>
    /**
     * Choose, which ConfigParam to update.
    **/
    where: ConfigParamWhereUniqueInput
  }


  /**
   * ConfigParam updateMany
   */
  export type ConfigParamUpdateManyArgs = {
    data: XOR<ConfigParamUncheckedUpdateManyInput, ConfigParamUpdateManyMutationInput>
    where?: ConfigParamWhereInput
  }


  /**
   * ConfigParam upsert
   */
  export type ConfigParamUpsertArgs = {
    /**
     * Select specific fields to fetch from the ConfigParam
    **/
    select?: ConfigParamSelect | null
    /**
     * The filter to search for the ConfigParam to update in case it exists.
    **/
    where: ConfigParamWhereUniqueInput
    /**
     * In case the ConfigParam found by the `where` argument doesn't exist, create a new ConfigParam with this data.
    **/
    create: XOR<ConfigParamUncheckedCreateInput, ConfigParamCreateInput>
    /**
     * In case the ConfigParam was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<ConfigParamUncheckedUpdateInput, ConfigParamUpdateInput>
  }


  /**
   * ConfigParam delete
   */
  export type ConfigParamDeleteArgs = {
    /**
     * Select specific fields to fetch from the ConfigParam
    **/
    select?: ConfigParamSelect | null
    /**
     * Filter which ConfigParam to delete.
    **/
    where: ConfigParamWhereUniqueInput
  }


  /**
   * ConfigParam deleteMany
   */
  export type ConfigParamDeleteManyArgs = {
    where?: ConfigParamWhereInput
  }


  /**
   * ConfigParam without action
   */
  export type ConfigParamArgs = {
    /**
     * Select specific fields to fetch from the ConfigParam
    **/
    select?: ConfigParamSelect | null
  }



  /**
   * Model Emaildomain
   */


  export type AggregateEmaildomain = {
    count: EmaildomainCountAggregateOutputType | null
    avg: EmaildomainAvgAggregateOutputType | null
    sum: EmaildomainSumAggregateOutputType | null
    min: EmaildomainMinAggregateOutputType | null
    max: EmaildomainMaxAggregateOutputType | null
  }

  export type EmaildomainAvgAggregateOutputType = {
    id: number
  }

  export type EmaildomainSumAggregateOutputType = {
    id: number
  }

  export type EmaildomainMinAggregateOutputType = {
    id: number
    createdAt: Date | null
    updatedAt: Date | null
    domain: string | null
    allowed: boolean | null
  }

  export type EmaildomainMaxAggregateOutputType = {
    id: number
    createdAt: Date | null
    updatedAt: Date | null
    domain: string | null
    allowed: boolean | null
  }

  export type EmaildomainCountAggregateOutputType = {
    id: number
    createdAt: number | null
    updatedAt: number | null
    domain: number | null
    allowed: number | null
    _all: number
  }


  export type EmaildomainAvgAggregateInputType = {
    id?: true
  }

  export type EmaildomainSumAggregateInputType = {
    id?: true
  }

  export type EmaildomainMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    domain?: true
    allowed?: true
  }

  export type EmaildomainMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    domain?: true
    allowed?: true
  }

  export type EmaildomainCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    domain?: true
    allowed?: true
    _all?: true
  }

  export type EmaildomainAggregateArgs = {
    /**
     * Filter which Emaildomain to aggregate.
    **/
    where?: EmaildomainWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Emaildomains to fetch.
    **/
    orderBy?: Enumerable<EmaildomainOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: EmaildomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emaildomains from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emaildomains.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Emaildomains
    **/
    count?: true | EmaildomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: EmaildomainAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: EmaildomainSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: EmaildomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: EmaildomainMaxAggregateInputType
  }

  export type GetEmaildomainAggregateType<T extends EmaildomainAggregateArgs> = {
    [P in keyof T & keyof AggregateEmaildomain]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmaildomain[P]>
      : GetScalarType<T[P], AggregateEmaildomain[P]>
  }



  export type EmaildomainSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean
    allowed?: boolean
  }

  export type EmaildomainGetPayload<
    S extends boolean | null | undefined | EmaildomainArgs,
    U = keyof S
      > = S extends true
        ? Emaildomain
    : S extends undefined
    ? never
    : S extends EmaildomainArgs | EmaildomainFindManyArgs
    ?'include' extends U
    ? Emaildomain 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Emaildomain ?Emaildomain [P]
  : 
     never
  } 
    : Emaildomain
  : Emaildomain


  type EmaildomainCountArgs = Merge<
    Omit<EmaildomainFindManyArgs, 'select' | 'include'> & {
      select?: EmaildomainCountAggregateInputType | true
    }
  >

  export interface EmaildomainDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Emaildomain that matches the filter.
     * @param {EmaildomainFindUniqueArgs} args - Arguments to find a Emaildomain
     * @example
     * // Get one Emaildomain
     * const emaildomain = await prisma.emaildomain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmaildomainFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EmaildomainFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Emaildomain'> extends True ? CheckSelect<T, Prisma__EmaildomainClient<Emaildomain>, Prisma__EmaildomainClient<EmaildomainGetPayload<T>>> : CheckSelect<T, Prisma__EmaildomainClient<Emaildomain | null >, Prisma__EmaildomainClient<EmaildomainGetPayload<T> | null >>

    /**
     * Find the first Emaildomain that matches the filter.
     * @param {EmaildomainFindFirstArgs} args - Arguments to find a Emaildomain
     * @example
     * // Get one Emaildomain
     * const emaildomain = await prisma.emaildomain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmaildomainFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EmaildomainFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Emaildomain'> extends True ? CheckSelect<T, Prisma__EmaildomainClient<Emaildomain>, Prisma__EmaildomainClient<EmaildomainGetPayload<T>>> : CheckSelect<T, Prisma__EmaildomainClient<Emaildomain | null >, Prisma__EmaildomainClient<EmaildomainGetPayload<T> | null >>

    /**
     * Find zero or more Emaildomains that matches the filter.
     * @param {EmaildomainFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Emaildomains
     * const emaildomains = await prisma.emaildomain.findMany()
     * 
     * // Get first 10 Emaildomains
     * const emaildomains = await prisma.emaildomain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emaildomainWithIdOnly = await prisma.emaildomain.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmaildomainFindManyArgs>(
      args?: SelectSubset<T, EmaildomainFindManyArgs>
    ): CheckSelect<T, Promise<Array<Emaildomain>>, Promise<Array<EmaildomainGetPayload<T>>>>

    /**
     * Create a Emaildomain.
     * @param {EmaildomainCreateArgs} args - Arguments to create a Emaildomain.
     * @example
     * // Create one Emaildomain
     * const Emaildomain = await prisma.emaildomain.create({
     *   data: {
     *     // ... data to create a Emaildomain
     *   }
     * })
     * 
    **/
    create<T extends EmaildomainCreateArgs>(
      args: SelectSubset<T, EmaildomainCreateArgs>
    ): CheckSelect<T, Prisma__EmaildomainClient<Emaildomain>, Prisma__EmaildomainClient<EmaildomainGetPayload<T>>>

    /**
     * Create many Emaildomains.
     *     @param {EmaildomainCreateManyArgs} args - Arguments to create many Emaildomains.
     *     @example
     *     // Create many Emaildomains
     *     const emaildomain = await prisma.emaildomain.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmaildomainCreateManyArgs>(
      args?: SelectSubset<T, EmaildomainCreateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Delete a Emaildomain.
     * @param {EmaildomainDeleteArgs} args - Arguments to delete one Emaildomain.
     * @example
     * // Delete one Emaildomain
     * const Emaildomain = await prisma.emaildomain.delete({
     *   where: {
     *     // ... filter to delete one Emaildomain
     *   }
     * })
     * 
    **/
    delete<T extends EmaildomainDeleteArgs>(
      args: SelectSubset<T, EmaildomainDeleteArgs>
    ): CheckSelect<T, Prisma__EmaildomainClient<Emaildomain>, Prisma__EmaildomainClient<EmaildomainGetPayload<T>>>

    /**
     * Update one Emaildomain.
     * @param {EmaildomainUpdateArgs} args - Arguments to update one Emaildomain.
     * @example
     * // Update one Emaildomain
     * const emaildomain = await prisma.emaildomain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmaildomainUpdateArgs>(
      args: SelectSubset<T, EmaildomainUpdateArgs>
    ): CheckSelect<T, Prisma__EmaildomainClient<Emaildomain>, Prisma__EmaildomainClient<EmaildomainGetPayload<T>>>

    /**
     * Delete zero or more Emaildomains.
     * @param {EmaildomainDeleteManyArgs} args - Arguments to filter Emaildomains to delete.
     * @example
     * // Delete a few Emaildomains
     * const { count } = await prisma.emaildomain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmaildomainDeleteManyArgs>(
      args?: SelectSubset<T, EmaildomainDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Emaildomains.
     * @param {EmaildomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Emaildomains
     * const emaildomain = await prisma.emaildomain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmaildomainUpdateManyArgs>(
      args: SelectSubset<T, EmaildomainUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Emaildomain.
     * @param {EmaildomainUpsertArgs} args - Arguments to update or create a Emaildomain.
     * @example
     * // Update or create a Emaildomain
     * const emaildomain = await prisma.emaildomain.upsert({
     *   create: {
     *     // ... data to create a Emaildomain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Emaildomain we want to update
     *   }
     * })
    **/
    upsert<T extends EmaildomainUpsertArgs>(
      args: SelectSubset<T, EmaildomainUpsertArgs>
    ): CheckSelect<T, Prisma__EmaildomainClient<Emaildomain>, Prisma__EmaildomainClient<EmaildomainGetPayload<T>>>

    /**
     * Count the number of Emaildomains.
     * @param {EmaildomainCountArgs} args - Arguments to filter Emaildomains to count.
     * @example
     * // Count the number of Emaildomains
     * const count = await prisma.emaildomain.count({
     *   where: {
     *     // ... the filter for the Emaildomains we want to count
     *   }
     * })
    **/
    count<T extends EmaildomainCountArgs>(
      args?: Subset<T, EmaildomainCountArgs>,
    ): Promise<
      T extends Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmaildomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Emaildomain.
     * @param {EmaildomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmaildomainAggregateArgs>(args: Subset<T, EmaildomainAggregateArgs>): Promise<GetEmaildomainAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Emaildomain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EmaildomainClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Emaildomain findUnique
   */
  export type EmaildomainFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Emaildomain
    **/
    select?: EmaildomainSelect | null
    /**
     * Throw an Error if a Emaildomain can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Emaildomain to fetch.
    **/
    where: EmaildomainWhereUniqueInput
  }


  /**
   * Emaildomain findFirst
   */
  export type EmaildomainFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Emaildomain
    **/
    select?: EmaildomainSelect | null
    /**
     * Throw an Error if a Emaildomain can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Emaildomain to fetch.
    **/
    where?: EmaildomainWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Emaildomains to fetch.
    **/
    orderBy?: Enumerable<EmaildomainOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emaildomains.
    **/
    cursor?: EmaildomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emaildomains from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emaildomains.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Emaildomains.
    **/
    distinct?: Enumerable<EmaildomainScalarFieldEnum>
  }


  /**
   * Emaildomain findMany
   */
  export type EmaildomainFindManyArgs = {
    /**
     * Select specific fields to fetch from the Emaildomain
    **/
    select?: EmaildomainSelect | null
    /**
     * Filter, which Emaildomains to fetch.
    **/
    where?: EmaildomainWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Emaildomains to fetch.
    **/
    orderBy?: Enumerable<EmaildomainOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Emaildomains.
    **/
    cursor?: EmaildomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emaildomains from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emaildomains.
    **/
    skip?: number
    distinct?: Enumerable<EmaildomainScalarFieldEnum>
  }


  /**
   * Emaildomain create
   */
  export type EmaildomainCreateArgs = {
    /**
     * Select specific fields to fetch from the Emaildomain
    **/
    select?: EmaildomainSelect | null
    /**
     * The data needed to create a Emaildomain.
    **/
    data: XOR<EmaildomainUncheckedCreateInput, EmaildomainCreateInput>
  }


  /**
   * Emaildomain createMany
   */
  export type EmaildomainCreateManyArgs = {
    data: Enumerable<EmaildomainCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Emaildomain update
   */
  export type EmaildomainUpdateArgs = {
    /**
     * Select specific fields to fetch from the Emaildomain
    **/
    select?: EmaildomainSelect | null
    /**
     * The data needed to update a Emaildomain.
    **/
    data: XOR<EmaildomainUncheckedUpdateInput, EmaildomainUpdateInput>
    /**
     * Choose, which Emaildomain to update.
    **/
    where: EmaildomainWhereUniqueInput
  }


  /**
   * Emaildomain updateMany
   */
  export type EmaildomainUpdateManyArgs = {
    data: XOR<EmaildomainUncheckedUpdateManyInput, EmaildomainUpdateManyMutationInput>
    where?: EmaildomainWhereInput
  }


  /**
   * Emaildomain upsert
   */
  export type EmaildomainUpsertArgs = {
    /**
     * Select specific fields to fetch from the Emaildomain
    **/
    select?: EmaildomainSelect | null
    /**
     * The filter to search for the Emaildomain to update in case it exists.
    **/
    where: EmaildomainWhereUniqueInput
    /**
     * In case the Emaildomain found by the `where` argument doesn't exist, create a new Emaildomain with this data.
    **/
    create: XOR<EmaildomainUncheckedCreateInput, EmaildomainCreateInput>
    /**
     * In case the Emaildomain was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<EmaildomainUncheckedUpdateInput, EmaildomainUpdateInput>
  }


  /**
   * Emaildomain delete
   */
  export type EmaildomainDeleteArgs = {
    /**
     * Select specific fields to fetch from the Emaildomain
    **/
    select?: EmaildomainSelect | null
    /**
     * Filter which Emaildomain to delete.
    **/
    where: EmaildomainWhereUniqueInput
  }


  /**
   * Emaildomain deleteMany
   */
  export type EmaildomainDeleteManyArgs = {
    where?: EmaildomainWhereInput
  }


  /**
   * Emaildomain without action
   */
  export type EmaildomainArgs = {
    /**
     * Select specific fields to fetch from the Emaildomain
    **/
    select?: EmaildomainSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
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
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    type: 'type',
    emailToken: 'emailToken',
    valid: 'valid',
    expiration: 'expiration',
    userId: 'userId'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    orderProfile: 'orderProfile',
    bio: 'bio',
    isDeleted: 'isDeleted'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    orderGroup: 'orderGroup',
    name: 'name',
    isDeleted: 'isDeleted'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const TodoScalarFieldEnum: {
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
  };

  export type TodoScalarFieldEnum = (typeof TodoScalarFieldEnum)[keyof typeof TodoScalarFieldEnum]


  export const UserTodoLinkScalarFieldEnum: {
    userId: 'userId',
    todoId: 'todoId',
    isAuthor: 'isAuthor',
    isAssigned: 'isAssigned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserTodoLinkScalarFieldEnum = (typeof UserTodoLinkScalarFieldEnum)[keyof typeof UserTodoLinkScalarFieldEnum]


  export const FileScalarFieldEnum: {
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
  };

  export type FileScalarFieldEnum = (typeof FileScalarFieldEnum)[keyof typeof FileScalarFieldEnum]


  export const ChangesTrackingScalarFieldEnum: {
    id: 'id',
    doneAt: 'doneAt',
    authorId: 'authorId',
    modelName: 'modelName',
    recordId: 'recordId',
    operation: 'operation',
    newData: 'newData',
    oldData: 'oldData'
  };

  export type ChangesTrackingScalarFieldEnum = (typeof ChangesTrackingScalarFieldEnum)[keyof typeof ChangesTrackingScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    orderPost: 'orderPost',
    published: 'published',
    title: 'title',
    content: 'content',
    authorId: 'authorId',
    isDeleted: 'isDeleted'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    orderCategory: 'orderCategory',
    name: 'name',
    isDeleted: 'isDeleted'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isDeleted: 'isDeleted',
    orderComment: 'orderComment',
    published: 'published',
    content: 'content',
    postId: 'postId',
    authorId: 'authorId'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const ConfigParamScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    value: 'value',
    utility: 'utility'
  };

  export type ConfigParamScalarFieldEnum = (typeof ConfigParamScalarFieldEnum)[keyof typeof ConfigParamScalarFieldEnum]


  export const EmaildomainScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    domain: 'domain',
    allowed: 'allowed'
  };

  export type EmaildomainScalarFieldEnum = (typeof EmaildomainScalarFieldEnum)[keyof typeof EmaildomainScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    numSeq?: IntFilter | number
    email?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    lastName?: StringNullableFilter | string | null
    firstName?: StringNullableFilter | string | null
    title?: StringNullableFilter | string | null
    Roles?: EnumRoleNullableListFilter
    nickName?: StringNullableFilter | string | null
    Gender?: EnumGenderNullableFilter | Gender | null
    pwdHash?: StringNullableFilter | string | null
    salt?: StringNullableFilter | string | null
    social?: JsonNullableFilter
    language?: StringNullableFilter | string | null
    dob?: DateTimeNullableFilter | Date | string | null
    address?: JsonNullableFilter
    isValidated?: DateTimeNullableFilter | Date | string | null
    isSuspended?: DateTimeNullableFilter | Date | string | null
    isDeleted?: DateTimeNullableFilter | Date | string | null
    isAdmin?: BoolNullableFilter | boolean | null
    manager?: XOR<UserWhereInput, UserRelationFilter> | null
    managerId?: StringNullableFilter | string | null
    Team?: UserListRelationFilter
    Profile?: ProfileListRelationFilter
    Group?: GroupListRelationFilter
    Post?: PostListRelationFilter
    Comment?: CommentListRelationFilter
    Todo?: TodoListRelationFilter
    UserTodoLink?: UserTodoLinkListRelationFilter
    ChangesLog?: ChangesTrackingListRelationFilter
    Token?: TokenListRelationFilter
  }

  export type UserOrderByInput = {
    id?: SortOrder
    numSeq?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    title?: SortOrder
    Roles?: SortOrder
    nickName?: SortOrder
    Gender?: SortOrder
    pwdHash?: SortOrder
    salt?: SortOrder
    social?: SortOrder
    language?: SortOrder
    dob?: SortOrder
    address?: SortOrder
    isValidated?: SortOrder
    isSuspended?: SortOrder
    isDeleted?: SortOrder
    isAdmin?: SortOrder
    manager?: UserOrderByInput
    managerId?: SortOrder
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type TokenWhereInput = {
    AND?: Enumerable<TokenWhereInput>
    OR?: Enumerable<TokenWhereInput>
    NOT?: Enumerable<TokenWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    type?: EnumTokenTypeFilter | TokenType
    emailToken?: StringNullableFilter | string | null
    valid?: BoolFilter | boolean
    expiration?: DateTimeFilter | Date | string
    user?: XOR<UserWhereInput, UserRelationFilter>
    userId?: StringFilter | string
  }

  export type TokenOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    emailToken?: SortOrder
    valid?: SortOrder
    expiration?: SortOrder
    user?: UserOrderByInput
    userId?: SortOrder
  }

  export type TokenWhereUniqueInput = {
    id?: number
    emailToken?: string
  }

  export type ProfileWhereInput = {
    AND?: Enumerable<ProfileWhereInput>
    OR?: Enumerable<ProfileWhereInput>
    NOT?: Enumerable<ProfileWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    orderProfile?: IntFilter | number
    User?: UserListRelationFilter
    bio?: StringFilter | string
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type ProfileOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orderProfile?: SortOrder
    bio?: SortOrder
    isDeleted?: SortOrder
  }

  export type ProfileWhereUniqueInput = {
    id?: string
  }

  export type GroupWhereInput = {
    AND?: Enumerable<GroupWhereInput>
    OR?: Enumerable<GroupWhereInput>
    NOT?: Enumerable<GroupWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    orderGroup?: IntFilter | number
    name?: StringFilter | string
    User?: UserListRelationFilter
    Todo?: TodoListRelationFilter
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type GroupOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orderGroup?: SortOrder
    name?: SortOrder
    isDeleted?: SortOrder
  }

  export type GroupWhereUniqueInput = {
    id?: string
  }

  export type TodoWhereInput = {
    AND?: Enumerable<TodoWhereInput>
    OR?: Enumerable<TodoWhereInput>
    NOT?: Enumerable<TodoWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    orderTodo?: IntFilter | number
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    state?: EnumTodoStateFilter | TodoState
    published?: BoolFilter | boolean
    public?: BoolFilter | boolean
    mainTodo?: XOR<TodoWhereInput, TodoRelationFilter> | null
    mainTodoId?: StringNullableFilter | string | null
    SubTodo?: TodoListRelationFilter
    User?: UserListRelationFilter
    Group?: GroupListRelationFilter
    UserTodoLink?: UserTodoLinkListRelationFilter
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type TodoOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orderTodo?: SortOrder
    title?: SortOrder
    content?: SortOrder
    state?: SortOrder
    published?: SortOrder
    public?: SortOrder
    mainTodo?: TodoOrderByInput
    mainTodoId?: SortOrder
    isDeleted?: SortOrder
  }

  export type TodoWhereUniqueInput = {
    id?: string
  }

  export type UserTodoLinkWhereInput = {
    AND?: Enumerable<UserTodoLinkWhereInput>
    OR?: Enumerable<UserTodoLinkWhereInput>
    NOT?: Enumerable<UserTodoLinkWhereInput>
    userId?: StringFilter | string
    user?: XOR<UserWhereInput, UserRelationFilter>
    todoId?: StringFilter | string
    todo?: XOR<TodoWhereInput, TodoRelationFilter>
    isAuthor?: BoolFilter | boolean
    isAssigned?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserTodoLinkOrderByInput = {
    userId?: SortOrder
    user?: UserOrderByInput
    todoId?: SortOrder
    todo?: TodoOrderByInput
    isAuthor?: SortOrder
    isAssigned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserTodoLinkWhereUniqueInput = {
    userId_todoId?: UserTodoLinkUserIdTodoIdCompoundUniqueInput
  }

  export type FileWhereInput = {
    AND?: Enumerable<FileWhereInput>
    OR?: Enumerable<FileWhereInput>
    NOT?: Enumerable<FileWhereInput>
    id?: StringFilter | string
    numSeq?: IntFilter | number
    name?: StringFilter | string
    storageName?: StringFilter | string
    type?: StringNullableFilter | string | null
    data?: StringNullableFilter | string | null
    owner?: StringNullableFilter | string | null
    size?: IntNullableFilter | number | null
    isDeleted?: DateTimeNullableFilter | Date | string | null
    isArchived?: DateTimeNullableFilter | Date | string | null
  }

  export type FileOrderByInput = {
    id?: SortOrder
    numSeq?: SortOrder
    name?: SortOrder
    storageName?: SortOrder
    type?: SortOrder
    data?: SortOrder
    owner?: SortOrder
    size?: SortOrder
    isDeleted?: SortOrder
    isArchived?: SortOrder
  }

  export type FileWhereUniqueInput = {
    id?: string
    storageName?: string
  }

  export type ChangesTrackingWhereInput = {
    AND?: Enumerable<ChangesTrackingWhereInput>
    OR?: Enumerable<ChangesTrackingWhereInput>
    NOT?: Enumerable<ChangesTrackingWhereInput>
    id?: IntFilter | number
    doneAt?: DateTimeFilter | Date | string
    modifiedBy?: XOR<UserWhereInput, UserRelationFilter>
    authorId?: StringFilter | string
    modelName?: StringFilter | string
    recordId?: StringFilter | string
    operation?: StringFilter | string
    newData?: JsonFilter
    oldData?: JsonFilter
  }

  export type ChangesTrackingOrderByInput = {
    id?: SortOrder
    doneAt?: SortOrder
    modifiedBy?: UserOrderByInput
    authorId?: SortOrder
    modelName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    newData?: SortOrder
    oldData?: SortOrder
  }

  export type ChangesTrackingWhereUniqueInput = {
    id?: number
  }

  export type PostWhereInput = {
    AND?: Enumerable<PostWhereInput>
    OR?: Enumerable<PostWhereInput>
    NOT?: Enumerable<PostWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    orderPost?: IntNullableFilter | number | null
    published?: BoolFilter | boolean
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    author?: XOR<UserWhereInput, UserRelationFilter>
    authorId?: StringFilter | string
    Category?: CategoryListRelationFilter
    Comment?: CommentListRelationFilter
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type PostOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orderPost?: SortOrder
    published?: SortOrder
    title?: SortOrder
    content?: SortOrder
    author?: UserOrderByInput
    authorId?: SortOrder
    isDeleted?: SortOrder
  }

  export type PostWhereUniqueInput = {
    id?: string
  }

  export type CategoryWhereInput = {
    AND?: Enumerable<CategoryWhereInput>
    OR?: Enumerable<CategoryWhereInput>
    NOT?: Enumerable<CategoryWhereInput>
    id?: StringFilter | string
    orderCategory?: IntFilter | number
    name?: StringFilter | string
    Post?: PostListRelationFilter
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type CategoryOrderByInput = {
    id?: SortOrder
    orderCategory?: SortOrder
    name?: SortOrder
    isDeleted?: SortOrder
  }

  export type CategoryWhereUniqueInput = {
    id?: string
  }

  export type CommentWhereInput = {
    AND?: Enumerable<CommentWhereInput>
    OR?: Enumerable<CommentWhereInput>
    NOT?: Enumerable<CommentWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    isDeleted?: DateTimeNullableFilter | Date | string | null
    orderComment?: IntFilter | number
    published?: BoolFilter | boolean
    content?: StringNullableFilter | string | null
    post?: XOR<PostWhereInput, PostRelationFilter>
    postId?: StringFilter | string
    author?: XOR<UserWhereInput, UserRelationFilter>
    authorId?: StringFilter | string
  }

  export type CommentOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isDeleted?: SortOrder
    orderComment?: SortOrder
    published?: SortOrder
    content?: SortOrder
    post?: PostOrderByInput
    postId?: SortOrder
    author?: UserOrderByInput
    authorId?: SortOrder
  }

  export type CommentWhereUniqueInput = {
    id?: string
  }

  export type ConfigParamWhereInput = {
    AND?: Enumerable<ConfigParamWhereInput>
    OR?: Enumerable<ConfigParamWhereInput>
    NOT?: Enumerable<ConfigParamWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    value?: StringFilter | string
    utility?: StringFilter | string
  }

  export type ConfigParamOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    value?: SortOrder
    utility?: SortOrder
  }

  export type ConfigParamWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type EmaildomainWhereInput = {
    AND?: Enumerable<EmaildomainWhereInput>
    OR?: Enumerable<EmaildomainWhereInput>
    NOT?: Enumerable<EmaildomainWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    domain?: StringFilter | string
    allowed?: BoolFilter | boolean
  }

  export type EmaildomainOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domain?: SortOrder
    allowed?: SortOrder
  }

  export type EmaildomainWhereUniqueInput = {
    id?: number
    domain?: string
  }

  export type UserCreateInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Team?: UserCreateNestedManyWithoutManagerInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Team?: UserUpdateManyWithoutManagerInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Group?: GroupUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type UserCreateManyInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateManyRolesInput | Enumerable<Role>
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
  }

  export type TokenCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    type: TokenType
    emailToken?: string | null
    valid?: boolean
    expiration: Date | string
    user: UserCreateNestedOneWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: TokenType
    emailToken?: string | null
    valid?: boolean
    expiration: Date | string
    userId: string
  }

  export type TokenUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    emailToken?: NullableStringFieldUpdateOperationsInput | string | null
    valid?: BoolFieldUpdateOperationsInput | boolean
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTokenInput
  }

  export type TokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    emailToken?: NullableStringFieldUpdateOperationsInput | string | null
    valid?: BoolFieldUpdateOperationsInput | boolean
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TokenCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: TokenType
    emailToken?: string | null
    valid?: boolean
    expiration: Date | string
    userId: string
  }

  export type TokenUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    emailToken?: NullableStringFieldUpdateOperationsInput | string | null
    valid?: BoolFieldUpdateOperationsInput | boolean
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    emailToken?: NullableStringFieldUpdateOperationsInput | string | null
    valid?: BoolFieldUpdateOperationsInput | boolean
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProfileCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderProfile: number
    bio: string
    isDeleted?: Date | string | null
    User?: UserCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderProfile: number
    bio: string
    isDeleted?: Date | string | null
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderProfile?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    User?: UserUpdateManyWithoutProfileInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderProfile?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfileCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderProfile: number
    bio: string
    isDeleted?: Date | string | null
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderProfile?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderProfile?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GroupCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderGroup: number
    name: string
    isDeleted?: Date | string | null
    User?: UserCreateNestedManyWithoutGroupInput
    Todo?: TodoCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderGroup: number
    name: string
    isDeleted?: Date | string | null
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderGroup?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    User?: UserUpdateManyWithoutGroupInput
    Todo?: TodoUpdateManyWithoutGroupInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderGroup?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GroupCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderGroup: number
    name: string
    isDeleted?: Date | string | null
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderGroup?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderGroup?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TodoCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    isDeleted?: Date | string | null
    mainTodo?: TodoCreateNestedOneWithoutSubTodoInput
    SubTodo?: TodoCreateNestedManyWithoutMainTodoInput
    User?: UserCreateNestedManyWithoutTodoInput
    Group?: GroupCreateNestedManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutTodoInput
  }

  export type TodoUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    mainTodoId?: string | null
    isDeleted?: Date | string | null
    SubTodo?: TodoUncheckedCreateNestedManyWithoutMainTodoInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutTodoInput
  }

  export type TodoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainTodo?: TodoUpdateOneWithoutSubTodoInput
    SubTodo?: TodoUpdateManyWithoutMainTodoInput
    User?: UserUpdateManyWithoutTodoInput
    Group?: GroupUpdateManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutTodoInput
  }

  export type TodoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    mainTodoId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SubTodo?: TodoUncheckedUpdateManyWithoutMainTodoInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutTodoInput
  }

  export type TodoCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    mainTodoId?: string | null
    isDeleted?: Date | string | null
  }

  export type TodoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TodoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    mainTodoId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserTodoLinkCreateInput = {
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserTodoLinkInput
    todo: TodoCreateNestedOneWithoutUserTodoLinkInput
  }

  export type UserTodoLinkUncheckedCreateInput = {
    userId: string
    todoId: string
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTodoLinkUpdateInput = {
    isAuthor?: BoolFieldUpdateOperationsInput | boolean
    isAssigned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserTodoLinkInput
    todo?: TodoUpdateOneRequiredWithoutUserTodoLinkInput
  }

  export type UserTodoLinkUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    todoId?: StringFieldUpdateOperationsInput | string
    isAuthor?: BoolFieldUpdateOperationsInput | boolean
    isAssigned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTodoLinkCreateManyInput = {
    userId: string
    todoId: string
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTodoLinkUpdateManyMutationInput = {
    isAuthor?: BoolFieldUpdateOperationsInput | boolean
    isAssigned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTodoLinkUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    todoId?: StringFieldUpdateOperationsInput | string
    isAuthor?: BoolFieldUpdateOperationsInput | boolean
    isAssigned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileCreateInput = {
    id?: string
    numSeq?: number
    name: string
    storageName: string
    type?: string | null
    data?: string | null
    owner?: string | null
    size?: number | null
    isDeleted?: Date | string | null
    isArchived?: Date | string | null
  }

  export type FileUncheckedCreateInput = {
    id?: string
    numSeq?: number
    name: string
    storageName: string
    type?: string | null
    data?: string | null
    owner?: string | null
    size?: number | null
    isDeleted?: Date | string | null
    isArchived?: Date | string | null
  }

  export type FileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    storageName?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isArchived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    storageName?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isArchived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileCreateManyInput = {
    id?: string
    numSeq?: number
    name: string
    storageName: string
    type?: string | null
    data?: string | null
    owner?: string | null
    size?: number | null
    isDeleted?: Date | string | null
    isArchived?: Date | string | null
  }

  export type FileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    storageName?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isArchived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    storageName?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isArchived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChangesTrackingCreateInput = {
    doneAt?: Date | string
    modelName: string
    recordId: string
    operation: string
    newData: InputJsonValue
    oldData: InputJsonValue
    modifiedBy: UserCreateNestedOneWithoutChangesLogInput
  }

  export type ChangesTrackingUncheckedCreateInput = {
    id?: number
    doneAt?: Date | string
    authorId: string
    modelName: string
    recordId: string
    operation: string
    newData: InputJsonValue
    oldData: InputJsonValue
  }

  export type ChangesTrackingUpdateInput = {
    doneAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    newData?: InputJsonValue
    oldData?: InputJsonValue
    modifiedBy?: UserUpdateOneRequiredWithoutChangesLogInput
  }

  export type ChangesTrackingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    doneAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    newData?: InputJsonValue
    oldData?: InputJsonValue
  }

  export type ChangesTrackingCreateManyInput = {
    id?: number
    doneAt?: Date | string
    authorId: string
    modelName: string
    recordId: string
    operation: string
    newData: InputJsonValue
    oldData: InputJsonValue
  }

  export type ChangesTrackingUpdateManyMutationInput = {
    doneAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    newData?: InputJsonValue
    oldData?: InputJsonValue
  }

  export type ChangesTrackingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    doneAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    newData?: InputJsonValue
    oldData?: InputJsonValue
  }

  export type PostCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    isDeleted?: Date | string | null
    author: UserCreateNestedOneWithoutPostInput
    Category?: CategoryCreateNestedManyWithoutPostInput
    Comment?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    authorId: string
    isDeleted?: Date | string | null
    Comment?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutPostInput
    Category?: CategoryUpdateManyWithoutPostInput
    Comment?: CommentUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Comment?: CommentUncheckedUpdateManyWithoutPostInput
  }

  export type PostCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    authorId: string
    isDeleted?: Date | string | null
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryCreateInput = {
    id?: string
    orderCategory: number
    name: string
    isDeleted?: Date | string | null
    Post?: PostCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    orderCategory: number
    name: string
    isDeleted?: Date | string | null
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderCategory?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Post?: PostUpdateManyWithoutCategoryInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderCategory?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryCreateManyInput = {
    id?: string
    orderCategory: number
    name: string
    isDeleted?: Date | string | null
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderCategory?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderCategory?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: Date | string | null
    orderComment: number
    published?: boolean
    content?: string | null
    post: PostCreateNestedOneWithoutCommentInput
    author: UserCreateNestedOneWithoutCommentInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: Date | string | null
    orderComment: number
    published?: boolean
    content?: string | null
    postId: string
    authorId: string
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderComment?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    content?: NullableStringFieldUpdateOperationsInput | string | null
    post?: PostUpdateOneRequiredWithoutCommentInput
    author?: UserUpdateOneRequiredWithoutCommentInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderComment?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: Date | string | null
    orderComment: number
    published?: boolean
    content?: string | null
    postId: string
    authorId: string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderComment?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderComment?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigParamCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    value: string
    utility: string
  }

  export type ConfigParamUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    value: string
    utility: string
  }

  export type ConfigParamUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    utility?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigParamUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    utility?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigParamCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    value: string
    utility: string
  }

  export type ConfigParamUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    utility?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigParamUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    utility?: StringFieldUpdateOperationsInput | string
  }

  export type EmaildomainCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: string
    allowed: boolean
  }

  export type EmaildomainUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: string
    allowed: boolean
  }

  export type EmaildomainUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: StringFieldUpdateOperationsInput | string
    allowed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmaildomainUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: StringFieldUpdateOperationsInput | string
    allowed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmaildomainCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: string
    allowed: boolean
  }

  export type EmaildomainUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: StringFieldUpdateOperationsInput | string
    allowed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmaildomainUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: StringFieldUpdateOperationsInput | string
    allowed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type EnumRoleNullableListFilter = {
    equals?: Enumerable<Role> | null
    has?: Role | null
    hasEvery?: Enumerable<Role>
    hasSome?: Enumerable<Role>
    isEmpty?: boolean
  }

  export type EnumGenderNullableFilter = {
    equals?: Gender | null
    in?: Enumerable<Gender> | null
    notIn?: Enumerable<Gender> | null
    not?: NestedEnumGenderNullableFilter | Gender | null
  }

  export type JsonNullableFilter = {
    equals?: InputJsonValue | null
    not?: InputJsonValue | null
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type ProfileListRelationFilter = {
    every?: ProfileWhereInput
    some?: ProfileWhereInput
    none?: ProfileWhereInput
  }

  export type GroupListRelationFilter = {
    every?: GroupWhereInput
    some?: GroupWhereInput
    none?: GroupWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type TodoListRelationFilter = {
    every?: TodoWhereInput
    some?: TodoWhereInput
    none?: TodoWhereInput
  }

  export type UserTodoLinkListRelationFilter = {
    every?: UserTodoLinkWhereInput
    some?: UserTodoLinkWhereInput
    none?: UserTodoLinkWhereInput
  }

  export type ChangesTrackingListRelationFilter = {
    every?: ChangesTrackingWhereInput
    some?: ChangesTrackingWhereInput
    none?: ChangesTrackingWhereInput
  }

  export type TokenListRelationFilter = {
    every?: TokenWhereInput
    some?: TokenWhereInput
    none?: TokenWhereInput
  }

  export type EnumTokenTypeFilter = {
    equals?: TokenType
    in?: Enumerable<TokenType>
    notIn?: Enumerable<TokenType>
    not?: NestedEnumTokenTypeFilter | TokenType
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type EnumTodoStateFilter = {
    equals?: TodoState
    in?: Enumerable<TodoState>
    notIn?: Enumerable<TodoState>
    not?: NestedEnumTodoStateFilter | TodoState
  }

  export type TodoRelationFilter = {
    is?: TodoWhereInput | null
    isNot?: TodoWhereInput | null
  }

  export type UserTodoLinkUserIdTodoIdCompoundUniqueInput = {
    userId: string
    todoId: string
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type JsonFilter = {
    equals?: InputJsonValue
    not?: InputJsonValue
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type PostRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type UserCreateRolesInput = {
    set: Enumerable<Role>
  }

  export type UserCreateNestedOneWithoutTeamInput = {
    create?: XOR<UserUncheckedCreateWithoutTeamInput, UserCreateWithoutTeamInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutManagerInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutManagerInput>, Enumerable<UserCreateWithoutManagerInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutmanagerInput>
    createMany?: UserCreateManyManagerInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type ProfileCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ProfileUncheckedCreateWithoutUserInput>, Enumerable<ProfileCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProfileCreateOrConnectWithoutUserInput>
    connect?: Enumerable<ProfileWhereUniqueInput>
  }

  export type GroupCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<GroupUncheckedCreateWithoutUserInput>, Enumerable<GroupCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<GroupCreateOrConnectWithoutUserInput>
    connect?: Enumerable<GroupWhereUniqueInput>
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostUncheckedCreateWithoutAuthorInput>, Enumerable<PostCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutauthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type CommentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentUncheckedCreateWithoutAuthorInput>, Enumerable<CommentCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutauthorInput>
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type TodoCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TodoUncheckedCreateWithoutUserInput>, Enumerable<TodoCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TodoCreateOrConnectWithoutUserInput>
    connect?: Enumerable<TodoWhereUniqueInput>
  }

  export type UserTodoLinkCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserTodoLinkUncheckedCreateWithoutUserInput>, Enumerable<UserTodoLinkCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserTodoLinkCreateOrConnectWithoutuserInput>
    createMany?: UserTodoLinkCreateManyUserInputEnvelope
    connect?: Enumerable<UserTodoLinkWhereUniqueInput>
  }

  export type ChangesTrackingCreateNestedManyWithoutModifiedByInput = {
    create?: XOR<Enumerable<ChangesTrackingUncheckedCreateWithoutModifiedByInput>, Enumerable<ChangesTrackingCreateWithoutModifiedByInput>>
    connectOrCreate?: Enumerable<ChangesTrackingCreateOrConnectWithoutmodifiedByInput>
    createMany?: ChangesTrackingCreateManyModifiedByInputEnvelope
    connect?: Enumerable<ChangesTrackingWhereUniqueInput>
  }

  export type TokenCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenUncheckedCreateWithoutUserInput>, Enumerable<TokenCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutuserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type UserUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutManagerInput>, Enumerable<UserCreateWithoutManagerInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutmanagerInput>
    createMany?: UserCreateManyManagerInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostUncheckedCreateWithoutAuthorInput>, Enumerable<PostCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutauthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentUncheckedCreateWithoutAuthorInput>, Enumerable<CommentCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutauthorInput>
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type UserTodoLinkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserTodoLinkUncheckedCreateWithoutUserInput>, Enumerable<UserTodoLinkCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserTodoLinkCreateOrConnectWithoutuserInput>
    createMany?: UserTodoLinkCreateManyUserInputEnvelope
    connect?: Enumerable<UserTodoLinkWhereUniqueInput>
  }

  export type ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput = {
    create?: XOR<Enumerable<ChangesTrackingUncheckedCreateWithoutModifiedByInput>, Enumerable<ChangesTrackingCreateWithoutModifiedByInput>>
    connectOrCreate?: Enumerable<ChangesTrackingCreateOrConnectWithoutmodifiedByInput>
    createMany?: ChangesTrackingCreateManyModifiedByInputEnvelope
    connect?: Enumerable<ChangesTrackingWhereUniqueInput>
  }

  export type TokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenUncheckedCreateWithoutUserInput>, Enumerable<TokenCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutuserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: Gender | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserUpdateRolesInput = {
    set: Enumerable<Role>
  }

  export type UserUpdateOneWithoutTeamInput = {
    create?: XOR<UserUncheckedCreateWithoutTeamInput, UserCreateWithoutTeamInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamInput
    upsert?: UserUpsertWithoutTeamInput
    connect?: UserWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<UserUncheckedUpdateWithoutTeamInput, UserUpdateWithoutTeamInput>
  }

  export type UserUpdateManyWithoutManagerInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutManagerInput>, Enumerable<UserCreateWithoutManagerInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutmanagerInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutManagerInput>
    createMany?: UserCreateManyManagerInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutManagerInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutManagerInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type ProfileUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<ProfileUncheckedCreateWithoutUserInput>, Enumerable<ProfileCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProfileCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ProfileUpsertWithWhereUniqueWithoutUserInput>
    connect?: Enumerable<ProfileWhereUniqueInput>
    set?: Enumerable<ProfileWhereUniqueInput>
    disconnect?: Enumerable<ProfileWhereUniqueInput>
    delete?: Enumerable<ProfileWhereUniqueInput>
    update?: Enumerable<ProfileUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ProfileUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ProfileScalarWhereInput>
  }

  export type GroupUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<GroupUncheckedCreateWithoutUserInput>, Enumerable<GroupCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<GroupCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<GroupUpsertWithWhereUniqueWithoutUserInput>
    connect?: Enumerable<GroupWhereUniqueInput>
    set?: Enumerable<GroupWhereUniqueInput>
    disconnect?: Enumerable<GroupWhereUniqueInput>
    delete?: Enumerable<GroupWhereUniqueInput>
    update?: Enumerable<GroupUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<GroupUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<GroupScalarWhereInput>
  }

  export type PostUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostUncheckedCreateWithoutAuthorInput>, Enumerable<PostCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutauthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type CommentUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentUncheckedCreateWithoutAuthorInput>, Enumerable<CommentCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutauthorInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type TodoUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<TodoUncheckedCreateWithoutUserInput>, Enumerable<TodoCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TodoCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TodoUpsertWithWhereUniqueWithoutUserInput>
    connect?: Enumerable<TodoWhereUniqueInput>
    set?: Enumerable<TodoWhereUniqueInput>
    disconnect?: Enumerable<TodoWhereUniqueInput>
    delete?: Enumerable<TodoWhereUniqueInput>
    update?: Enumerable<TodoUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TodoUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TodoScalarWhereInput>
  }

  export type UserTodoLinkUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<UserTodoLinkUncheckedCreateWithoutUserInput>, Enumerable<UserTodoLinkCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserTodoLinkCreateOrConnectWithoutuserInput>
    upsert?: Enumerable<UserTodoLinkUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserTodoLinkCreateManyUserInputEnvelope
    connect?: Enumerable<UserTodoLinkWhereUniqueInput>
    set?: Enumerable<UserTodoLinkWhereUniqueInput>
    disconnect?: Enumerable<UserTodoLinkWhereUniqueInput>
    delete?: Enumerable<UserTodoLinkWhereUniqueInput>
    update?: Enumerable<UserTodoLinkUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserTodoLinkUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserTodoLinkScalarWhereInput>
  }

  export type ChangesTrackingUpdateManyWithoutModifiedByInput = {
    create?: XOR<Enumerable<ChangesTrackingUncheckedCreateWithoutModifiedByInput>, Enumerable<ChangesTrackingCreateWithoutModifiedByInput>>
    connectOrCreate?: Enumerable<ChangesTrackingCreateOrConnectWithoutmodifiedByInput>
    upsert?: Enumerable<ChangesTrackingUpsertWithWhereUniqueWithoutModifiedByInput>
    createMany?: ChangesTrackingCreateManyModifiedByInputEnvelope
    connect?: Enumerable<ChangesTrackingWhereUniqueInput>
    set?: Enumerable<ChangesTrackingWhereUniqueInput>
    disconnect?: Enumerable<ChangesTrackingWhereUniqueInput>
    delete?: Enumerable<ChangesTrackingWhereUniqueInput>
    update?: Enumerable<ChangesTrackingUpdateWithWhereUniqueWithoutModifiedByInput>
    updateMany?: Enumerable<ChangesTrackingUpdateManyWithWhereWithoutModifiedByInput>
    deleteMany?: Enumerable<ChangesTrackingScalarWhereInput>
  }

  export type TokenUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenUncheckedCreateWithoutUserInput>, Enumerable<TokenCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutuserInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type UserUncheckedUpdateManyWithoutManagerInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutManagerInput>, Enumerable<UserCreateWithoutManagerInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutmanagerInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutManagerInput>
    createMany?: UserCreateManyManagerInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutManagerInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutManagerInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type PostUncheckedUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostUncheckedCreateWithoutAuthorInput>, Enumerable<PostCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutauthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type CommentUncheckedUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentUncheckedCreateWithoutAuthorInput>, Enumerable<CommentCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutauthorInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type UserTodoLinkUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<UserTodoLinkUncheckedCreateWithoutUserInput>, Enumerable<UserTodoLinkCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserTodoLinkCreateOrConnectWithoutuserInput>
    upsert?: Enumerable<UserTodoLinkUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserTodoLinkCreateManyUserInputEnvelope
    connect?: Enumerable<UserTodoLinkWhereUniqueInput>
    set?: Enumerable<UserTodoLinkWhereUniqueInput>
    disconnect?: Enumerable<UserTodoLinkWhereUniqueInput>
    delete?: Enumerable<UserTodoLinkWhereUniqueInput>
    update?: Enumerable<UserTodoLinkUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserTodoLinkUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserTodoLinkScalarWhereInput>
  }

  export type ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput = {
    create?: XOR<Enumerable<ChangesTrackingUncheckedCreateWithoutModifiedByInput>, Enumerable<ChangesTrackingCreateWithoutModifiedByInput>>
    connectOrCreate?: Enumerable<ChangesTrackingCreateOrConnectWithoutmodifiedByInput>
    upsert?: Enumerable<ChangesTrackingUpsertWithWhereUniqueWithoutModifiedByInput>
    createMany?: ChangesTrackingCreateManyModifiedByInputEnvelope
    connect?: Enumerable<ChangesTrackingWhereUniqueInput>
    set?: Enumerable<ChangesTrackingWhereUniqueInput>
    disconnect?: Enumerable<ChangesTrackingWhereUniqueInput>
    delete?: Enumerable<ChangesTrackingWhereUniqueInput>
    update?: Enumerable<ChangesTrackingUpdateWithWhereUniqueWithoutModifiedByInput>
    updateMany?: Enumerable<ChangesTrackingUpdateManyWithWhereWithoutModifiedByInput>
    deleteMany?: Enumerable<ChangesTrackingScalarWhereInput>
  }

  export type TokenUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenUncheckedCreateWithoutUserInput>, Enumerable<TokenCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutuserInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type UserCreateManyRolesInput = {
    set: Enumerable<Role>
  }

  export type UserCreateNestedOneWithoutTokenInput = {
    create?: XOR<UserUncheckedCreateWithoutTokenInput, UserCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTokenTypeFieldUpdateOperationsInput = {
    set?: TokenType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutTokenInput = {
    create?: XOR<UserUncheckedCreateWithoutTokenInput, UserCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    upsert?: UserUpsertWithoutTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUncheckedUpdateWithoutTokenInput, UserUpdateWithoutTokenInput>
  }

  export type UserCreateNestedManyWithoutProfileInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutProfileInput>, Enumerable<UserCreateWithoutProfileInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutProfileInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type UserUpdateManyWithoutProfileInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutProfileInput>, Enumerable<UserCreateWithoutProfileInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutProfileInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutProfileInput>
    connect?: Enumerable<UserWhereUniqueInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutProfileInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutProfileInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type UserCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutGroupInput>, Enumerable<UserCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type TodoCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<TodoUncheckedCreateWithoutGroupInput>, Enumerable<TodoCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<TodoCreateOrConnectWithoutGroupInput>
    connect?: Enumerable<TodoWhereUniqueInput>
  }

  export type UserUpdateManyWithoutGroupInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutGroupInput>, Enumerable<UserCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutGroupInput>
    connect?: Enumerable<UserWhereUniqueInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type TodoUpdateManyWithoutGroupInput = {
    create?: XOR<Enumerable<TodoUncheckedCreateWithoutGroupInput>, Enumerable<TodoCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<TodoCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<TodoUpsertWithWhereUniqueWithoutGroupInput>
    connect?: Enumerable<TodoWhereUniqueInput>
    set?: Enumerable<TodoWhereUniqueInput>
    disconnect?: Enumerable<TodoWhereUniqueInput>
    delete?: Enumerable<TodoWhereUniqueInput>
    update?: Enumerable<TodoUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<TodoUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<TodoScalarWhereInput>
  }

  export type TodoCreateNestedOneWithoutSubTodoInput = {
    create?: XOR<TodoUncheckedCreateWithoutSubTodoInput, TodoCreateWithoutSubTodoInput>
    connectOrCreate?: TodoCreateOrConnectWithoutSubTodoInput
    connect?: TodoWhereUniqueInput
  }

  export type TodoCreateNestedManyWithoutMainTodoInput = {
    create?: XOR<Enumerable<TodoUncheckedCreateWithoutMainTodoInput>, Enumerable<TodoCreateWithoutMainTodoInput>>
    connectOrCreate?: Enumerable<TodoCreateOrConnectWithoutmainTodoInput>
    createMany?: TodoCreateManyMainTodoInputEnvelope
    connect?: Enumerable<TodoWhereUniqueInput>
  }

  export type UserCreateNestedManyWithoutTodoInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutTodoInput>, Enumerable<UserCreateWithoutTodoInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutTodoInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type GroupCreateNestedManyWithoutTodoInput = {
    create?: XOR<Enumerable<GroupUncheckedCreateWithoutTodoInput>, Enumerable<GroupCreateWithoutTodoInput>>
    connectOrCreate?: Enumerable<GroupCreateOrConnectWithoutTodoInput>
    connect?: Enumerable<GroupWhereUniqueInput>
  }

  export type UserTodoLinkCreateNestedManyWithoutTodoInput = {
    create?: XOR<Enumerable<UserTodoLinkUncheckedCreateWithoutTodoInput>, Enumerable<UserTodoLinkCreateWithoutTodoInput>>
    connectOrCreate?: Enumerable<UserTodoLinkCreateOrConnectWithouttodoInput>
    createMany?: UserTodoLinkCreateManyTodoInputEnvelope
    connect?: Enumerable<UserTodoLinkWhereUniqueInput>
  }

  export type TodoUncheckedCreateNestedManyWithoutMainTodoInput = {
    create?: XOR<Enumerable<TodoUncheckedCreateWithoutMainTodoInput>, Enumerable<TodoCreateWithoutMainTodoInput>>
    connectOrCreate?: Enumerable<TodoCreateOrConnectWithoutmainTodoInput>
    createMany?: TodoCreateManyMainTodoInputEnvelope
    connect?: Enumerable<TodoWhereUniqueInput>
  }

  export type UserTodoLinkUncheckedCreateNestedManyWithoutTodoInput = {
    create?: XOR<Enumerable<UserTodoLinkUncheckedCreateWithoutTodoInput>, Enumerable<UserTodoLinkCreateWithoutTodoInput>>
    connectOrCreate?: Enumerable<UserTodoLinkCreateOrConnectWithouttodoInput>
    createMany?: UserTodoLinkCreateManyTodoInputEnvelope
    connect?: Enumerable<UserTodoLinkWhereUniqueInput>
  }

  export type EnumTodoStateFieldUpdateOperationsInput = {
    set?: TodoState
  }

  export type TodoUpdateOneWithoutSubTodoInput = {
    create?: XOR<TodoUncheckedCreateWithoutSubTodoInput, TodoCreateWithoutSubTodoInput>
    connectOrCreate?: TodoCreateOrConnectWithoutSubTodoInput
    upsert?: TodoUpsertWithoutSubTodoInput
    connect?: TodoWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<TodoUncheckedUpdateWithoutSubTodoInput, TodoUpdateWithoutSubTodoInput>
  }

  export type TodoUpdateManyWithoutMainTodoInput = {
    create?: XOR<Enumerable<TodoUncheckedCreateWithoutMainTodoInput>, Enumerable<TodoCreateWithoutMainTodoInput>>
    connectOrCreate?: Enumerable<TodoCreateOrConnectWithoutmainTodoInput>
    upsert?: Enumerable<TodoUpsertWithWhereUniqueWithoutMainTodoInput>
    createMany?: TodoCreateManyMainTodoInputEnvelope
    connect?: Enumerable<TodoWhereUniqueInput>
    set?: Enumerable<TodoWhereUniqueInput>
    disconnect?: Enumerable<TodoWhereUniqueInput>
    delete?: Enumerable<TodoWhereUniqueInput>
    update?: Enumerable<TodoUpdateWithWhereUniqueWithoutMainTodoInput>
    updateMany?: Enumerable<TodoUpdateManyWithWhereWithoutMainTodoInput>
    deleteMany?: Enumerable<TodoScalarWhereInput>
  }

  export type UserUpdateManyWithoutTodoInput = {
    create?: XOR<Enumerable<UserUncheckedCreateWithoutTodoInput>, Enumerable<UserCreateWithoutTodoInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutTodoInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutTodoInput>
    connect?: Enumerable<UserWhereUniqueInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutTodoInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutTodoInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type GroupUpdateManyWithoutTodoInput = {
    create?: XOR<Enumerable<GroupUncheckedCreateWithoutTodoInput>, Enumerable<GroupCreateWithoutTodoInput>>
    connectOrCreate?: Enumerable<GroupCreateOrConnectWithoutTodoInput>
    upsert?: Enumerable<GroupUpsertWithWhereUniqueWithoutTodoInput>
    connect?: Enumerable<GroupWhereUniqueInput>
    set?: Enumerable<GroupWhereUniqueInput>
    disconnect?: Enumerable<GroupWhereUniqueInput>
    delete?: Enumerable<GroupWhereUniqueInput>
    update?: Enumerable<GroupUpdateWithWhereUniqueWithoutTodoInput>
    updateMany?: Enumerable<GroupUpdateManyWithWhereWithoutTodoInput>
    deleteMany?: Enumerable<GroupScalarWhereInput>
  }

  export type UserTodoLinkUpdateManyWithoutTodoInput = {
    create?: XOR<Enumerable<UserTodoLinkUncheckedCreateWithoutTodoInput>, Enumerable<UserTodoLinkCreateWithoutTodoInput>>
    connectOrCreate?: Enumerable<UserTodoLinkCreateOrConnectWithouttodoInput>
    upsert?: Enumerable<UserTodoLinkUpsertWithWhereUniqueWithoutTodoInput>
    createMany?: UserTodoLinkCreateManyTodoInputEnvelope
    connect?: Enumerable<UserTodoLinkWhereUniqueInput>
    set?: Enumerable<UserTodoLinkWhereUniqueInput>
    disconnect?: Enumerable<UserTodoLinkWhereUniqueInput>
    delete?: Enumerable<UserTodoLinkWhereUniqueInput>
    update?: Enumerable<UserTodoLinkUpdateWithWhereUniqueWithoutTodoInput>
    updateMany?: Enumerable<UserTodoLinkUpdateManyWithWhereWithoutTodoInput>
    deleteMany?: Enumerable<UserTodoLinkScalarWhereInput>
  }

  export type TodoUncheckedUpdateManyWithoutMainTodoInput = {
    create?: XOR<Enumerable<TodoUncheckedCreateWithoutMainTodoInput>, Enumerable<TodoCreateWithoutMainTodoInput>>
    connectOrCreate?: Enumerable<TodoCreateOrConnectWithoutmainTodoInput>
    upsert?: Enumerable<TodoUpsertWithWhereUniqueWithoutMainTodoInput>
    createMany?: TodoCreateManyMainTodoInputEnvelope
    connect?: Enumerable<TodoWhereUniqueInput>
    set?: Enumerable<TodoWhereUniqueInput>
    disconnect?: Enumerable<TodoWhereUniqueInput>
    delete?: Enumerable<TodoWhereUniqueInput>
    update?: Enumerable<TodoUpdateWithWhereUniqueWithoutMainTodoInput>
    updateMany?: Enumerable<TodoUpdateManyWithWhereWithoutMainTodoInput>
    deleteMany?: Enumerable<TodoScalarWhereInput>
  }

  export type UserTodoLinkUncheckedUpdateManyWithoutTodoInput = {
    create?: XOR<Enumerable<UserTodoLinkUncheckedCreateWithoutTodoInput>, Enumerable<UserTodoLinkCreateWithoutTodoInput>>
    connectOrCreate?: Enumerable<UserTodoLinkCreateOrConnectWithouttodoInput>
    upsert?: Enumerable<UserTodoLinkUpsertWithWhereUniqueWithoutTodoInput>
    createMany?: UserTodoLinkCreateManyTodoInputEnvelope
    connect?: Enumerable<UserTodoLinkWhereUniqueInput>
    set?: Enumerable<UserTodoLinkWhereUniqueInput>
    disconnect?: Enumerable<UserTodoLinkWhereUniqueInput>
    delete?: Enumerable<UserTodoLinkWhereUniqueInput>
    update?: Enumerable<UserTodoLinkUpdateWithWhereUniqueWithoutTodoInput>
    updateMany?: Enumerable<UserTodoLinkUpdateManyWithWhereWithoutTodoInput>
    deleteMany?: Enumerable<UserTodoLinkScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutUserTodoLinkInput = {
    create?: XOR<UserUncheckedCreateWithoutUserTodoLinkInput, UserCreateWithoutUserTodoLinkInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserTodoLinkInput
    connect?: UserWhereUniqueInput
  }

  export type TodoCreateNestedOneWithoutUserTodoLinkInput = {
    create?: XOR<TodoUncheckedCreateWithoutUserTodoLinkInput, TodoCreateWithoutUserTodoLinkInput>
    connectOrCreate?: TodoCreateOrConnectWithoutUserTodoLinkInput
    connect?: TodoWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserTodoLinkInput = {
    create?: XOR<UserUncheckedCreateWithoutUserTodoLinkInput, UserCreateWithoutUserTodoLinkInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserTodoLinkInput
    upsert?: UserUpsertWithoutUserTodoLinkInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUncheckedUpdateWithoutUserTodoLinkInput, UserUpdateWithoutUserTodoLinkInput>
  }

  export type TodoUpdateOneRequiredWithoutUserTodoLinkInput = {
    create?: XOR<TodoUncheckedCreateWithoutUserTodoLinkInput, TodoCreateWithoutUserTodoLinkInput>
    connectOrCreate?: TodoCreateOrConnectWithoutUserTodoLinkInput
    upsert?: TodoUpsertWithoutUserTodoLinkInput
    connect?: TodoWhereUniqueInput
    update?: XOR<TodoUncheckedUpdateWithoutUserTodoLinkInput, TodoUpdateWithoutUserTodoLinkInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutChangesLogInput = {
    create?: XOR<UserUncheckedCreateWithoutChangesLogInput, UserCreateWithoutChangesLogInput>
    connectOrCreate?: UserCreateOrConnectWithoutChangesLogInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutChangesLogInput = {
    create?: XOR<UserUncheckedCreateWithoutChangesLogInput, UserCreateWithoutChangesLogInput>
    connectOrCreate?: UserCreateOrConnectWithoutChangesLogInput
    upsert?: UserUpsertWithoutChangesLogInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUncheckedUpdateWithoutChangesLogInput, UserUpdateWithoutChangesLogInput>
  }

  export type UserCreateNestedOneWithoutPostInput = {
    create?: XOR<UserUncheckedCreateWithoutPostInput, UserCreateWithoutPostInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostInput
    connect?: UserWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<CategoryUncheckedCreateWithoutPostInput>, Enumerable<CategoryCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CategoryCreateOrConnectWithoutPostInput>
    connect?: Enumerable<CategoryWhereUniqueInput>
  }

  export type CommentCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentUncheckedCreateWithoutPostInput>, Enumerable<CommentCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutpostInput>
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type CommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentUncheckedCreateWithoutPostInput>, Enumerable<CommentCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutpostInput>
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutPostInput = {
    create?: XOR<UserUncheckedCreateWithoutPostInput, UserCreateWithoutPostInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostInput
    upsert?: UserUpsertWithoutPostInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUncheckedUpdateWithoutPostInput, UserUpdateWithoutPostInput>
  }

  export type CategoryUpdateManyWithoutPostInput = {
    create?: XOR<Enumerable<CategoryUncheckedCreateWithoutPostInput>, Enumerable<CategoryCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CategoryCreateOrConnectWithoutPostInput>
    upsert?: Enumerable<CategoryUpsertWithWhereUniqueWithoutPostInput>
    connect?: Enumerable<CategoryWhereUniqueInput>
    set?: Enumerable<CategoryWhereUniqueInput>
    disconnect?: Enumerable<CategoryWhereUniqueInput>
    delete?: Enumerable<CategoryWhereUniqueInput>
    update?: Enumerable<CategoryUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<CategoryUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<CategoryScalarWhereInput>
  }

  export type CommentUpdateManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentUncheckedCreateWithoutPostInput>, Enumerable<CommentCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutpostInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutPostInput>
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type CommentUncheckedUpdateManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentUncheckedCreateWithoutPostInput>, Enumerable<CommentCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutpostInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutPostInput>
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type PostCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<PostUncheckedCreateWithoutCategoryInput>, Enumerable<PostCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutCategoryInput>
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type PostUpdateManyWithoutCategoryInput = {
    create?: XOR<Enumerable<PostUncheckedCreateWithoutCategoryInput>, Enumerable<PostCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutCategoryInput>
    connect?: Enumerable<PostWhereUniqueInput>
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type PostCreateNestedOneWithoutCommentInput = {
    create?: XOR<PostUncheckedCreateWithoutCommentInput, PostCreateWithoutCommentInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentInput
    connect?: PostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentInput = {
    create?: XOR<UserUncheckedCreateWithoutCommentInput, UserCreateWithoutCommentInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentInput
    connect?: UserWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutCommentInput = {
    create?: XOR<PostUncheckedCreateWithoutCommentInput, PostCreateWithoutCommentInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentInput
    upsert?: PostUpsertWithoutCommentInput
    connect?: PostWhereUniqueInput
    update?: XOR<PostUncheckedUpdateWithoutCommentInput, PostUpdateWithoutCommentInput>
  }

  export type UserUpdateOneRequiredWithoutCommentInput = {
    create?: XOR<UserUncheckedCreateWithoutCommentInput, UserCreateWithoutCommentInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentInput
    upsert?: UserUpsertWithoutCommentInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUncheckedUpdateWithoutCommentInput, UserUpdateWithoutCommentInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedEnumGenderNullableFilter = {
    equals?: Gender | null
    in?: Enumerable<Gender> | null
    notIn?: Enumerable<Gender> | null
    not?: NestedEnumGenderNullableFilter | Gender | null
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedEnumTokenTypeFilter = {
    equals?: TokenType
    in?: Enumerable<TokenType>
    notIn?: Enumerable<TokenType>
    not?: NestedEnumTokenTypeFilter | TokenType
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedEnumTodoStateFilter = {
    equals?: TodoState
    in?: Enumerable<TodoState>
    notIn?: Enumerable<TodoState>
    not?: NestedEnumTodoStateFilter | TodoState
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type UserCreateWithoutTeamInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTeamInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTeamInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutTeamInput, UserCreateWithoutTeamInput>
  }

  export type UserCreateWithoutManagerInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserCreateNestedManyWithoutManagerInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutManagerInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutmanagerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutManagerInput, UserCreateWithoutManagerInput>
  }

  export type UserCreateManyManagerInputEnvelope = {
    data: Enumerable<UserCreateManyManagerInput>
    skipDuplicates?: boolean
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderProfile: number
    bio: string
    isDeleted?: Date | string | null
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderProfile: number
    bio: string
    isDeleted?: Date | string | null
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileUncheckedCreateWithoutUserInput, ProfileCreateWithoutUserInput>
  }

  export type GroupCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderGroup: number
    name: string
    isDeleted?: Date | string | null
    Todo?: TodoCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderGroup: number
    name: string
    isDeleted?: Date | string | null
  }

  export type GroupCreateOrConnectWithoutUserInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupUncheckedCreateWithoutUserInput, GroupCreateWithoutUserInput>
  }

  export type PostCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    isDeleted?: Date | string | null
    Category?: CategoryCreateNestedManyWithoutPostInput
    Comment?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    isDeleted?: Date | string | null
    Comment?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutauthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostUncheckedCreateWithoutAuthorInput, PostCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: Enumerable<PostCreateManyAuthorInput>
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: Date | string | null
    orderComment: number
    published?: boolean
    content?: string | null
    post: PostCreateNestedOneWithoutCommentInput
  }

  export type CommentUncheckedCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: Date | string | null
    orderComment: number
    published?: boolean
    content?: string | null
    postId: string
  }

  export type CommentCreateOrConnectWithoutauthorInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentUncheckedCreateWithoutAuthorInput, CommentCreateWithoutAuthorInput>
  }

  export type CommentCreateManyAuthorInputEnvelope = {
    data: Enumerable<CommentCreateManyAuthorInput>
    skipDuplicates?: boolean
  }

  export type TodoCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    isDeleted?: Date | string | null
    mainTodo?: TodoCreateNestedOneWithoutSubTodoInput
    SubTodo?: TodoCreateNestedManyWithoutMainTodoInput
    Group?: GroupCreateNestedManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutTodoInput
  }

  export type TodoUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    mainTodoId?: string | null
    isDeleted?: Date | string | null
    SubTodo?: TodoUncheckedCreateNestedManyWithoutMainTodoInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutTodoInput
  }

  export type TodoCreateOrConnectWithoutUserInput = {
    where: TodoWhereUniqueInput
    create: XOR<TodoUncheckedCreateWithoutUserInput, TodoCreateWithoutUserInput>
  }

  export type UserTodoLinkCreateWithoutUserInput = {
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    todo: TodoCreateNestedOneWithoutUserTodoLinkInput
  }

  export type UserTodoLinkUncheckedCreateWithoutUserInput = {
    todoId: string
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTodoLinkCreateOrConnectWithoutuserInput = {
    where: UserTodoLinkWhereUniqueInput
    create: XOR<UserTodoLinkUncheckedCreateWithoutUserInput, UserTodoLinkCreateWithoutUserInput>
  }

  export type UserTodoLinkCreateManyUserInputEnvelope = {
    data: Enumerable<UserTodoLinkCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ChangesTrackingCreateWithoutModifiedByInput = {
    doneAt?: Date | string
    modelName: string
    recordId: string
    operation: string
    newData: InputJsonValue
    oldData: InputJsonValue
  }

  export type ChangesTrackingUncheckedCreateWithoutModifiedByInput = {
    id?: number
    doneAt?: Date | string
    modelName: string
    recordId: string
    operation: string
    newData: InputJsonValue
    oldData: InputJsonValue
  }

  export type ChangesTrackingCreateOrConnectWithoutmodifiedByInput = {
    where: ChangesTrackingWhereUniqueInput
    create: XOR<ChangesTrackingUncheckedCreateWithoutModifiedByInput, ChangesTrackingCreateWithoutModifiedByInput>
  }

  export type ChangesTrackingCreateManyModifiedByInputEnvelope = {
    data: Enumerable<ChangesTrackingCreateManyModifiedByInput>
    skipDuplicates?: boolean
  }

  export type TokenCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    type: TokenType
    emailToken?: string | null
    valid?: boolean
    expiration: Date | string
  }

  export type TokenUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: TokenType
    emailToken?: string | null
    valid?: boolean
    expiration: Date | string
  }

  export type TokenCreateOrConnectWithoutuserInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenUncheckedCreateWithoutUserInput, TokenCreateWithoutUserInput>
  }

  export type TokenCreateManyUserInputEnvelope = {
    data: Enumerable<TokenCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTeamInput = {
    update: XOR<UserUncheckedUpdateWithoutTeamInput, UserUpdateWithoutTeamInput>
    create: XOR<UserUncheckedCreateWithoutTeamInput, UserCreateWithoutTeamInput>
  }

  export type UserUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Group?: GroupUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type UserUpsertWithWhereUniqueWithoutManagerInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUncheckedUpdateWithoutManagerInput, UserUpdateWithoutManagerInput>
    create: XOR<UserUncheckedCreateWithoutManagerInput, UserCreateWithoutManagerInput>
  }

  export type UserUpdateWithWhereUniqueWithoutManagerInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUncheckedUpdateWithoutManagerInput, UserUpdateWithoutManagerInput>
  }

  export type UserUpdateManyWithWhereWithoutManagerInput = {
    where: UserScalarWhereInput
    data: XOR<UserUncheckedUpdateManyWithoutTeamInput, UserUpdateManyMutationInput>
  }

  export type UserScalarWhereInput = {
    AND?: Enumerable<UserScalarWhereInput>
    OR?: Enumerable<UserScalarWhereInput>
    NOT?: Enumerable<UserScalarWhereInput>
    id?: StringFilter | string
    numSeq?: IntFilter | number
    email?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    lastName?: StringNullableFilter | string | null
    firstName?: StringNullableFilter | string | null
    title?: StringNullableFilter | string | null
    Roles?: EnumRoleNullableListFilter
    nickName?: StringNullableFilter | string | null
    Gender?: EnumGenderNullableFilter | Gender | null
    pwdHash?: StringNullableFilter | string | null
    salt?: StringNullableFilter | string | null
    social?: JsonNullableFilter
    language?: StringNullableFilter | string | null
    dob?: DateTimeNullableFilter | Date | string | null
    address?: JsonNullableFilter
    isValidated?: DateTimeNullableFilter | Date | string | null
    isSuspended?: DateTimeNullableFilter | Date | string | null
    isDeleted?: DateTimeNullableFilter | Date | string | null
    isAdmin?: BoolNullableFilter | boolean | null
    managerId?: StringNullableFilter | string | null
  }

  export type ProfileUpsertWithWhereUniqueWithoutUserInput = {
    where: ProfileWhereUniqueInput
    update: XOR<ProfileUncheckedUpdateWithoutUserInput, ProfileUpdateWithoutUserInput>
    create: XOR<ProfileUncheckedCreateWithoutUserInput, ProfileCreateWithoutUserInput>
  }

  export type ProfileUpdateWithWhereUniqueWithoutUserInput = {
    where: ProfileWhereUniqueInput
    data: XOR<ProfileUncheckedUpdateWithoutUserInput, ProfileUpdateWithoutUserInput>
  }

  export type ProfileUpdateManyWithWhereWithoutUserInput = {
    where: ProfileScalarWhereInput
    data: XOR<ProfileUncheckedUpdateManyWithoutProfileInput, ProfileUpdateManyMutationInput>
  }

  export type ProfileScalarWhereInput = {
    AND?: Enumerable<ProfileScalarWhereInput>
    OR?: Enumerable<ProfileScalarWhereInput>
    NOT?: Enumerable<ProfileScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    orderProfile?: IntFilter | number
    bio?: StringFilter | string
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type GroupUpsertWithWhereUniqueWithoutUserInput = {
    where: GroupWhereUniqueInput
    update: XOR<GroupUncheckedUpdateWithoutUserInput, GroupUpdateWithoutUserInput>
    create: XOR<GroupUncheckedCreateWithoutUserInput, GroupCreateWithoutUserInput>
  }

  export type GroupUpdateWithWhereUniqueWithoutUserInput = {
    where: GroupWhereUniqueInput
    data: XOR<GroupUncheckedUpdateWithoutUserInput, GroupUpdateWithoutUserInput>
  }

  export type GroupUpdateManyWithWhereWithoutUserInput = {
    where: GroupScalarWhereInput
    data: XOR<GroupUncheckedUpdateManyWithoutGroupInput, GroupUpdateManyMutationInput>
  }

  export type GroupScalarWhereInput = {
    AND?: Enumerable<GroupScalarWhereInput>
    OR?: Enumerable<GroupScalarWhereInput>
    NOT?: Enumerable<GroupScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    orderGroup?: IntFilter | number
    name?: StringFilter | string
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUncheckedUpdateWithoutAuthorInput, PostUpdateWithoutAuthorInput>
    create: XOR<PostUncheckedCreateWithoutAuthorInput, PostCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUncheckedUpdateWithoutAuthorInput, PostUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUncheckedUpdateManyWithoutPostInput, PostUpdateManyMutationInput>
  }

  export type PostScalarWhereInput = {
    AND?: Enumerable<PostScalarWhereInput>
    OR?: Enumerable<PostScalarWhereInput>
    NOT?: Enumerable<PostScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    orderPost?: IntNullableFilter | number | null
    published?: BoolFilter | boolean
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    authorId?: StringFilter | string
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUncheckedUpdateWithoutAuthorInput, CommentUpdateWithoutAuthorInput>
    create: XOR<CommentUncheckedCreateWithoutAuthorInput, CommentCreateWithoutAuthorInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUncheckedUpdateWithoutAuthorInput, CommentUpdateWithoutAuthorInput>
  }

  export type CommentUpdateManyWithWhereWithoutAuthorInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUncheckedUpdateManyWithoutCommentInput, CommentUpdateManyMutationInput>
  }

  export type CommentScalarWhereInput = {
    AND?: Enumerable<CommentScalarWhereInput>
    OR?: Enumerable<CommentScalarWhereInput>
    NOT?: Enumerable<CommentScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    isDeleted?: DateTimeNullableFilter | Date | string | null
    orderComment?: IntFilter | number
    published?: BoolFilter | boolean
    content?: StringNullableFilter | string | null
    postId?: StringFilter | string
    authorId?: StringFilter | string
  }

  export type TodoUpsertWithWhereUniqueWithoutUserInput = {
    where: TodoWhereUniqueInput
    update: XOR<TodoUncheckedUpdateWithoutUserInput, TodoUpdateWithoutUserInput>
    create: XOR<TodoUncheckedCreateWithoutUserInput, TodoCreateWithoutUserInput>
  }

  export type TodoUpdateWithWhereUniqueWithoutUserInput = {
    where: TodoWhereUniqueInput
    data: XOR<TodoUncheckedUpdateWithoutUserInput, TodoUpdateWithoutUserInput>
  }

  export type TodoUpdateManyWithWhereWithoutUserInput = {
    where: TodoScalarWhereInput
    data: XOR<TodoUncheckedUpdateManyWithoutTodoInput, TodoUpdateManyMutationInput>
  }

  export type TodoScalarWhereInput = {
    AND?: Enumerable<TodoScalarWhereInput>
    OR?: Enumerable<TodoScalarWhereInput>
    NOT?: Enumerable<TodoScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    orderTodo?: IntFilter | number
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    state?: EnumTodoStateFilter | TodoState
    published?: BoolFilter | boolean
    public?: BoolFilter | boolean
    mainTodoId?: StringNullableFilter | string | null
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type UserTodoLinkUpsertWithWhereUniqueWithoutUserInput = {
    where: UserTodoLinkWhereUniqueInput
    update: XOR<UserTodoLinkUncheckedUpdateWithoutUserInput, UserTodoLinkUpdateWithoutUserInput>
    create: XOR<UserTodoLinkUncheckedCreateWithoutUserInput, UserTodoLinkCreateWithoutUserInput>
  }

  export type UserTodoLinkUpdateWithWhereUniqueWithoutUserInput = {
    where: UserTodoLinkWhereUniqueInput
    data: XOR<UserTodoLinkUncheckedUpdateWithoutUserInput, UserTodoLinkUpdateWithoutUserInput>
  }

  export type UserTodoLinkUpdateManyWithWhereWithoutUserInput = {
    where: UserTodoLinkScalarWhereInput
    data: XOR<UserTodoLinkUncheckedUpdateManyWithoutUserTodoLinkInput, UserTodoLinkUpdateManyMutationInput>
  }

  export type UserTodoLinkScalarWhereInput = {
    AND?: Enumerable<UserTodoLinkScalarWhereInput>
    OR?: Enumerable<UserTodoLinkScalarWhereInput>
    NOT?: Enumerable<UserTodoLinkScalarWhereInput>
    userId?: StringFilter | string
    todoId?: StringFilter | string
    isAuthor?: BoolFilter | boolean
    isAssigned?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type ChangesTrackingUpsertWithWhereUniqueWithoutModifiedByInput = {
    where: ChangesTrackingWhereUniqueInput
    update: XOR<ChangesTrackingUncheckedUpdateWithoutModifiedByInput, ChangesTrackingUpdateWithoutModifiedByInput>
    create: XOR<ChangesTrackingUncheckedCreateWithoutModifiedByInput, ChangesTrackingCreateWithoutModifiedByInput>
  }

  export type ChangesTrackingUpdateWithWhereUniqueWithoutModifiedByInput = {
    where: ChangesTrackingWhereUniqueInput
    data: XOR<ChangesTrackingUncheckedUpdateWithoutModifiedByInput, ChangesTrackingUpdateWithoutModifiedByInput>
  }

  export type ChangesTrackingUpdateManyWithWhereWithoutModifiedByInput = {
    where: ChangesTrackingScalarWhereInput
    data: XOR<ChangesTrackingUncheckedUpdateManyWithoutChangesLogInput, ChangesTrackingUpdateManyMutationInput>
  }

  export type ChangesTrackingScalarWhereInput = {
    AND?: Enumerable<ChangesTrackingScalarWhereInput>
    OR?: Enumerable<ChangesTrackingScalarWhereInput>
    NOT?: Enumerable<ChangesTrackingScalarWhereInput>
    id?: IntFilter | number
    doneAt?: DateTimeFilter | Date | string
    authorId?: StringFilter | string
    modelName?: StringFilter | string
    recordId?: StringFilter | string
    operation?: StringFilter | string
    newData?: JsonFilter
    oldData?: JsonFilter
  }

  export type TokenUpsertWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    update: XOR<TokenUncheckedUpdateWithoutUserInput, TokenUpdateWithoutUserInput>
    create: XOR<TokenUncheckedCreateWithoutUserInput, TokenCreateWithoutUserInput>
  }

  export type TokenUpdateWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    data: XOR<TokenUncheckedUpdateWithoutUserInput, TokenUpdateWithoutUserInput>
  }

  export type TokenUpdateManyWithWhereWithoutUserInput = {
    where: TokenScalarWhereInput
    data: XOR<TokenUncheckedUpdateManyWithoutTokenInput, TokenUpdateManyMutationInput>
  }

  export type TokenScalarWhereInput = {
    AND?: Enumerable<TokenScalarWhereInput>
    OR?: Enumerable<TokenScalarWhereInput>
    NOT?: Enumerable<TokenScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    type?: EnumTokenTypeFilter | TokenType
    emailToken?: StringNullableFilter | string | null
    valid?: BoolFilter | boolean
    expiration?: DateTimeFilter | Date | string
    userId?: StringFilter | string
  }

  export type UserCreateWithoutTokenInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Team?: UserCreateNestedManyWithoutManagerInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
  }

  export type UserUncheckedCreateWithoutTokenInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
  }

  export type UserCreateOrConnectWithoutTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutTokenInput, UserCreateWithoutTokenInput>
  }

  export type UserUpsertWithoutTokenInput = {
    update: XOR<UserUncheckedUpdateWithoutTokenInput, UserUpdateWithoutTokenInput>
    create: XOR<UserUncheckedCreateWithoutTokenInput, UserCreateWithoutTokenInput>
  }

  export type UserUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Team?: UserUpdateManyWithoutManagerInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Group?: GroupUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
  }

  export type UserUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Team?: UserCreateNestedManyWithoutManagerInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutProfileInput, UserCreateWithoutProfileInput>
  }

  export type UserUpsertWithWhereUniqueWithoutProfileInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUncheckedUpdateWithoutProfileInput, UserUpdateWithoutProfileInput>
    create: XOR<UserUncheckedCreateWithoutProfileInput, UserCreateWithoutProfileInput>
  }

  export type UserUpdateWithWhereUniqueWithoutProfileInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUncheckedUpdateWithoutProfileInput, UserUpdateWithoutProfileInput>
  }

  export type UserUpdateManyWithWhereWithoutProfileInput = {
    where: UserScalarWhereInput
    data: XOR<UserUncheckedUpdateManyWithoutUserInput, UserUpdateManyMutationInput>
  }

  export type UserCreateWithoutGroupInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Team?: UserCreateNestedManyWithoutManagerInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutGroupInput, UserCreateWithoutGroupInput>
  }

  export type TodoCreateWithoutGroupInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    isDeleted?: Date | string | null
    mainTodo?: TodoCreateNestedOneWithoutSubTodoInput
    SubTodo?: TodoCreateNestedManyWithoutMainTodoInput
    User?: UserCreateNestedManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutTodoInput
  }

  export type TodoUncheckedCreateWithoutGroupInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    mainTodoId?: string | null
    isDeleted?: Date | string | null
    SubTodo?: TodoUncheckedCreateNestedManyWithoutMainTodoInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutTodoInput
  }

  export type TodoCreateOrConnectWithoutGroupInput = {
    where: TodoWhereUniqueInput
    create: XOR<TodoUncheckedCreateWithoutGroupInput, TodoCreateWithoutGroupInput>
  }

  export type UserUpsertWithWhereUniqueWithoutGroupInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUncheckedUpdateWithoutGroupInput, UserUpdateWithoutGroupInput>
    create: XOR<UserUncheckedCreateWithoutGroupInput, UserCreateWithoutGroupInput>
  }

  export type UserUpdateWithWhereUniqueWithoutGroupInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUncheckedUpdateWithoutGroupInput, UserUpdateWithoutGroupInput>
  }

  export type UserUpdateManyWithWhereWithoutGroupInput = {
    where: UserScalarWhereInput
    data: XOR<UserUncheckedUpdateManyWithoutUserInput, UserUpdateManyMutationInput>
  }

  export type TodoUpsertWithWhereUniqueWithoutGroupInput = {
    where: TodoWhereUniqueInput
    update: XOR<TodoUncheckedUpdateWithoutGroupInput, TodoUpdateWithoutGroupInput>
    create: XOR<TodoUncheckedCreateWithoutGroupInput, TodoCreateWithoutGroupInput>
  }

  export type TodoUpdateWithWhereUniqueWithoutGroupInput = {
    where: TodoWhereUniqueInput
    data: XOR<TodoUncheckedUpdateWithoutGroupInput, TodoUpdateWithoutGroupInput>
  }

  export type TodoUpdateManyWithWhereWithoutGroupInput = {
    where: TodoScalarWhereInput
    data: XOR<TodoUncheckedUpdateManyWithoutTodoInput, TodoUpdateManyMutationInput>
  }

  export type TodoCreateWithoutSubTodoInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    isDeleted?: Date | string | null
    mainTodo?: TodoCreateNestedOneWithoutSubTodoInput
    User?: UserCreateNestedManyWithoutTodoInput
    Group?: GroupCreateNestedManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutTodoInput
  }

  export type TodoUncheckedCreateWithoutSubTodoInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    mainTodoId?: string | null
    isDeleted?: Date | string | null
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutTodoInput
  }

  export type TodoCreateOrConnectWithoutSubTodoInput = {
    where: TodoWhereUniqueInput
    create: XOR<TodoUncheckedCreateWithoutSubTodoInput, TodoCreateWithoutSubTodoInput>
  }

  export type TodoCreateWithoutMainTodoInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    isDeleted?: Date | string | null
    SubTodo?: TodoCreateNestedManyWithoutMainTodoInput
    User?: UserCreateNestedManyWithoutTodoInput
    Group?: GroupCreateNestedManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutTodoInput
  }

  export type TodoUncheckedCreateWithoutMainTodoInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    isDeleted?: Date | string | null
    SubTodo?: TodoUncheckedCreateNestedManyWithoutMainTodoInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutTodoInput
  }

  export type TodoCreateOrConnectWithoutmainTodoInput = {
    where: TodoWhereUniqueInput
    create: XOR<TodoUncheckedCreateWithoutMainTodoInput, TodoCreateWithoutMainTodoInput>
  }

  export type TodoCreateManyMainTodoInputEnvelope = {
    data: Enumerable<TodoCreateManyMainTodoInput>
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTodoInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Team?: UserCreateNestedManyWithoutManagerInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTodoInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTodoInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutTodoInput, UserCreateWithoutTodoInput>
  }

  export type GroupCreateWithoutTodoInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderGroup: number
    name: string
    isDeleted?: Date | string | null
    User?: UserCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutTodoInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderGroup: number
    name: string
    isDeleted?: Date | string | null
  }

  export type GroupCreateOrConnectWithoutTodoInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupUncheckedCreateWithoutTodoInput, GroupCreateWithoutTodoInput>
  }

  export type UserTodoLinkCreateWithoutTodoInput = {
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserTodoLinkInput
  }

  export type UserTodoLinkUncheckedCreateWithoutTodoInput = {
    userId: string
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTodoLinkCreateOrConnectWithouttodoInput = {
    where: UserTodoLinkWhereUniqueInput
    create: XOR<UserTodoLinkUncheckedCreateWithoutTodoInput, UserTodoLinkCreateWithoutTodoInput>
  }

  export type UserTodoLinkCreateManyTodoInputEnvelope = {
    data: Enumerable<UserTodoLinkCreateManyTodoInput>
    skipDuplicates?: boolean
  }

  export type TodoUpsertWithoutSubTodoInput = {
    update: XOR<TodoUncheckedUpdateWithoutSubTodoInput, TodoUpdateWithoutSubTodoInput>
    create: XOR<TodoUncheckedCreateWithoutSubTodoInput, TodoCreateWithoutSubTodoInput>
  }

  export type TodoUpdateWithoutSubTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainTodo?: TodoUpdateOneWithoutSubTodoInput
    User?: UserUpdateManyWithoutTodoInput
    Group?: GroupUpdateManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutTodoInput
  }

  export type TodoUncheckedUpdateWithoutSubTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    mainTodoId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutTodoInput
  }

  export type TodoUpsertWithWhereUniqueWithoutMainTodoInput = {
    where: TodoWhereUniqueInput
    update: XOR<TodoUncheckedUpdateWithoutMainTodoInput, TodoUpdateWithoutMainTodoInput>
    create: XOR<TodoUncheckedCreateWithoutMainTodoInput, TodoCreateWithoutMainTodoInput>
  }

  export type TodoUpdateWithWhereUniqueWithoutMainTodoInput = {
    where: TodoWhereUniqueInput
    data: XOR<TodoUncheckedUpdateWithoutMainTodoInput, TodoUpdateWithoutMainTodoInput>
  }

  export type TodoUpdateManyWithWhereWithoutMainTodoInput = {
    where: TodoScalarWhereInput
    data: XOR<TodoUncheckedUpdateManyWithoutSubTodoInput, TodoUpdateManyMutationInput>
  }

  export type UserUpsertWithWhereUniqueWithoutTodoInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUncheckedUpdateWithoutTodoInput, UserUpdateWithoutTodoInput>
    create: XOR<UserUncheckedCreateWithoutTodoInput, UserCreateWithoutTodoInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTodoInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUncheckedUpdateWithoutTodoInput, UserUpdateWithoutTodoInput>
  }

  export type UserUpdateManyWithWhereWithoutTodoInput = {
    where: UserScalarWhereInput
    data: XOR<UserUncheckedUpdateManyWithoutUserInput, UserUpdateManyMutationInput>
  }

  export type GroupUpsertWithWhereUniqueWithoutTodoInput = {
    where: GroupWhereUniqueInput
    update: XOR<GroupUncheckedUpdateWithoutTodoInput, GroupUpdateWithoutTodoInput>
    create: XOR<GroupUncheckedCreateWithoutTodoInput, GroupCreateWithoutTodoInput>
  }

  export type GroupUpdateWithWhereUniqueWithoutTodoInput = {
    where: GroupWhereUniqueInput
    data: XOR<GroupUncheckedUpdateWithoutTodoInput, GroupUpdateWithoutTodoInput>
  }

  export type GroupUpdateManyWithWhereWithoutTodoInput = {
    where: GroupScalarWhereInput
    data: XOR<GroupUncheckedUpdateManyWithoutGroupInput, GroupUpdateManyMutationInput>
  }

  export type UserTodoLinkUpsertWithWhereUniqueWithoutTodoInput = {
    where: UserTodoLinkWhereUniqueInput
    update: XOR<UserTodoLinkUncheckedUpdateWithoutTodoInput, UserTodoLinkUpdateWithoutTodoInput>
    create: XOR<UserTodoLinkUncheckedCreateWithoutTodoInput, UserTodoLinkCreateWithoutTodoInput>
  }

  export type UserTodoLinkUpdateWithWhereUniqueWithoutTodoInput = {
    where: UserTodoLinkWhereUniqueInput
    data: XOR<UserTodoLinkUncheckedUpdateWithoutTodoInput, UserTodoLinkUpdateWithoutTodoInput>
  }

  export type UserTodoLinkUpdateManyWithWhereWithoutTodoInput = {
    where: UserTodoLinkScalarWhereInput
    data: XOR<UserTodoLinkUncheckedUpdateManyWithoutUserTodoLinkInput, UserTodoLinkUpdateManyMutationInput>
  }

  export type UserCreateWithoutUserTodoLinkInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Team?: UserCreateNestedManyWithoutManagerInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserTodoLinkInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserTodoLinkInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutUserTodoLinkInput, UserCreateWithoutUserTodoLinkInput>
  }

  export type TodoCreateWithoutUserTodoLinkInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    isDeleted?: Date | string | null
    mainTodo?: TodoCreateNestedOneWithoutSubTodoInput
    SubTodo?: TodoCreateNestedManyWithoutMainTodoInput
    User?: UserCreateNestedManyWithoutTodoInput
    Group?: GroupCreateNestedManyWithoutTodoInput
  }

  export type TodoUncheckedCreateWithoutUserTodoLinkInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    mainTodoId?: string | null
    isDeleted?: Date | string | null
    SubTodo?: TodoUncheckedCreateNestedManyWithoutMainTodoInput
  }

  export type TodoCreateOrConnectWithoutUserTodoLinkInput = {
    where: TodoWhereUniqueInput
    create: XOR<TodoUncheckedCreateWithoutUserTodoLinkInput, TodoCreateWithoutUserTodoLinkInput>
  }

  export type UserUpsertWithoutUserTodoLinkInput = {
    update: XOR<UserUncheckedUpdateWithoutUserTodoLinkInput, UserUpdateWithoutUserTodoLinkInput>
    create: XOR<UserUncheckedCreateWithoutUserTodoLinkInput, UserCreateWithoutUserTodoLinkInput>
  }

  export type UserUpdateWithoutUserTodoLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Team?: UserUpdateManyWithoutManagerInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Group?: GroupUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutUserTodoLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type TodoUpsertWithoutUserTodoLinkInput = {
    update: XOR<TodoUncheckedUpdateWithoutUserTodoLinkInput, TodoUpdateWithoutUserTodoLinkInput>
    create: XOR<TodoUncheckedCreateWithoutUserTodoLinkInput, TodoCreateWithoutUserTodoLinkInput>
  }

  export type TodoUpdateWithoutUserTodoLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainTodo?: TodoUpdateOneWithoutSubTodoInput
    SubTodo?: TodoUpdateManyWithoutMainTodoInput
    User?: UserUpdateManyWithoutTodoInput
    Group?: GroupUpdateManyWithoutTodoInput
  }

  export type TodoUncheckedUpdateWithoutUserTodoLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    mainTodoId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SubTodo?: TodoUncheckedUpdateManyWithoutMainTodoInput
  }

  export type UserCreateWithoutChangesLogInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Team?: UserCreateNestedManyWithoutManagerInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChangesLogInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChangesLogInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutChangesLogInput, UserCreateWithoutChangesLogInput>
  }

  export type UserUpsertWithoutChangesLogInput = {
    update: XOR<UserUncheckedUpdateWithoutChangesLogInput, UserUpdateWithoutChangesLogInput>
    create: XOR<UserUncheckedCreateWithoutChangesLogInput, UserCreateWithoutChangesLogInput>
  }

  export type UserUpdateWithoutChangesLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Team?: UserUpdateManyWithoutManagerInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Group?: GroupUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutChangesLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type UserCreateWithoutPostInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Team?: UserCreateNestedManyWithoutManagerInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Comment?: CommentCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutPostInput, UserCreateWithoutPostInput>
  }

  export type CategoryCreateWithoutPostInput = {
    id?: string
    orderCategory: number
    name: string
    isDeleted?: Date | string | null
  }

  export type CategoryUncheckedCreateWithoutPostInput = {
    id?: string
    orderCategory: number
    name: string
    isDeleted?: Date | string | null
  }

  export type CategoryCreateOrConnectWithoutPostInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryUncheckedCreateWithoutPostInput, CategoryCreateWithoutPostInput>
  }

  export type CommentCreateWithoutPostInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: Date | string | null
    orderComment: number
    published?: boolean
    content?: string | null
    author: UserCreateNestedOneWithoutCommentInput
  }

  export type CommentUncheckedCreateWithoutPostInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: Date | string | null
    orderComment: number
    published?: boolean
    content?: string | null
    authorId: string
  }

  export type CommentCreateOrConnectWithoutpostInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentUncheckedCreateWithoutPostInput, CommentCreateWithoutPostInput>
  }

  export type CommentCreateManyPostInputEnvelope = {
    data: Enumerable<CommentCreateManyPostInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPostInput = {
    update: XOR<UserUncheckedUpdateWithoutPostInput, UserUpdateWithoutPostInput>
    create: XOR<UserUncheckedCreateWithoutPostInput, UserCreateWithoutPostInput>
  }

  export type UserUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Team?: UserUpdateManyWithoutManagerInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Group?: GroupUpdateManyWithoutUserInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type CategoryUpsertWithWhereUniqueWithoutPostInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUncheckedUpdateWithoutPostInput, CategoryUpdateWithoutPostInput>
    create: XOR<CategoryUncheckedCreateWithoutPostInput, CategoryCreateWithoutPostInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutPostInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUncheckedUpdateWithoutPostInput, CategoryUpdateWithoutPostInput>
  }

  export type CategoryUpdateManyWithWhereWithoutPostInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUncheckedUpdateManyWithoutCategoryInput, CategoryUpdateManyMutationInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: Enumerable<CategoryScalarWhereInput>
    OR?: Enumerable<CategoryScalarWhereInput>
    NOT?: Enumerable<CategoryScalarWhereInput>
    id?: StringFilter | string
    orderCategory?: IntFilter | number
    name?: StringFilter | string
    isDeleted?: DateTimeNullableFilter | Date | string | null
  }

  export type CommentUpsertWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUncheckedUpdateWithoutPostInput, CommentUpdateWithoutPostInput>
    create: XOR<CommentUncheckedCreateWithoutPostInput, CommentCreateWithoutPostInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUncheckedUpdateWithoutPostInput, CommentUpdateWithoutPostInput>
  }

  export type CommentUpdateManyWithWhereWithoutPostInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUncheckedUpdateManyWithoutCommentInput, CommentUpdateManyMutationInput>
  }

  export type PostCreateWithoutCategoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    isDeleted?: Date | string | null
    author: UserCreateNestedOneWithoutPostInput
    Comment?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutCategoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    authorId: string
    isDeleted?: Date | string | null
    Comment?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutCategoryInput = {
    where: PostWhereUniqueInput
    create: XOR<PostUncheckedCreateWithoutCategoryInput, PostCreateWithoutCategoryInput>
  }

  export type PostUpsertWithWhereUniqueWithoutCategoryInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUncheckedUpdateWithoutCategoryInput, PostUpdateWithoutCategoryInput>
    create: XOR<PostUncheckedCreateWithoutCategoryInput, PostCreateWithoutCategoryInput>
  }

  export type PostUpdateWithWhereUniqueWithoutCategoryInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUncheckedUpdateWithoutCategoryInput, PostUpdateWithoutCategoryInput>
  }

  export type PostUpdateManyWithWhereWithoutCategoryInput = {
    where: PostScalarWhereInput
    data: XOR<PostUncheckedUpdateManyWithoutPostInput, PostUpdateManyMutationInput>
  }

  export type PostCreateWithoutCommentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    isDeleted?: Date | string | null
    author: UserCreateNestedOneWithoutPostInput
    Category?: CategoryCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutCommentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    authorId: string
    isDeleted?: Date | string | null
  }

  export type PostCreateOrConnectWithoutCommentInput = {
    where: PostWhereUniqueInput
    create: XOR<PostUncheckedCreateWithoutCommentInput, PostCreateWithoutCommentInput>
  }

  export type UserCreateWithoutCommentInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    manager?: UserCreateNestedOneWithoutTeamInput
    Team?: UserCreateNestedManyWithoutManagerInput
    Profile?: ProfileCreateNestedManyWithoutUserInput
    Group?: GroupCreateNestedManyWithoutUserInput
    Post?: PostCreateNestedManyWithoutAuthorInput
    Todo?: TodoCreateNestedManyWithoutUserInput
    UserTodoLink?: UserTodoLinkCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingCreateNestedManyWithoutModifiedByInput
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    managerId?: string | null
    Roles?: UserCreateRolesInput | Enumerable<Role>
    Team?: UserUncheckedCreateNestedManyWithoutManagerInput
    Post?: PostUncheckedCreateNestedManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedCreateNestedManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedCreateNestedManyWithoutModifiedByInput
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserUncheckedCreateWithoutCommentInput, UserCreateWithoutCommentInput>
  }

  export type PostUpsertWithoutCommentInput = {
    update: XOR<PostUncheckedUpdateWithoutCommentInput, PostUpdateWithoutCommentInput>
    create: XOR<PostUncheckedCreateWithoutCommentInput, PostCreateWithoutCommentInput>
  }

  export type PostUpdateWithoutCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutPostInput
    Category?: CategoryUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateWithoutCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutCommentInput = {
    update: XOR<UserUncheckedUpdateWithoutCommentInput, UserUpdateWithoutCommentInput>
    create: XOR<UserUncheckedCreateWithoutCommentInput, UserCreateWithoutCommentInput>
  }

  export type UserUpdateWithoutCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Team?: UserUpdateManyWithoutManagerInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Group?: GroupUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type UserCreateManyManagerInput = {
    id?: string
    numSeq?: number
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastName?: string | null
    firstName?: string | null
    title?: string | null
    nickName?: string | null
    Gender?: Gender | null
    pwdHash?: string | null
    salt?: string | null
    social?: InputJsonValue | null
    language?: string | null
    dob?: Date | string | null
    address?: InputJsonValue | null
    isValidated?: Date | string | null
    isSuspended?: Date | string | null
    isDeleted?: Date | string | null
    isAdmin?: boolean | null
    Roles?: UserCreateManyRolesInput | Enumerable<Role>
  }

  export type PostCreateManyAuthorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderPost?: number | null
    published?: boolean
    title: string
    content?: string | null
    isDeleted?: Date | string | null
  }

  export type CommentCreateManyAuthorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: Date | string | null
    orderComment: number
    published?: boolean
    content?: string | null
    postId: string
  }

  export type UserTodoLinkCreateManyUserInput = {
    todoId: string
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChangesTrackingCreateManyModifiedByInput = {
    id?: number
    doneAt?: Date | string
    modelName: string
    recordId: string
    operation: string
    newData: InputJsonValue
    oldData: InputJsonValue
  }

  export type TokenCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: TokenType
    emailToken?: string | null
    valid?: boolean
    expiration: Date | string
  }

  export type UserUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUpdateManyWithoutManagerInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Group?: GroupUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderProfile?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderProfile?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfileUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderProfile?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GroupUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderGroup?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Todo?: TodoUpdateManyWithoutGroupInput
  }

  export type GroupUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderGroup?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GroupUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderGroup?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Category?: CategoryUpdateManyWithoutPostInput
    Comment?: CommentUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Comment?: CommentUncheckedUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommentUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderComment?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    content?: NullableStringFieldUpdateOperationsInput | string | null
    post?: PostUpdateOneRequiredWithoutCommentInput
  }

  export type CommentUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderComment?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateManyWithoutCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderComment?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type TodoUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainTodo?: TodoUpdateOneWithoutSubTodoInput
    SubTodo?: TodoUpdateManyWithoutMainTodoInput
    Group?: GroupUpdateManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutTodoInput
  }

  export type TodoUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    mainTodoId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SubTodo?: TodoUncheckedUpdateManyWithoutMainTodoInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutTodoInput
  }

  export type TodoUncheckedUpdateManyWithoutTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    mainTodoId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserTodoLinkUpdateWithoutUserInput = {
    isAuthor?: BoolFieldUpdateOperationsInput | boolean
    isAssigned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    todo?: TodoUpdateOneRequiredWithoutUserTodoLinkInput
  }

  export type UserTodoLinkUncheckedUpdateWithoutUserInput = {
    todoId?: StringFieldUpdateOperationsInput | string
    isAuthor?: BoolFieldUpdateOperationsInput | boolean
    isAssigned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTodoLinkUncheckedUpdateManyWithoutUserTodoLinkInput = {
    todoId?: StringFieldUpdateOperationsInput | string
    isAuthor?: BoolFieldUpdateOperationsInput | boolean
    isAssigned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangesTrackingUpdateWithoutModifiedByInput = {
    doneAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    newData?: InputJsonValue
    oldData?: InputJsonValue
  }

  export type ChangesTrackingUncheckedUpdateWithoutModifiedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    doneAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    newData?: InputJsonValue
    oldData?: InputJsonValue
  }

  export type ChangesTrackingUncheckedUpdateManyWithoutChangesLogInput = {
    id?: IntFieldUpdateOperationsInput | number
    doneAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modelName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    newData?: InputJsonValue
    oldData?: InputJsonValue
  }

  export type TokenUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    emailToken?: NullableStringFieldUpdateOperationsInput | string | null
    valid?: BoolFieldUpdateOperationsInput | boolean
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    emailToken?: NullableStringFieldUpdateOperationsInput | string | null
    valid?: BoolFieldUpdateOperationsInput | boolean
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyWithoutTokenInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    emailToken?: NullableStringFieldUpdateOperationsInput | string | null
    valid?: BoolFieldUpdateOperationsInput | boolean
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Team?: UserUpdateManyWithoutManagerInput
    Group?: GroupUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
  }

  export type UserUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Team?: UserUpdateManyWithoutManagerInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    Todo?: TodoUpdateManyWithoutUserInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type TodoUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainTodo?: TodoUpdateOneWithoutSubTodoInput
    SubTodo?: TodoUpdateManyWithoutMainTodoInput
    User?: UserUpdateManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutTodoInput
  }

  export type TodoUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    mainTodoId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SubTodo?: TodoUncheckedUpdateManyWithoutMainTodoInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutTodoInput
  }

  export type TodoCreateManyMainTodoInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderTodo: number
    title: string
    content?: string | null
    state?: TodoState
    published?: boolean
    public?: boolean
    isDeleted?: Date | string | null
  }

  export type UserTodoLinkCreateManyTodoInput = {
    userId: string
    isAuthor?: boolean
    isAssigned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TodoUpdateWithoutMainTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SubTodo?: TodoUpdateManyWithoutMainTodoInput
    User?: UserUpdateManyWithoutTodoInput
    Group?: GroupUpdateManyWithoutTodoInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutTodoInput
  }

  export type TodoUncheckedUpdateWithoutMainTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SubTodo?: TodoUncheckedUpdateManyWithoutMainTodoInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutTodoInput
  }

  export type TodoUncheckedUpdateManyWithoutSubTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderTodo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumTodoStateFieldUpdateOperationsInput | TodoState
    published?: BoolFieldUpdateOperationsInput | boolean
    public?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpdateWithoutTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    manager?: UserUpdateOneWithoutTeamInput
    Team?: UserUpdateManyWithoutManagerInput
    Profile?: ProfileUpdateManyWithoutUserInput
    Group?: GroupUpdateManyWithoutUserInput
    Post?: PostUpdateManyWithoutAuthorInput
    Comment?: CommentUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUpdateManyWithoutModifiedByInput
    Token?: TokenUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numSeq?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    Gender?: NullableEnumGenderFieldUpdateOperationsInput | Gender | null
    pwdHash?: NullableStringFieldUpdateOperationsInput | string | null
    salt?: NullableStringFieldUpdateOperationsInput | string | null
    social?: InputJsonValue | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: InputJsonValue | null
    isValidated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    Roles?: UserUpdateRolesInput | Enumerable<Role>
    Team?: UserUncheckedUpdateManyWithoutManagerInput
    Post?: PostUncheckedUpdateManyWithoutAuthorInput
    Comment?: CommentUncheckedUpdateManyWithoutAuthorInput
    UserTodoLink?: UserTodoLinkUncheckedUpdateManyWithoutUserInput
    ChangesLog?: ChangesTrackingUncheckedUpdateManyWithoutModifiedByInput
    Token?: TokenUncheckedUpdateManyWithoutUserInput
  }

  export type GroupUpdateWithoutTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderGroup?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    User?: UserUpdateManyWithoutGroupInput
  }

  export type GroupUncheckedUpdateWithoutTodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderGroup?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserTodoLinkUpdateWithoutTodoInput = {
    isAuthor?: BoolFieldUpdateOperationsInput | boolean
    isAssigned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserTodoLinkInput
  }

  export type UserTodoLinkUncheckedUpdateWithoutTodoInput = {
    userId?: StringFieldUpdateOperationsInput | string
    isAuthor?: BoolFieldUpdateOperationsInput | boolean
    isAssigned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyPostInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isDeleted?: Date | string | null
    orderComment: number
    published?: boolean
    content?: string | null
    authorId: string
  }

  export type CategoryUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderCategory?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderCategory?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderCategory?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommentUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderComment?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    content?: NullableStringFieldUpdateOperationsInput | string | null
    author?: UserUpdateOneRequiredWithoutCommentInput
  }

  export type CommentUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderComment?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    content?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type PostUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutPostInput
    Comment?: CommentUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderPost?: NullableIntFieldUpdateOperationsInput | number | null
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    isDeleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Comment?: CommentUncheckedUpdateManyWithoutPostInput
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}