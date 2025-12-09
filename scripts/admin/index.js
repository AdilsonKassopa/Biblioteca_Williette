const menuOption = document.getElementsByClassName("painel__menu--option")
const optionInfo = document.getElementsByClassName("optionInfo")

//console.log(optionInfo);

menuOption[0].onclick = ()=> showInfOptions(0,optionInfo)

menuOption[1].onclick = ()=> showInfOptions(1,optionInfo)

menuOption[2].onclick = ()=> showInfOptions(2,optionInfo)

menuOption[3].onclick = ()=> showInfOptions(3,optionInfo)

menuOption[4].onclick = ()=> showInfOptions(4,optionInfo)



//esta função analisa o valor da propriedade display do elemento que for clicado 
function showInfOptions(index,element){
    
    if(element[index].style.display === '' || element[index].style.display === 'none'){
        element[index].style.display ='flex'

        for(let i = 0; i<element.length;i++){
            if(i != index )
                element[i].style.display = 'none'
        }
    }
    
}
