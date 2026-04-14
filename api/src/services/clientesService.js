import{pool} from "../config/db.js"


class ClienteService {
    async getAll(){
        const res = pool.query("SELECT * FROM clientes")
        console.log(res)
        return res.rows
    }
     
    
   async getById() {
        
    }
    
    
    async createClient(data){
        const newClient = await pool 
    }


}