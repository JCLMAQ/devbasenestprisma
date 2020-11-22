import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Middleware, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor() {
    super();
  //  this.$use(this.OmitPasswordInUser);
    this.$use(this.softDeleteMiddelware);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

// Middelwares
// OmitPasswordInUser: Middleware = async (params, next) => {
//   const result = await next(params);        
//   if(params.model === "User") {
//       const { password, ...rest } = result;
//       return rest;
//   }       
//   return result;
// }

softDeleteMiddelware: Middleware = async (params, next) => {
  // Check incoming query type
  if (params.model == "User") {
      if (params.action == "delete") {
          // Delete queries
          // Change action to an update
          params.action = "update";
          params.args["data"] = { isDeleted: new Date };
      }
      if (params.action == "deleteMany") {
          // Delete many queries
          params.action = "updateMany";
          if (params.args.data != undefined) {
          params.args.data["isDeleted"] = new Date;
          } else {
          params.args["data"] = { isDeleted: new Date };
          }
      }
  }
  return next(params);
};

}
