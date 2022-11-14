import {NextFunction, Request, Response} from "express"
import {PersonEntity} from "../entity/personEntity";
import {AppDataSource} from "../data-source";
import {ProfessionEntity} from "../entity/professionEntity";

export class PersonController {

    private personRepository = AppDataSource.manager.getRepository(PersonEntity)
    private professionRepository = AppDataSource.manager.getRepository(ProfessionEntity)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.personRepository.find({relations: {profession: true}})
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return await this.personRepository.findOneBy({id: +request.params.id});
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const professionDB = request.body.professionId ? await this.professionRepository.findOneBy({id: request.body.professionId}) : null;
        const personPersist = {
            ...request.body,
            profession: professionDB
        }
        delete personPersist.professionId;
        return this.personRepository.save(personPersist)
    }

    async edit(request: Request, response: Response, next: NextFunction) {
        console.log(request)
        const personRaw = await this.personRepository.findOneBy({id: +request.params.id})
        const professionDB = request.body.professionId ? await this.professionRepository.findOneBy({id: request.body.professionId}) : null;
        const personPersist = {
            ...personRaw,
            ...request.body,
            profession: professionDB
        }
        delete personPersist.professionId;
        return this.personRepository.save({...personRaw, ...request.body})
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.personRepository.findOneBy({id: +request.params.id})
        await this.personRepository.remove(userToRemove)
        return null;
    }

}
