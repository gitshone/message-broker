"use strict";
/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberFactory = void 0;
const common_1 = require("@nestjs/common");
const message_broker_types_1 = require("../message-broker.types");
const sqs_1 = require("./sqs");
class SubscriberFactory {
    static subscribe(data) {
        const _microservice = {
            strategy: null,
            options: data.config,
        };
        switch (data.service) {
            case message_broker_types_1.MessageBroker.SQS:
                _microservice.strategy = new sqs_1.SQS(data.config, data.options);
                break;
            default:
                common_1.Logger.error('Given message broker Service is not implemented.');
                process.exit(0);
        }
        return _microservice;
    }
}
exports.SubscriberFactory = SubscriberFactory;
