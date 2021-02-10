/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { SQS } from 'aws-sdk';
import { SubscriberContextArgs } from '../../message-broker.types';
import { BaseSubscriberContext } from './base.context';
export declare class SQSContext extends BaseSubscriberContext {
    private readonly service;
    private readonly ackFun;
    constructor(args: SubscriberContextArgs);
    /**
     * Returns the reference to the instance of service.
     */
    getServiceRef(): SQS;
    /**
     * Acknowledge the message/event
     * @param err - Error if any
     */
    ack(err?: unknown): Promise<unknown>;
}
