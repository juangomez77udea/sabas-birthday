import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '/arrow.svg';

const InfoBox = ({ text, link, btnText }) => (
    <div className='mx-5 relative flex flex-col items-center gap-3 text-white max-w-xl pt-4 pb-14 px-7 sm:text-lg sm:leading-snug text-center bg-blue-700 border rounded-lg border-blue-700 shadow-[0.6vmin_0.6vmin_#336cc1,1vmin_1vmin_#0092db,1vmin_1vmin_#0092db,0.65vmin_1vmin_#0092db,1vmin_0.65vmin_#0092db]'>
        <p className='font-medium sm:text-xl text-center'>{text}</p>
        <Link to={link}
            className='bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg inline-flex items-center text-sm absolute -bottom-5'>
            {btnText}
            <img src={arrow} className='w-3 h-3 object-contain ml-2' alt="arrow" />
        </Link>
    </div>
);

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center bg-blue-700 relative border rounded-lg border-blue-700 py-4 px-8 shadow-[0.6vmin_0.6vmin_#336cc1,1vmin_1vmin_#0092db,1vmin_1vmin_#0092db,0.65vmin_1vmin_#0092db,1vmin_0.65vmin_#0092db] p-6 text-white mx-5'>
            Hola, soy <span className='font-semibold'>Sebastian</span> 👋
            <br />
           !Quiero invitarte a mi cumpleaños¡ 🎉
        </h1>
    ),
    2: (
        <InfoBox
            text="Espacio para escribir sobre el lugar y la fecha de la fiesta."
            link="/about"
            btnText="Ir"
        />
    ),
    3: (
        <InfoBox
            text="espacio para escribir sobre lo que quieran ver"
            link="/go"
            btnText="¿Quieres ver el lugar?"
        />
    ),
};

const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;
};

export default HomeInfo;