const modal1 = document.getElementById('modal1');

const showModal = (text, tipo='OK') =>{
    const msg =modal1.getElementsByTagName('p')[0];
    msg.textContent = text;
    if(tipo=='OK'){
        msg.style.color = '#8ce092';
    }else if (tipo == 'error'){
        msg.style.color = '#fb8d8d';
    }

    modal1.classList.remove('close');
}

const hideModal = () =>{
    modal1.classList.add('close');
}

modal1.getElementsByTagName('button')[0].addEventListener('click', () =>{
    hideModal();
});
