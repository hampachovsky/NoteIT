import { FiltersType, INote, NotePayloadType } from 'types';
import { instance } from './config';
import { NoteApiRoutes } from 'constants/routes';

export const noteAPI = {
    async getAll(): Promise<INote[]> {
        const response = await instance.get(NoteApiRoutes.GET_ALL);
        return response.data;
    },
    async getBy(payload: FiltersType): Promise<INote[]> {
        const response = await instance.get(NoteApiRoutes.GET_BY, { params: payload });
        return response.data;
    },
    async create(note: NotePayloadType): Promise<INote> {
        const response = await instance.post(NoteApiRoutes.CREATE, note);
        return response.data;
    },
    async update(note: INote): Promise<INote> {
        const response = await instance.put(`${NoteApiRoutes.UPDATE}${note._id}`, note);
        return response.data;
    },
    async archive(id: INote['_id']): Promise<INote> {
        const response = await instance.put(`${NoteApiRoutes.ARCHIVE}${id}`);
        return response.data;
    },
    async unArchive(id: INote['_id']): Promise<INote> {
        const response = await instance.put(`${NoteApiRoutes.UNARCHIVE}${id}`);
        return response.data;
    },
    async delete(id: INote['_id']) {
        await instance.delete(`${NoteApiRoutes.DELETE}${id}`);
    },
};
