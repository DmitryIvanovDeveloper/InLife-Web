import { injectable } from "inversify";
import { RoutesAPI } from "../../Routes";
import TypedResult from "../Statuses/Result";
import { Status } from "../Statuses/Status";
import IVocabularyBlockService from "../../ThereGame.Business/Domain/Util/Services/IVocabularyBlockService";
import ICreateStudentVocabularyBlockDto from "./Dto/ICreateStudentVocabularyBlockDto";
import IStudentVocabularyBlocksDto from "./Dto/IStudentVocabularyBlocksDto";
import "reflect-metadata";

@injectable()
export default class VocabularyBlockService implements IVocabularyBlockService {
  
    async create(request: ICreateStudentVocabularyBlockDto, teacherId: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.studentsVocabularyBlocks
                , {
                method: 'POST',
                headers: {
                    'X-THEREGAME-AUTH': `${teacherId}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })

            if (response.status == 401) {
                return new TypedResult<Status>(Status.Unauthorized);
            }
            
            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }
    
    async update(request: IStudentVocabularyBlocksDto, id: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.studentsVocabularyBlocks
                , {
                method: 'PUT',
                headers: {
                    'X-THEREGAME-AUTH': `${id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })

            if (response.status == 401) {
                return new TypedResult<Status>(Status.Unauthorized);
            }
            
            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    async get(teacherId: string, studentId: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(`${RoutesAPI.studentsVocabularyBlocks}?id=${studentId}`, {
                headers: {
                    'X-THEREGAME-AUTH': `${teacherId}`,
                },
            })

            if (response.status == 401) {
                return new TypedResult<Status>(Status.Unauthorized);
            }
            
            var data = await response.json();
          
            return new TypedResult<Status>(Status.OK, data);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    async delete(vocabularyId: string, token: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(`${RoutesAPI.studentsVocabularyBlocks}?id=${vocabularyId}`
                , {
                method: 'DELETE',
                headers: {
                    'X-THEREGAME-AUTH': `${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (response.status == 401) {
                return new TypedResult<Status>(Status.Unauthorized);
            }
            
            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }
}