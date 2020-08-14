import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import api from '../../services/api';

import './styles.css';

export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    cost: number;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = (props: TeacherItemProps) => {

    function createNewConnection() {
        api.post('/connections', { user_id: props.teacher.id });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={props.teacher.avatar} alt={props.teacher.name}/>
                <div>
                    <strong>{props.teacher.name}</strong>
                    <span>{props.teacher.subject}</span>
                </div>
            </header>

            <p>{props.teacher.bio}</p>

            <footer>
                <p>
                    Preço/hora 
                    <strong>R$ {props.teacher.cost}</strong>
                </p>
                <a target="_blank" rel="noopener noreferrer"
                   onClick={createNewConnection} href={`http://wa.me/${props.teacher.whatsapp}`}>
                    
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
};

export default TeacherItem;