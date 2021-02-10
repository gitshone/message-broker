"use strict";
/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQSContext = void 0;
const base_context_1 = require("./base.context");
class SQSContext extends base_context_1.BaseSubscriberContext {
    constructor(args) {
        super(args);
        this.service = this.args[3];
        this.ackFun = this.args[4];
    }
    /**
     * Returns the reference to the instance of service.
     */
    getServiceRef() {
        return this.service;
    }
    /**
     * Acknowledge the message/event
     * @param err - Error if any
     */
    ack(err) {
        const ReceiptHandle = this.getOritinalMessage().ReceiptHandle;
        return this.ackFun(ReceiptHandle, err);
    }
}
exports.SQSContext = SQSContext;
