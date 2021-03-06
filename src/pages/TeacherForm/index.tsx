import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import ClassesService, { ClassCreation } from '../../services/classes.service';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

export interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

function TeacherForm(): JSX.Element {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const newScheduleItem: ScheduleItem = { week_day: 0, from: '', to: '' };

    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([ { ...newScheduleItem } ]);

    function addNewScheduleItem(): void {
        setScheduleItems([
            ...scheduleItems,
            { ...newScheduleItem }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string): void {
        const updatedScheduleItems = scheduleItems.map((scheduleItem: ScheduleItem, index: number) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(event: FormEvent): void {
        event.preventDefault();

        const classData: ClassCreation = {
            name: name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        };

        ClassesService.completeClassRegistration(classData)
            .then(() => {
                alert('Cadastro realizado com sucesso!');
                history.push('/');

            }).catch((err: Error) => {
                alert('Erro no cadastro! ' + err.message);
            });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas." 
                description="O primeiro passo é preencher esse formulário de inscrição" />

            <main>
                <form onSubmit={handleCreateClass}>

                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input name="name" label="Nome completo" 
                            value={name} onChange={(event) => { setName(event.target.value)}} />
                        <Input name="avatar" label="Avatar" 
                            value={avatar} onChange={(event) => {setAvatar(event.target.value)}} />
                        <Input name="whatsapp" label="Whatsapp" 
                            value={whatsapp} onChange={(event) => {setWhatsapp(event.target.value)}} />
                        <Textarea name="bio" label="Biografia" 
                            value={bio} onChange={(event) => {setBio(event.target.value)}} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select name="subject" label="Matéria"
                            value={subject} onChange={(event) => {setSubject(event.target.value)}}
                            options={[
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Ciências', label: 'Ciências'},
                                {value: 'Educação Física', label: 'Educação Física'},
                                {value: 'Física', label: 'Física'},
                                {value: 'Geografia', label: 'Geografia'},
                                {value: 'História', label: 'História'},
                                {value: 'Matemática', label: 'Matemática'},
                                {value: 'Português', label: 'Português'},
                                {value: 'Química', label: 'Química'},
                            ]} />
                        <Input name="cost" label="Custo da sua matéria por aula"
                            value={cost} onChange={(event) => {setCost(event.target.value)}} />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={index} className="schedule-item">
                                    <Select name="week_day" label="Dia da semana" value={scheduleItem.week_day}
                                        onChange={(event) => setScheduleItemValue(index, 'week_day', event.target.value)}
                                        options={[
                                            {value: '0', label: 'Domingo'},
                                            {value: '1', label: 'Segunda'},
                                            {value: '2', label: 'Terça'},
                                            {value: '3', label: 'Quarta'},
                                            {value: '4', label: 'Quinta'},
                                            {value: '5', label: 'Sexta'},
                                            {value: '6', label: 'Sábado'},
                                        ]}
                                    />
                                    <Input name="from" label="Das" type="time" value={scheduleItem.from}
                                        onChange={(event) => setScheduleItemValue(index, 'from', event.target.value)} />
                                    <Input name="to" label="Até" type="time" value={scheduleItem.to}
                                        onChange={(event) => setScheduleItemValue(index, 'to', event.target.value)} />
                                </div>
                            );
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        
                        <button type="submit">Salvar cadastro</button>

                    </footer>

                </form>
            </main> 
        </div>
    );
}

export default TeacherForm;