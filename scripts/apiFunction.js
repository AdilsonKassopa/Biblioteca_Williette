
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
            const isFormData = data instanceof FormData;
            
                const response = await fetch(`${apiBaseUrl}/${rota}`,
            {
                method:'POST',
                headers: isFormData? undefined : {
                    'Content-Type': 'application/json'
                },
                body: isFormData ? data : JSON.stringify(data),
                
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
    async atualizarData(data,rota){
        try{
            const isFormData = data instanceof FormData;

                const response = await fetch(`${apiBaseUrl}/${rota}`,
            {
                method:'PUT',
                headers: isFormData? undefined // ⚠️ deixa o browser definir
                : {
                    'Content-Type': 'application/json'
                },
                body: isFormData ? data : JSON.stringify(data),
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