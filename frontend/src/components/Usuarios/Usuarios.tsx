import React, { useState } from 'react';
import './Usuarios.css'
import Card from './Cards.tsx';

function Usuarios() {

    const [numCards, setNumCards] = useState(0);

    const handleClick = () => {
        setNumCards(numCards + 1);
    };

    const cards = [];

    for (let i = 0; i < numCards; i++) {
        cards.push(<Card key={i} />);
    }    


    return ( 
    <>
    <h1>Hola mundo desde Usuarios</h1>

    <section className='container'>
        <button className='new-card'
                onClick={handleClick}>
            <div id='circle'>
                <i className='bx bx-plus-circle tam'></i>
            </div>
            <br /><br />
            <h2>Nuevo usuario</h2>
        </button>
        {cards.map((card,k) => (
          <div key={k}><Card numCards={"#"+(k+1)} username="Username" email="em@il" /></div>
        ))};
      

        
    </section>
    </> 
    );
}

export default Usuarios;