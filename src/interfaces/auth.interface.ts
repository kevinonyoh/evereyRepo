declare global {
    namespace Express{
    interface Request{
    user?: IUser;
    institution?: Institution
    }
    }
    }
  
    export interface IUser {
      email: string;
      id: string;
      client: string;
  }

  export interface Institution {
    email: string;
    id: string;
   client: string;
  }