/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { SQS } from 'aws-sdk';
import { SubscriberContext, SubscriberContextArgs } from '../../message-broker.types';
export declare class BaseSubscriberContext extends SubscriberContext {
    constructor(args: SubscriberContextArgs);
    /**
     * Returns the name of the pattern.
     */
    getPattern(): string;
    /**
     * Returns the data.
     */
    getData(): string;
    /**
     * Returns the original message received from service.
     */
    getOritinalMessage(): unknown;
    getServiceRef(): SQS;
    ack(err?: unknown): Promise<unknown>;
}
