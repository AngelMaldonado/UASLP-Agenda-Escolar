import React from "react";
import styled from 'styled-components'


const ModalE = ({children, estado, cambiarEstado}) => {
    return (
            <>
                {estado &&
                    <Overlay>
                        <ContentModal>
                            <Encabezado>
                                {/* <h3></h3> */}
                            </Encabezado>
                        
                            <BotonCerrar onClick={() => cambiarEstado(false)}><i className='bx bx-x' id="b3"></i></BotonCerrar>

                            {children}
                        </ContentModal>
                    </Overlay>
                } 
            </>
    );
}

export default ModalE;


const Overlay = styled.div`
    background: rgba(0,0,0,0.5);
    width: 100vw;
    height:100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content:center;
  
`;

const ContentModal = styled.div`
    width: 250px;
    min-height: 100px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    padding:10px;
`;



const Encabezado = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30x;
    padding-bottom: 30px;
`;

const BotonCerrar = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    width: 3.5rem;
    height: 3.5rem;
    color: gray;

    
    #b3:hover {
        background-color: var(--negro-50);
        color: white;
        border-radius: 150px;

    }

`;


