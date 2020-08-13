import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

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

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
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
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;