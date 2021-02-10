"use strict";
/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSubscriberContext = void 0;
const message_broker_types_1 = require("../../message-broker.types");
class BaseSubscriberContext extends message_broker_types_1.SubscriberContext {
    constructor(args) {
        super(args);
    }
    /**
     * Returns the name of the pattern.
     */
    getPattern() {
        return this.args[1].pattern;
    }
    /**
     * Returns the data.
     */
    getData() {
        return this.args[1].data;
    }
    /**
     * Returns the original message received from service.
     */
    getOritinalMessage() {
        return this.args[2];
    }
    getServiceRef() {
        throw new Error('Method not implemented.');
    }
    ack(err) {
        throw new Error('Method not implemented.');
    }
}
exports.BaseSubscriberContext = BaseSubscriberContext;
