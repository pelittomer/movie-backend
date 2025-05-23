import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    private readonly logger = new Logger("HttpExceptionFilter")

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const statusCode = exception.getStatus()
        const requestId = request.headers["X-Request-Id"]

        this.logger.error(`Http Exception Filter: ${exception?.message}`, {
            exception,
            body: request.body,
            headers: request.headers,
            url: request.url,
            method: request.method,
            requestId,
        })

        response.status(statusCode).json({
            status: statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: {
                code: exception.name,
                message: exception.message,
                details: exception.getResponse()
            },
        })
    }
}