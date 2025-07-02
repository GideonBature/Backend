"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class EnhancedRouter {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
    }
    wrapHandler(handler) {
        return (req, res, next) => {
            Promise.resolve(handler(req, res, next)).catch((error) => {
                next(error);
            });
        };
    }
    createMethod(method) {
        return (path, ...handlers) => {
            const wrappedHandlers = handlers.map((handler) => this.wrapHandler(handler));
            this.router[method](path, ...wrappedHandlers);
        };
    }
    get = this.createMethod('get');
    post = this.createMethod('post');
    put = this.createMethod('put');
    delete = this.createMethod('delete');
    patch = this.createMethod('patch');
    options = this.createMethod('options');
    head = this.createMethod('head');
    all(path, ...handlers) {
        const wrappedHandlers = handlers.map((handler) => this.wrapHandler(handler));
        this.router.all(path, ...wrappedHandlers);
    }
    use(path, ...handlers) {
        const wrappedHandlers = handlers.map((handler) => this.wrapHandler(handler));
        this.router.use(path, ...wrappedHandlers);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = EnhancedRouter;
