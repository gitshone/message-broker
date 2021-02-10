/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { ReadPacket, WritePacket } from '@nestjs/microservices';
import { MessageBrokerOptions, Publisher, SQSConfig } from '../message-broker.types';
export declare class SQS extends Publisher {
    private readonly config;
    private readonly options?;
    private readonly sqs;
    private readonly QueueUrl;
    /**
     * Initialize AWS.SQS instance
     * @param config - Required AWS SQS configuration
     * @param options - Additional parameters to SQS service
     */
    constructor(config: SQSConfig, options?: MessageBrokerOptions);
    /**
     * AWS SQS does not required pre-connect before sending any message.
     */
    connect(): Promise<void>;
    /**
     * Nothing to close.
     */
    close(): void;
    /**
     * Handle response when message sent to AWS SQS and notify to the subscriber
     * @param packet - Response body from AWS SQS
     * @param callback - Notifier to subcriber
     */
    private handleResponse;
    /**
     * Publish message
     * @param packet - Message to AWS SQS
     * @param callback - Notifier to subcriber
     * @returns Observable
     */
    protected publish(packet: ReadPacket, callback: (packet: WritePacket) => void): Function;
    /**
     * Publish message
     * @param packet - Message to AWS SQS
     * @returns Promise
     */
    protected dispatchEvent(packet: ReadPacket): Promise<any>;
    /**
     * Send message to AWS SQS
     * @param packet - Message to AWS SQS
     * @returns Promise
     */
    private sendMessage;
}
