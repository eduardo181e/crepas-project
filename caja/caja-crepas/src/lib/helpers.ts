import bcrypt from "bcryptjs";



class Helpers {

    public async encryptPassword(password:any){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    public async matchPassword  (password:any, savedPassword:any) {
        try{
            const result = await bcrypt.compare(password, savedPassword);
            return result
        }
        catch(e){
            console.log(e);
        }
    } 

}

const helpers = new Helpers();
export default helpers;