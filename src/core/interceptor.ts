import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, map, catchError, throwError } from 'rxjs';
  
  @Injectable()
  export class TransformInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();
      const statusCode = response.statusCode;
  
      return next.handle().pipe(
        map((data) => ({
          status: 'success',
          statusCode,
          data,
        })),
        catchError((err) => {
          // If any unhandled error leaks through
          const customError = {
            status: 'error',
            statusCode: err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            message: err.message || 'Internal server error',
            error: err.response || null,
          };
          return throwError(() => customError);
        }),
      );
    }
  }