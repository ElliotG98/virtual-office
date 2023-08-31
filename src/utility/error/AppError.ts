export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode?: number,
        public developerMessage?: string,
    ) {
        super(message);
    }
}
