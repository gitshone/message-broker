"use strict";
/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublisherFactory = void 0;
const common_1 = require("@nestjs/common");
const message_broker_types_1 = require("../message-broker.types");
const sns_1 = require("./sns");
const sqs_1 = require("./sqs");
/**
 * PublisherFactory is used to choose appropriate Publisher's instance in PublisherModule
 * @internal
 */
class PublisherFactory {
    static register(options) {
        switch (options.service) {
            case message_broker_types_1.MessageBroker.SQS:
                return new sqs_1.SQS(options.config);
            case message_broker_types_1.MessageBroker.SNS:
                return new sns_1.SNS(options.config);
            default:
                common_1.Logger.error('Given message broker Service is not implemented.');
                process.exit(0);
        }
    }
}
exports.PublisherFactory = PublisherFactory;
