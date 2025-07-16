import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  admin?: JwtPayload;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AddCompetitionRequest {
  Name: string;
}

export interface UpdateWinnersRequest {
  _id: string;
  Winner: string;
  RunnersUp: string;
}

export interface DeleteCompetitionRequest {
  _id: string;
} 

export interface SignupRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
  export interface SigninRequest {
    email: string;
    password: string;
  }
  
  export interface JwtPayload {
    userId: number;
    email: string;
  }
  
  export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
  }
  