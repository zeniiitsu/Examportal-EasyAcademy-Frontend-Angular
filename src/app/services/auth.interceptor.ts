import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


//const TOKEN_HEADER="Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login:LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        let authReq=req;

        //add jwt token from local storage to every request
        const token=this.login.getToken();
        if(token!=null){
            authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token}`},});
        }

        return next.handle(authReq);
    }

}



export const authInteceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi: true,
    }
]