
const apiBaseUrl = 'http://localhost:3000';

export class Api{

    async getData(rota){
        try {
            const res = await fetch(`${apiBaseUrl}/${rota}`);
            if (!res.ok) throw new Error(`Falha ao carregar rota ${rota} (status ' + res.status + ')`);

            return await res.json();
        } catch (err) {
            console.error(err);
        }
    }

    async createData(data,rota){
        try{
                const response = await fetch(`${apiBaseUrl}/${rota}`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            }
        )
        if(!response.ok)
            throw new Error('falha ao carregar os dados')
        return await response.json()
        }catch(erro){
        console.log(erro.message);
        
        }
    }
    async deleteData(id,rota){
        try{
                const response = await fetch(`${apiBaseUrl}/${rota}`,
            {
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(id)
            }
        )
        if(!response.ok)
            throw new Error('falha ao carregar os dados')  
        return await response.json()
        }catch(erro){
        console.log(erro.message);
        
        }
    }
    async atualizarData(id,rota){
        try{
                const response = await fetch(`${apiBaseUrl}/${rota}`,
            {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(id)
            }
        )
        if(!response.ok)
            throw new Error('falha ao carregar os dados')
        return await response.json()
        }catch(erro){
        console.log(erro.message);
        
        }
    }
}