"use strict";
/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberContext = exports.Publisher = exports.Subscriber = exports.MessageBroker = void 0;
const microservices_1 = require("@nestjs/microservices");
const base_rpc_context_1 = require("@nestjs/microservices/ctx-host/base-rpc.context");
var MessageBroker;
(function (MessageBroker) {
    MessageBroker["SQS"] = "SQS";
    MessageBroker["SNS"] = "SNS";
    MessageBroker["RabbitMQ"] = "RabbitMQ";
})(MessageBroker = exports.MessageBroker || (exports.MessageBroker = {}));
class Subscriber extends microservices_1.Server {
}
exports.Subscriber = Subscriber;
class Publisher extends microservices_1.ClientProxy {
}
exports.Publisher = Publisher;
class SubscriberContext extends base_rpc_context_1.BaseRpcContext {
}
exports.SubscriberContext = SubscriberContext;
