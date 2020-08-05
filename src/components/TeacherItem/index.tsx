import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14044.jpg" alt="Diego Fernandes"/>
                <div>
                    <strong>Diego Fernandes</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>
                Entusiasta das melhores tecnologias de química avançada.
                <br /><br />
                Texto aleatório texto aleatório texto aleatório texto aleatório texto aleatório texto aleatório texto aleatório texto aleatório texto aleatório.
            </p>

            <footer>
                <p>
                Preço/hora 
                <strong>R$ 80,00</strong>
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