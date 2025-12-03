// auth-service/src/filters/http-to-rpc-exception.filter.ts
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class HttpToRpcFilter extends BaseRpcExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return throwError(() => ({
      statusCode: exception.getStatus(),
      message: exception.message,
      error: exception.name,
    }));
  }
}
