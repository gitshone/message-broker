/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { ReadPacket, WritePacket } from '@nestjs/microservices';
import { MessageBrokerOptions, Publisher, SNSConfig } from '../message-broker.types';
export declare class SNS extends Publisher {
    private readonly config;
    private readonly options?;
    private readonly sns;
    private readonly TopicArn;
    /**
     * Initialize AWS.SNS instance
     * @param config - Required AWS SNS configuration
     * @param options - Additional parameters to SNS service
     */
    constructor(config: SNSConfig, options?: MessageBrokerOptions);
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
