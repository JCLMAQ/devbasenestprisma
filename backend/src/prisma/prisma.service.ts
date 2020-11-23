import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Middleware, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor(
    private configService: ConfigService, 
  ) {
    super();
    this.$use(this.deletePasswordUser);
    if(this.configService.get("ENABLE_SOFT_DELETE") == 1) {
      this.$use(this.softDeleteMiddelware)
      if(this.configService.get("ENABLE_NOT_FIND_SOFTDELETED") == 1) {
        this.$use(this.notFindSoftDeleMiddelware);
        if(this.configService.get("ENABLE_NOT_UPDATE_SOFTDELETED") == 1){
          this.$use(this.notUpdateSoftDeletedMiddelware);
        }
      }
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

// Middelwares
  deletePasswordUser: Middleware = async (params, next) => {
//     console.log("params:", params);
// Work only for "findOne"  ot for findMany
    const result = await next(params);        
    if(params.model === "User") {
        const { pwdHash, salt, isAdmin, ...rest } = result;
        return rest;
    }
    return result;
  }

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

  notFindSoftDeleMiddelware: Middleware = async (params, next) => {
    if (params.model == "User") {
      if (params.action == "findOne") {
        // Change to findFirst - you cannot filter
        // by anything except ID / unique with findOne
        params.action = "findFirst";
        // Add 'deleted' filter
        // ID filter maintained
        params.args.where["isDeleted"] = null;
      }
      if (params.action == "findMany") {
        // Find many queries
        if (params.args.where != undefined) {
          if (params.args.where.isDeleted == undefined) {
            // Exclude deleted records if they have not been expicitly requested
            params.args.where["isDeleted"] = null;
          }
        } else {
          params.args["where"] = { isDeleted: null};
        }
      }
    }
    console.log(params);
    return next(params);
  };

  notUpdateSoftDeletedMiddelware: Middleware = async (params, next) => {
    if (params.model == "User") {
      if (params.action == "update") {
        // Change to updateMany - you cannot filter
        // by anything except ID / unique with findOne
        params.action = "updateMany";
        // Add 'deleted' filter
        // ID filter maintained
        params.args.where["isDeleted"] = null;
      }
      if (params.action == "updateMany") {
        if (params.args.where != undefined) {
          params.args.where["isDeleted"] = null;
        } else {
          params.args["where"] = { isDeleted: null };
        }
      }
    }
    return next(params);
  };

}
