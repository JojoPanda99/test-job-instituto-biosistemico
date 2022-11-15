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
    return await this.personRepository.findOne({
      relations: {profession: true},
      where:
        {id: +request.params.id}
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const professionDB = request.body.professionId ? await this.professionRepository.findOneBy({id: request.body.professionId}) : null;
    const personPersist: PersonEntity = {
      name: request.body.name,
      email: request.body.email,
      phone: request.body.phone,
      profession: professionDB
    }
    return this.personRepository.save(personPersist)
  }

  async edit(request: Request, response: Response, next: NextFunction) {
    const personRaw = await this.personRepository.findOneBy({id: +request.params.id})
    const professionDB = await this.professionRepository.findOneBy({id: request.body.professionId});
    const personPersist: PersonEntity = {
      id: personRaw.id,
      name: request.body.name ? request.body.name : personRaw.name,
      email: request.body.email ? request.body.email : personRaw.email,
      phone: request.body.phone ? request.body.phone : personRaw.phone,
      profession: professionDB
    }
    return this.personRepository.save(personPersist)
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.personRepository.findOneBy({id: +request.params.id})
    return await this.personRepository.remove(userToRemove)
  }

}
