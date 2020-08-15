import api from './api';
import { AxiosResponse } from 'axios';

import { ScheduleItem } from '../pages/TeacherForm';
import { Teacher } from '../components/TeacherItem';

export interface TeacherFilter {
    subject: string;
    week_day: string;
    time: string;
}

export interface ClassCreation {
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
    subject: string;
    cost: number;
    schedule: ScheduleItem[];
}

const path = '/classes';

export default class ClassesService {

    static async searchTeachers(filter: TeacherFilter): Promise<Teacher[]> {
        const response = await api.get<Teacher[]>(path, { params: filter });
    
        return response.data;
    }

    static async completeClassRegistration(data: ClassCreation): Promise<void> {
        await api.post<ClassCreation, AxiosResponse>(path, data);
    }

}