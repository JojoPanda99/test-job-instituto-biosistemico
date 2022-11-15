import {NextFunction, Request, Response} from "express"
import {AppDataSource} from "../data-source";
import {ProfessionEntity} from "../entity/professionEntity";

export class ProfessionController {

    private professionRepository = AppDataSource.manager.getRepository(ProfessionEntity)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.professionRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.professionRepository.findOneBy({id: +request.params.id})
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.professionRepository.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.professionRepository.findOneBy({id: +request.params.id})
        return await this.professionRepository.remove(userToRemove)
    }

}
