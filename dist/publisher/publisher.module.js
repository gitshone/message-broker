"use strict";
/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
var PublisherModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublisherModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const publisher_factory_1 = require("./publisher.factory");
let PublisherModule = PublisherModule_1 = 
/**
 * Used to register publisher module
 * @internal
 */
class PublisherModule {
    static register(options) {
        const clients = (options || []).map((option) => ({
            provide: option.name,
            useValue: publisher_factory_1.PublisherFactory.register(option),
        }));
        return {
            module: PublisherModule_1,
            providers: clients,
            exports: clients,
        };
    }
};
PublisherModule = PublisherModule_1 = tslib_1.__decorate([
    common_1.Module({})
    /**
     * Used to register publisher module
     * @internal
     */
], PublisherModule);
exports.PublisherModule = PublisherModule;
